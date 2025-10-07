import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useAuth } from '@/contexts/AuthContext'
import { toast } from 'sonner'
import { Loader2, Mail, Lock, User, Phone } from 'lucide-react'

interface AuthModalProps {
  onClose: () => void
}

export const AuthModal = ({ onClose }: AuthModalProps) => {
  const { signIn, signUp } = useAuth()
  const [loading, setLoading] = useState(false)
  const [loginForm, setLoginForm] = useState({
    email: '',
    password: '',
  })
  const [registerForm, setRegisterForm] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    fullName: '',
    phone: '',
  })

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const { error } = await signIn(loginForm.email, loginForm.password)
      
      if (error) {
        if (error.message.includes('Invalid login credentials')) {
          toast.error('Credenciales inválidas. Verifica tu email y contraseña.')
        } else {
          toast.error(`Error al iniciar sesión: ${error.message}`)
        }
      } else {
        toast.success('¡Bienvenido de vuelta!')
        onClose()
      }
    } catch (error) {
      toast.error('Error inesperado al iniciar sesión')
    } finally {
      setLoading(false)
    }
  }

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (registerForm.password !== registerForm.confirmPassword) {
      toast.error('Las contraseñas no coinciden')
      return
    }

    if (registerForm.password.length < 6) {
      toast.error('La contraseña debe tener al menos 6 caracteres')
      return
    }

    setLoading(true)

    try {
      const { data, error } = await signUp(registerForm.email, registerForm.password, {
        full_name: registerForm.fullName,
        phone: registerForm.phone,
      })
      
      if (error) {
        if (error.message.includes('already registered')) {
          toast.error('Este email ya está registrado. Intenta iniciar sesión.')
        } else if (error.message.includes('Email rate limit exceeded')) {
          toast.error('Demasiados intentos. Espera unos minutos e intenta de nuevo.')
        } else {
          toast.error(`Error al registrarse: ${error.message}`)
        }
      } else {
        if (data.user?.email_confirmed_at) {
          toast.success('¡Cuenta creada e iniciada exitosamente!')
        } else {
          toast.success('¡Cuenta creada! Revisa tu email para confirmar tu cuenta.', {
            duration: 8000,
            description: 'Es posible que el email llegue a tu carpeta de spam.'
          })
        }
        onClose()
      }
    } catch (error) {
      toast.error('Error inesperado al registrarse')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Acceso a tu cuenta</CardTitle>
          <CardDescription>
            Inicia sesión o crea una cuenta para agendar citas
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="login" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="login">Iniciar Sesión</TabsTrigger>
              <TabsTrigger value="register">Registrarse</TabsTrigger>
            </TabsList>
            
            <TabsContent value="login">
              <form onSubmit={handleLogin} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="tu@email.com"
                      className="pl-9"
                      value={loginForm.email}
                      onChange={(e) => setLoginForm(prev => ({ ...prev, email: e.target.value }))}
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Contraseña</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="password"
                      type="password"
                      placeholder="••••••••"
                      className="pl-9"
                      value={loginForm.password}
                      onChange={(e) => setLoginForm(prev => ({ ...prev, password: e.target.value }))}
                      required
                    />
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button type="submit" className="flex-1" disabled={loading}>
                    {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    Iniciar Sesión
                  </Button>
                  <Button type="button" variant="outline" onClick={onClose}>
                    Cancelar
                  </Button>
                </div>
              </form>
            </TabsContent>
            
            <TabsContent value="register">
              <form onSubmit={handleRegister} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="fullName">Nombre Completo</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="fullName"
                      placeholder="Juan Pérez"
                      className="pl-9"
                      value={registerForm.fullName}
                      onChange={(e) => setRegisterForm(prev => ({ ...prev, fullName: e.target.value }))}
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Teléfono</Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="phone"
                      placeholder="311 234 5678"
                      className="pl-9"
                      value={registerForm.phone}
                      onChange={(e) => setRegisterForm(prev => ({ ...prev, phone: e.target.value }))}
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="registerEmail">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="registerEmail"
                      type="email"
                      placeholder="tu@email.com"
                      className="pl-9"
                      value={registerForm.email}
                      onChange={(e) => setRegisterForm(prev => ({ ...prev, email: e.target.value }))}
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="registerPassword">Contraseña</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="registerPassword"
                      type="password"
                      placeholder="••••••••"
                      className="pl-9"
                      value={registerForm.password}
                      onChange={(e) => setRegisterForm(prev => ({ ...prev, password: e.target.value }))}
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirmar Contraseña</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="confirmPassword"
                      type="password"
                      placeholder="••••••••"
                      className="pl-9"
                      value={registerForm.confirmPassword}
                      onChange={(e) => setRegisterForm(prev => ({ ...prev, confirmPassword: e.target.value }))}
                      required
                    />
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button type="submit" className="flex-1" disabled={loading}>
                    {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    Registrarse
                  </Button>
                  <Button type="button" variant="outline" onClick={onClose}>
                    Cancelar
                  </Button>
                </div>
              </form>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}