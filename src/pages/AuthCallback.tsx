import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '@/lib/supabase'

const AuthCallback = () => {
  const navigate = useNavigate()

  useEffect(() => {
    const handleAuthCallback = async () => {
      try {
        // Supabase maneja automáticamente el callback
        const { data, error } = await supabase.auth.getSession()
        
        if (error) {
          console.error('Error en callback de autenticación:', error)
          navigate('/?error=auth_callback_error')
          return
        }

        if (data.session) {
          console.log('✅ Sesión confirmada exitosamente')
          navigate('/dashboard')
        } else {
          console.log('❓ No hay sesión activa')
          navigate('/')
        }
      } catch (error) {
        console.error('Error inesperado en callback:', error)
        navigate('/?error=unexpected_error')
      }
    }

    handleAuthCallback()
  }, [navigate])

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
        <p className="mt-4 text-muted-foreground">Confirmando autenticación...</p>
      </div>
    </div>
  )
}

export default AuthCallback