import { createClient } from '@supabase/supabase-js'

// Configuración que funciona tanto en desarrollo como producción
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://nvywmiyqclowqevznrwx.supabase.co'
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im52eXdtaXlxY2xvd3Fldnpucnd4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTk3NzE0OTAsImV4cCI6MjA3NTM0NzQ5MH0.W1Q7YF87tmSjcQOdZl8vDh4fvhVFodZUX8013rPFOho'

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true
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