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
  }
})

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