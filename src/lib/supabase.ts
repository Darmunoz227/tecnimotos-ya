import { createClient } from '@supabase/supabase-js'

// Configuración con validación de API keys
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://jlzfbxcpxqghyqxqrlyx.supabase.co'
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpsemZieGNweHFnaHlxeHFybHl4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzA5MjM4MDAsImV4cCI6MjA0NjQ5OTgwMH0.6YQOmxGAzrWZ_GZx5TYQvOZ9xN8V5nGqr8bT3mJd4wQ'

// Debug en desarrollo
if (import.meta.env.DEV) {
  console.log('🔍 Supabase Config:')
  console.log('URL:', supabaseUrl)
  console.log('Key válida:', supabaseAnonKey.length > 50 ? 'Sí' : 'No')
}

// Crear cliente con manejo de errores
let supabaseClient
try {
  supabaseClient = createClient(supabaseUrl, supabaseAnonKey, {
    auth: {
      autoRefreshToken: true,
      persistSession: true,
      detectSessionInUrl: true
    }
  })
} catch (error) {
  console.error('Error creando cliente Supabase:', error)
  // Cliente mock en caso de error
  supabaseClient = {
    auth: {
      getSession: () => Promise.resolve({ data: { session: null }, error: { message: 'Configuración de Supabase no válida' } }),
      signUp: () => Promise.resolve({ error: { message: 'Configuración de Supabase no válida. Revisa tus credenciales.' } }),
      signInWithPassword: () => Promise.resolve({ error: { message: 'Configuración de Supabase no válida. Revisa tus credenciales.' } }),
      signOut: () => Promise.resolve({ error: null }),
      onAuthStateChange: () => ({ data: { subscription: { unsubscribe: () => {} } } })
    }
  }
}

export const supabase = supabaseClient

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