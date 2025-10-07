import React, { createContext, useContext, useEffect, useState } from 'react'
import { User, Session } from '@supabase/supabase-js'
import { supabase, checkEmailDelivery, getRedirectURL } from '@/lib/supabase'

interface AuthContextType {
  user: User | null
  session: Session | null
  loading: boolean
  signUp: (email: string, password: string, fullName: string) => Promise<{ error: any }>
  signIn: (email: string, password: string) => Promise<{ error: any }>
  signOut: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null)
  const [session, setSession] = useState<Session | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
      setUser(session?.user ?? null)
      setLoading(false)
    })

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setSession(session)
        setUser(session?.user ?? null)
        setLoading(false)
      }
    )

    return () => subscription.unsubscribe()
  }, [])

  const signUp = async (email: string, password: string, fullName: string) => {
    try {
      console.log('🔐 Intentando registro:', { email, fullName })
      
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName,
          },
          // URL de confirmación para producción
          emailRedirectTo: getRedirectURL()
        },
      })

      console.log('📝 Resultado del registro:', { data, error })

      // Si el usuario se registra exitosamente
      if (data.user && !error) {
        console.log('✅ Usuario registrado exitosamente:', data.user)
        
        // Verificar si el email fue confirmado automáticamente (común en desarrollo)
        if (data.user.email_confirmed_at) {
          console.log('✅ Email confirmado automáticamente')
          return { 
            error: null, 
            message: 'Registro exitoso - Email confirmado automáticamente', 
            user: data.user,
            emailConfirmed: true
          }
        } else {
          console.log('📧 Email de confirmación enviado (puede tardar unos minutos)')
          return { 
            error: null, 
            message: `✅ Registro exitoso! 

📧 **Se ha enviado un email de confirmación a ${email}**

⏱️ **Si no recibes el email en 5-10 minutos:**
• Revisa tu bandeja de spam/correo no deseado
• El servicio de email puede tener demoras
• Contacta al administrador para confirmación manual

🎭 **Mientras tanto, puedes usar las credenciales demo:**
📧 Email: darmunoz@poligran.edu.co
🔑 Contraseña: demo123456`, 
            user: data.user,
            emailConfirmed: false
          }
        }
      }

      // Si hay error pero el usuario existe, puede ser que ya esté registrado
      if (error && error.message.includes('already registered')) {
        return { 
          error: { 
            ...error, 
            message: 'Este email ya está registrado. Intenta iniciar sesión directamente.' 
          } 
        }
      }

      return { error }
    } catch (error) {
      console.error('❌ Error en registro:', error)
      return { error }
    }
  }

  const signIn = async (email: string, password: string) => {
    try {
      console.log('🔐 Intentando inicio de sesión:', { email })
      
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      console.log('📝 Resultado del login:', { data, error })

      if (error) {
        console.error('❌ Error en login:', error)
        console.error('❌ Error code:', error.status)
        console.error('❌ Error details:', error)
        
        // Mejorar mensajes de error
        let errorMessage = error.message
        if (error.message.includes('Invalid login credentials')) {
          errorMessage = `Email o contraseña incorrectos. 
          
🎭 **Credenciales Demo Disponibles:**
📧 Email: darmunoz@poligran.edu.co
🔑 Contraseña: demo123456

Si acabas de registrarte, confirma tu email primero.`
        } else if (error.message.includes('Email not confirmed')) {
          errorMessage = 'Debes confirmar tu email antes de iniciar sesión. Revisa tu bandeja de entrada y spam. Mientras tanto, puedes usar las credenciales demo.'
        } else if (error.message.includes('Too many requests')) {
          errorMessage = 'Demasiados intentos. Espera unos minutos e intenta nuevamente.'
        } else if (error.status === 400) {
          errorMessage = `Error de autenticación (${error.status}). Verifica las credenciales o usa las credenciales demo: darmunoz@poligran.edu.co / demo123456`
        }
        
        return { error: { ...error, message: errorMessage } }
      }

      console.log('✅ Login exitoso:', data.user)
      return { error: null, user: data.user }
    } catch (error) {
      console.error('❌ Error inesperado en login:', error)
      return { error }
    }
  }

  const signOut = async () => {
    try {
      await supabase.auth.signOut()
    } catch (error) {
      console.error('Error signing out:', error)
    }
  }

  // Función para crear usuario demo automáticamente
  const createDemoUser = async () => {
    try {
      console.log('🎭 Verificando usuario demo...')
      
      // Primero intentar hacer login con el usuario demo existente
      const loginResult = await supabase.auth.signInWithPassword({
        email: 'darmunoz@poligran.edu.co',
        password: 'demo123456'
      })
      
      if (loginResult.data.user) {
        console.log('✅ Usuario demo ya existe y funciona')
        await supabase.auth.signOut() // Logout inmediato
        return
      }
      
      // Si no existe, crear el usuario demo
      const demoResult = await supabase.auth.signUp({
        email: 'darmunoz@poligran.edu.co',
        password: 'demo123456',
        options: {
          data: {
            full_name: 'Usuario Demo',
          },
        },
      })
      
      if (demoResult.error && !demoResult.error.message.includes('already registered')) {
        console.error('Error creando usuario demo:', demoResult.error)
      } else {
        console.log('✅ Usuario demo creado (necesita confirmación manual en Supabase)')
        console.log('👉 Para confirmar: Dashboard Supabase → Authentication → Users → Confirmar darmunoz@poligran.edu.co')
      }
    } catch (error) {
      console.error('Error inesperado creando demo:', error)
    }
  }

  // Crear usuario demo al inicializar
  useEffect(() => {
    // Crear usuario demo tanto en desarrollo como en producción
    createDemoUser()
    checkEmailDelivery()
  }, [])

  const value = {
    user,
    session,
    loading,
    signUp,
    signIn,
    signOut,
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}