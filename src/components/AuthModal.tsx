import { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useAuth } from '@/contexts/AuthContext'
import { useToast } from '@/hooks/use-toast'
import { Loader2, UserCheck, HelpCircle } from 'lucide-react'
import { Link } from 'react-router-dom'

interface AuthModalProps {
  isOpen: boolean
  onClose: () => void
  initialMode?: 'signin' | 'signup'
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, initialMode = 'signin' }) => {
  const [mode, setMode] = useState<'signin' | 'signup'>(initialMode)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [fullName, setFullName] = useState('')
  const [loading, setLoading] = useState(false)
  const { signIn, signUp } = useAuth()
  const { toast } = useToast()

  // Función para cargar credenciales demo
  const loadDemoCredentials = () => {
    setEmail('demo@tecnimotos.com')
    setPassword('demo123456')
    if (mode === 'signup') {
      setFullName('Usuario Demo')
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      let result
      if (mode === 'signup') {
        if (!fullName.trim()) {
          toast({
            title: 'Error',
            description: 'El nombre completo es requerido',
            variant: 'destructive',
          })
          setLoading(false)
          return
        }
        result = await signUp(email, password, fullName)
      } else {
        result = await signIn(email, password)
      }

      if (result.error) {
        console.error('Error de autenticación:', result.error)
        toast({
          title: 'Error de Autenticación',
          description: result.error.message || 'Ocurrió un error inesperado',
          variant: 'destructive',
        })
      } else {
        if (mode === 'signup') {
          // Verificar si el email fue confirmado automáticamente
          if (result.emailConfirmed) {
            toast({
              title: '🎉 ¡Registro completado!',
              description: 'Tu cuenta ha sido creada y confirmada. Iniciando sesión automáticamente...',
            })
            // Cerrar modal inmediatamente si está confirmado
            setTimeout(() => {
              onClose()
              setEmail('')
              setPassword('')
              setFullName('')
            }, 1500)
          } else {
            toast({
              title: '📧 Registro exitoso',
              description: 'Cuenta creada. NOTA: En desarrollo, puedes iniciar sesión inmediatamente sin confirmar email.',
            })
            // Cambiar automáticamente a modo login después del registro
            setTimeout(() => {
              setMode('signin')
              setPassword('') // Limpiar contraseña por seguridad
              toast({
                title: '💡 Tip para desarrollo',
                description: 'Puedes intentar iniciar sesión ahora, o usar las credenciales demo.',
              })
            }, 2000)
          }
        } else {
          toast({
            title: '✅ Bienvenido',
            description: 'Has iniciado sesión correctamente',
          })
          onClose()
          // Reset form
          setEmail('')
          setPassword('')
          setFullName('')
        }
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Ocurrió un error inesperado',
        variant: 'destructive',
      })
    } finally {
      setLoading(false)
    }
  }

  const switchMode = () => {
    setMode(mode === 'signin' ? 'signup' : 'signin')
    setEmail('')
    setPassword('')
    setFullName('')
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>
            {mode === 'signin' ? 'Iniciar Sesión' : 'Crear Cuenta'}
          </DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          {mode === 'signup' && (
            <div className="space-y-2">
              <Label htmlFor="fullName">Nombre Completo</Label>
              <Input
                id="fullName"
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Ingresa tu nombre completo"
                required
              />
            </div>
          )}
          
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="correo@ejemplo.com"
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="password">Contraseña</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
              minLength={6}
            />
          </div>
          
          <Button type="submit" className="w-full" disabled={loading}>
            {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {mode === 'signin' ? 'Iniciar Sesión' : 'Crear Cuenta'}
          </Button>
        </form>

        {/* Botón de Usuario Demo */}
        <div className="space-y-3">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">
                O prueba con
              </span>
            </div>
          </div>
          
          <Button
            type="button"
            variant="outline"
            className="w-full"
            onClick={loadDemoCredentials}
            disabled={loading}
          >
            <UserCheck className="mr-2 h-4 w-4" />
            Usar Credenciales Demo
          </Button>
          
          {(email === 'demo@tecnimotos.com' || password === 'demo123456') && (
            <div className="text-xs text-muted-foreground text-center space-y-1">
              <p><strong>📧 Email:</strong> demo@tecnimotos.com</p>
              <p><strong>🔑 Contraseña:</strong> demo123456</p>
              <p className="text-primary">¡Credenciales cargadas! Haz clic en "{mode === 'signin' ? 'Iniciar Sesión' : 'Crear Cuenta'}"</p>
            </div>
          )}
        </div>

        {/* Información sobre email de confirmación */}
        {mode === 'signup' && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
            <h4 className="text-sm font-semibold text-blue-800 mb-1">📧 Sobre la confirmación de email</h4>
            <ul className="text-xs text-blue-700 space-y-1">
              <li>• En desarrollo, puedes iniciar sesión inmediatamente después del registro</li>
              <li>• Los emails pueden tardar en llegar o ir a spam</li>
              <li>• Para pruebas rápidas, usa las credenciales demo</li>
              <li>• En producción, la confirmación será obligatoria</li>
            </ul>
          </div>
        )}

        {mode === 'signin' && (
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-3">
            <h4 className="text-sm font-semibold text-amber-800 mb-1">🔒 ¿Problemas para iniciar sesión?</h4>
            <ul className="text-xs text-amber-700 space-y-1">
              <li>• Si acabas de registrarte, intenta iniciar sesión inmediatamente</li>
              <li>• Los emails de confirmación pueden tardar o ir a spam</li>
              <li>• Usa las credenciales demo para acceso inmediato</li>
              <li>• Verifica que email y contraseña sean correctos</li>
            </ul>
          </div>
        )}
        
        <div className="text-center">
          <Button
            variant="link"
            onClick={switchMode}
            className="text-sm"
          >
            {mode === 'signin'
              ? '¿No tienes cuenta? Regístrate'
              : '¿Ya tienes cuenta? Inicia sesión'
            }
          </Button>
          
          <div className="mt-2 space-y-1">
            <Button variant="link" size="sm" asChild className="text-xs text-muted-foreground">
              <Link to="/email-help" className="gap-1">
                <HelpCircle className="h-3 w-3" />
                ¿Problemas con el email?
              </Link>
            </Button>
            <Button variant="link" size="sm" asChild className="text-xs text-muted-foreground">
              <Link to="/email-trouble" className="gap-1">
                <HelpCircle className="h-3 w-3" />
                ¿No llega el email de confirmación?
              </Link>
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default AuthModal