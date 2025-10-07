import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Mail, AlertCircle, CheckCircle, Info } from "lucide-react"

const EmailTroubleshoot = () => {
  const troubleshootSteps = [
    {
      step: "1",
      title: "Verificar bandeja de entrada",
      description: "Revisa tu email principal para el mensaje de confirmación",
      icon: Mail,
      status: "info"
    },
    {
      step: "2", 
      title: "Revisar carpeta de spam",
      description: "Los emails de Supabase pueden ir a spam/correo no deseado",
      icon: AlertCircle,
      status: "warning"
    },
    {
      step: "3",
      title: "Usar credenciales demo",
      description: "Para acceso inmediato usa: demo@tecnimotos.com / demo123456",
      icon: CheckCircle,
      status: "success"
    },
    {
      step: "4",
      title: "Intenta iniciar sesión directamente",
      description: "En desarrollo, a veces puedes acceder sin confirmar email",
      icon: Info,
      status: "info"
    }
  ]

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Mail className="h-5 w-5" />
          Problema con Email de Confirmación
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Alerta principal */}
        <Alert>
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>¿No recibiste el email de confirmación?</AlertTitle>
          <AlertDescription>
            Este es un problema común en desarrollo. Aquí tienes varias soluciones.
          </AlertDescription>
        </Alert>

        {/* Pasos de solución */}
        <div className="space-y-4">
          <h3 className="font-semibold text-lg">Pasos para solucionar:</h3>
          {troubleshootSteps.map((step) => {
            const Icon = step.icon
            const statusColors = {
              info: "bg-blue-50 border-blue-200",
              warning: "bg-amber-50 border-amber-200", 
              success: "bg-green-50 border-green-200"
            }
            
            return (
              <div key={step.step} className={`p-4 rounded-lg border ${statusColors[step.status as keyof typeof statusColors]}`}>
                <div className="flex items-start gap-3">
                  <Badge variant="outline" className="text-sm font-bold">
                    {step.step}
                  </Badge>
                  <Icon className="h-5 w-5 mt-0.5 flex-shrink-0" />
                  <div className="flex-1">
                    <h4 className="font-semibold text-sm">{step.title}</h4>
                    <p className="text-sm text-muted-foreground mt-1">{step.description}</p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Información técnica */}
        <Alert>
          <Info className="h-4 w-4" />
          <AlertTitle>Información técnica</AlertTitle>
          <AlertDescription className="space-y-2">
            <p>• En desarrollo local, Supabase puede tener limitaciones con el envío de emails</p>
            <p>• Los emails pueden tardar varios minutos en llegar</p>
            <p>• En algunos casos, puedes acceder sin confirmar el email</p>
            <p>• En producción, la confirmación será obligatoria</p>
          </AlertDescription>
        </Alert>

        {/* Credenciales demo destacadas */}
        <div className="bg-primary/10 border border-primary/20 rounded-lg p-4">
          <h4 className="font-semibold text-primary mb-2">🚀 Acceso rápido con cuenta demo:</h4>
          <div className="space-y-1 text-sm">
            <p><strong>Email:</strong> demo@tecnimotos.com</p>
            <p><strong>Contraseña:</strong> demo123456</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default EmailTroubleshoot