import { useEffect, useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { AlertTriangle, RefreshCw, Home } from 'lucide-react'
import { Link } from 'react-router-dom'

interface ErrorBoundaryState {
  hasError: boolean
  error?: Error
}

export const ErrorFallback = ({ error, resetError }: { error: Error, resetError: () => void }) => {
  const [envInfo, setEnvInfo] = useState<any>({})

  useEffect(() => {
    // Collect environment info for debugging
    setEnvInfo({
      hasSupabaseUrl: !!import.meta.env.VITE_SUPABASE_URL,
      hasSupabaseKey: !!import.meta.env.VITE_SUPABASE_ANON_KEY,
      isDev: import.meta.env.DEV,
      mode: import.meta.env.MODE,
      baseUrl: import.meta.env.BASE_URL
    })
  }, [])

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-background">
      <Card className="w-full max-w-lg">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <AlertTriangle className="h-12 w-12 text-destructive" />
          </div>
          <CardTitle className="text-2xl">¡Oops! Algo salió mal</CardTitle>
          <CardDescription>
            Ha ocurrido un error inesperado. Por favor, intenta nuevamente.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-muted p-4 rounded-lg">
            <h4 className="font-semibold mb-2">Detalles del error:</h4>
            <p className="text-sm text-muted-foreground">{error.message}</p>
          </div>

          {import.meta.env.DEV && (
            <div className="bg-muted p-4 rounded-lg">
              <h4 className="font-semibold mb-2">Info de debug:</h4>
              <pre className="text-xs text-muted-foreground overflow-auto">
                {JSON.stringify(envInfo, null, 2)}
              </pre>
            </div>
          )}

          <div className="flex gap-2">
            <Button onClick={resetError} className="flex-1">
              <RefreshCw className="h-4 w-4 mr-2" />
              Intentar nuevamente
            </Button>
            <Button variant="outline" asChild>
              <Link to="/">
                <Home className="h-4 w-4 mr-2" />
                Ir al inicio
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default ErrorFallback