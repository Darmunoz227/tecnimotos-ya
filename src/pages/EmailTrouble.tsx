import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Mail, AlertCircle, CheckCircle, UserCheck } from "lucide-react"
import { supabase } from '@/lib/supabase'
import { useToast } from "@/hooks/use-toast"
import Header from "@/components/Header"
import Footer from "@/components/Footer"

const EmailTrouble = () => {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const { toast } = useToast()

  const resendConfirmation = async () => {
    if (!email) {
      toast({
        title: "Error",
        description: "Por favor ingresa tu email",
        variant: "destructive"
      })
      return
    }

    setLoading(true)
    try {
      const { error } = await supabase.auth.resend({
        type: 'signup',
        email: email,
      })

      if (error) {
        toast({
          title: "Error",
          description: "No se pudo reenviar el email: " + error.message,
          variant: "destructive"
        })
      } else {
        toast({
          title: "Email reenviado",
          description: "Se ha reenviado el email de confirmación. Revisa tu bandeja de entrada y spam.",
        })
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Error inesperado al reenviar email",
        variant: "destructive"
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-12">
        <div className="max-w-2xl mx-auto space-y-6">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              Problemas con Email de Confirmación
            </h1>
            <p className="text-lg text-gray-600">
              ¿No recibiste el email de confirmación? Aquí tienes varias opciones.
            </p>
          </div>

          {/* Reenviar Email */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Mail className="h-5 w-5" />
                Reenviar Email de Confirmación
              </CardTitle>
              <CardDescription>
                Intenta reenviar el email de confirmación a tu dirección.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="tu@email.com"
                />
              </div>
              <Button 
                onClick={resendConfirmation} 
                disabled={loading}
                className="w-full"
              >
                {loading ? "Reenviando..." : "Reenviar Email"}
              </Button>
            </CardContent>
          </Card>

          {/* Credenciales Demo */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <UserCheck className="h-5 w-5" />
                Acceso Demo Inmediato
              </CardTitle>
              <CardDescription>
                Accede inmediatamente con estas credenciales de demostración.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Alert>
                <CheckCircle className="h-4 w-4" />
                <AlertDescription className="space-y-2">
                  <p><strong>📧 Email:</strong> darmunoz@poligran.edu.co</p>
                  <p><strong>🔑 Contraseña:</strong> demo123456</p>
                  <p className="text-sm text-muted-foreground">
                    Estas credenciales funcionan inmediatamente sin necesidad de confirmación.
                  </p>
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>

          {/* Consejos */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertCircle className="h-5 w-5" />
                Consejos para Solucionar el Problema
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 text-sm">
                <div className="flex items-start gap-2">
                  <span className="font-semibold">1.</span>
                  <span><strong>Revisa tu carpeta de spam:</strong> Los emails automatizados a menudo van al spam.</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="font-semibold">2.</span>
                  <span><strong>Espera 5-10 minutos:</strong> Los emails pueden tomar tiempo en llegar.</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="font-semibold">3.</span>
                  <span><strong>Verifica tu email:</strong> Asegúrate de haber escrito correctamente tu dirección.</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="font-semibold">4.</span>
                  <span><strong>Contacta al administrador:</strong> Si nada funciona, solicita confirmación manual.</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="font-semibold">5.</span>
                  <span><strong>Usa credenciales demo:</strong> Para acceso inmediato mientras resuelves el problema.</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Información Técnica */}
          <Card>
            <CardHeader>
              <CardTitle>Información Técnica</CardTitle>
            </CardHeader>
            <CardContent>
              <Alert>
                <AlertCircle className="h-4 w-4" />
                <AlertDescription className="text-xs">
                  <p><strong>Estado del servicio:</strong> El servicio de emails puede tener limitaciones en el plan gratuito de Supabase.</p>
                  <p><strong>Alternativa:</strong> Los usuarios pueden ser confirmados manualmente por el administrador.</p>
                  <p><strong>Desarrollo:</strong> En modo desarrollo, algunos emails pueden no enviarse.</p>
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>

          <div className="text-center">
            <Button asChild variant="outline">
              <a href="/">← Volver al Inicio</a>
            </Button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}

export default EmailTrouble