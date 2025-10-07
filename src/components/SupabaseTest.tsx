import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { supabase } from '@/lib/supabase'
import { useToast } from '@/hooks/use-toast'

const SupabaseTest = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [fullName, setFullName] = useState('')
  const [testing, setTesting] = useState(false)
  const { toast } = useToast()

  const testConnection = async () => {
    setTesting(true)
    try {
      const { data, error } = await supabase.auth.getSession()
      if (error) {
        toast({
          title: 'Error de conexión',
          description: error.message,
          variant: 'destructive'
        })
      } else {
        toast({
          title: 'Conexión exitosa',
          description: 'Supabase está funcionando correctamente'
        })
      }
    } catch (err) {
      toast({
        title: 'Error',
        description: 'Error al conectar con Supabase',
        variant: 'destructive'
      })
    } finally {
      setTesting(false)
    }
  }

  const testSignUp = async () => {
    if (!email || !password || !fullName) {
      toast({
        title: 'Error',
        description: 'Completa todos los campos',
        variant: 'destructive'
      })
      return
    }

    setTesting(true)
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName,
          },
        },
      })

      console.log('Resultado del registro:', { data, error })

      if (error) {
        toast({
          title: 'Error en registro',
          description: error.message,
          variant: 'destructive'
        })
      } else {
        toast({
          title: 'Registro exitoso',
          description: `Usuario: ${data.user?.email} - Confirmado: ${data.user?.email_confirmed_at ? 'Sí' : 'No'}`,
        })
      }
    } catch (err) {
      console.error('Error:', err)
      toast({
        title: 'Error',
        description: 'Error inesperado',
        variant: 'destructive'
      })
    } finally {
      setTesting(false)
    }
  }

  return (
    <Card className="w-full max-w-md mx-auto mt-8">
      <CardHeader>
        <CardTitle>Test Supabase</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Button onClick={testConnection} disabled={testing} className="w-full">
          {testing ? 'Probando...' : 'Probar Conexión'}
        </Button>
        
        <div className="space-y-2">
          <Label htmlFor="testFullName">Nombre Completo</Label>
          <Input
            id="testFullName"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            placeholder="Juan Pérez"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="testEmail">Email</Label>
          <Input
            id="testEmail"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="test@ejemplo.com"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="testPassword">Contraseña</Label>
          <Input
            id="testPassword"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="123456"
          />
        </div>
        
        <Button onClick={testSignUp} disabled={testing} className="w-full">
          {testing ? 'Registrando...' : 'Probar Registro'}
        </Button>
      </CardContent>
    </Card>
  )
}

export default SupabaseTest