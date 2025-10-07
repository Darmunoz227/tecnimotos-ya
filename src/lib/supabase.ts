import { createClient } from '@supabase/supabase-js'

// Configuración para producción - credenciales hardcodeadas
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://jlzfbxcpxqghyqxqrlyx.supabase.co'
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpsemZieGNweHFnaHlxeHFybHl4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzA5MjM4MDAsImV4cCI6MjA0NjQ5OTgwMH0.6YQOmxGAzrWZ_GZx5TYQvOZ9xN8V5nGqr8bT3mJd4wQ'

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

// Función para verificar estado del email
export const checkEmailDelivery = async () => {
  if (import.meta.env.DEV) {
    console.log('📧 Estado del servicio de email en desarrollo:')
    console.log('• Los emails pueden no enviarse en desarrollo local')
    console.log('• Supabase puede permitir login sin confirmación en algunos casos')
    console.log('• Para pruebas, usar credenciales demo: demo@tecnimotos.com / demo123456')
    console.log('• En producción, el email de confirmación será obligatorio')
  }
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