import { createClient } from '@supabase/supabase-js'

// Para modo demo - usar URLs válidas pero sin funcionalidad real
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://demo.supabase.co'
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'demo-key'

// Crear un cliente mock para desarrollo
const createMockClient = () => {
  return {
    auth: {
      getSession: () => Promise.resolve({ data: { session: null }, error: null }),
      signUp: () => Promise.resolve({ error: { message: 'Demo mode - crear cuenta en Supabase para funcionalidad completa' } }),
      signInWithPassword: () => Promise.resolve({ error: { message: 'Demo mode - configurar Supabase para autenticación real' } }),
      signOut: () => Promise.resolve({ error: null }),
      onAuthStateChange: () => ({ data: { subscription: { unsubscribe: () => {} } } })
    }
  }
}

// Usar cliente real si las credenciales son válidas, sino usar mock
export const supabase = (supabaseUrl.includes('supabase.co') && supabaseUrl !== 'https://demo.supabase.co') 
  ? createClient(supabaseUrl, supabaseAnonKey)
  : createMockClient()

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