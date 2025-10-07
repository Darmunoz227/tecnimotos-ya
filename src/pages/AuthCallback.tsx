import { useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Loader2, CheckCircle, XCircle, Mail } from 'lucide-react'
import { supabase } from '@/lib/supabase'
import { toast } from 'sonner'

const AuthCallback = () => {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()

  useEffect(() => {
    const handleAuthCallback = async () => {
      try {
        const { data, error } = await supabase.auth.getSession()
        
        if (error) {
          console.error('Auth callback error:', error)
          setError(error.message)
          return
        }

        if (data.session) {
          setSuccess(true)
          toast.success('¡Email confirmado exitosamente!')
          setTimeout(() => {
            navigate('/')
          }, 2000)
        } else {
          setError('No se pudo confirmar el email')
        }
      } catch (err) {
        console.error('Callback handling error:', err)
        setError('Error procesando confirmación')
      } finally {
        setLoading(false)
      }
    }

    handleAuthCallback()
  }, [navigate])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <Card className="w-full max-w-md text-center">
          <CardHeader>
            <Loader2 className="h-12 w-12 animate-spin mx-auto mb-4 text-primary" />
            <CardTitle>Confirmando email...</CardTitle>
            <CardDescription>
              Por favor espera mientras procesamos tu confirmación
            </CardDescription>
          </CardHeader>
        </Card>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <Card className="w-full max-w-md text-center">
          <CardHeader>
            <XCircle className="h-12 w-12 mx-auto mb-4 text-destructive" />
            <CardTitle>Error en confirmación</CardTitle>
            <CardDescription>{error}</CardDescription>
          </CardHeader>
          <CardContent>
            <Button onClick={() => navigate('/')} className="w-full">
              Volver al inicio
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <Card className="w-full max-w-md text-center">
          <CardHeader>
            <CheckCircle className="h-12 w-12 mx-auto mb-4 text-green-500" />
            <CardTitle>¡Email confirmado!</CardTitle>
            <CardDescription>
              Tu cuenta ha sido activada exitosamente. Serás redirigido en unos segundos.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button onClick={() => navigate('/')} className="w-full">
              Ir al inicio
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return null
}

export default AuthCallback