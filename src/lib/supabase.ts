import { createClient } from '@supabase/supabase-js'

// Configuración para producción - usando variables de entorno correctas
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://nvywmiyqclowqevznrwx.supabase.co'
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im52eXdtaXlxY2xvd3Fldnpucnd4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTk3NzE0OTAsImV4cCI6MjA3NTM0NzQ5MH0.W1Q7YF87tmSjcQOdZl8vDh4fvhVFodZUX8013rPFOho'

// Debug solo en desarrollo
if (import.meta.env.DEV) {
  console.log('🔍 Supabase Config:')
  console.log('URL:', supabaseUrl)
  console.log('Key válida:', supabaseAnonKey.length > 50 ? 'Sí' : 'No')
  console.log('Ambiente:', import.meta.env.MODE)
}

// Cliente de Supabase con configuración para producción
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true,
    // Configuración para producción web
    flowType: 'pkce',
    storage: typeof window !== 'undefined' ? window.localStorage : undefined,
    // En desarrollo, permitir inicio de sesión sin confirmación de email
    ...(import.meta.env.DEV && {
      debug: true,
    })
  }
})

// URL de redirect para confirmación de email
export const getRedirectURL = () => {
  if (typeof window !== 'undefined') {
    return `${window.location.origin}/auth/callback`
  }
  return 'https://tecnimotos-ya.vercel.app/auth/callback'
}

// Función para verificar estado del email
export const checkEmailDelivery = async () => {
  if (import.meta.env.DEV) {
    console.log('📧 Estado del servicio de email en desarrollo:')
    console.log('• Los emails pueden no enviarse en desarrollo local')
    console.log('• Supabase puede permitir login sin confirmación en algunos casos')
    console.log('• Para pruebas, usar credenciales demo: darmunoz@poligran.edu.co / demo123456')
    console.log('• En producción, el email de confirmación será obligatorio')
  } else {
    console.log('📧 Configuración de email en producción:')
    console.log('• Si no recibes emails, revisa spam o contacta al administrador')
    console.log('• Credenciales demo disponibles: darmunoz@poligran.edu.co / demo123456')
  }
}

// Función para obtener información del usuario actual
export const getCurrentUserInfo = async () => {
  const { data: { user } } = await supabase.auth.getUser()
  if (user) {
    console.log('👤 Usuario actual:', {
      email: user.email,
      confirmed: user.email_confirmed_at ? 'Sí' : 'No',
      created: user.created_at
    })
  }
  return user
}

export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          email: string
          full_name: string | null
          phone: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          email: string
          full_name?: string | null
          phone?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          full_name?: string | null
          phone?: string | null
          created_at?: string
          updated_at?: string
        }
      }
    }
  }
}