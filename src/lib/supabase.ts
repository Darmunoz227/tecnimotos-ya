import { createClient } from '@supabase/supabase-js'

// Configuración que funciona tanto en desarrollo como producción
// Forzamos las credenciales para evitar problemas de variables de entorno
const supabaseUrl = 'https://nvywmiyqclowqevznrwx.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im52eXdtaXlxY2xvd3Fldnpucnd4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTk3NzE0OTAsImV4cCI6MjA3NTM0NzQ5MH0.W1Q7YF87tmSjcQOdZl8vDh4fvhVFodZUX8013rPFOho'

// Debug: Solo en desarrollo  
if (import.meta.env.DEV) {
  console.log('🔍 Supabase Config:')
  console.log('URL:', supabaseUrl)
  console.log('Key length:', supabaseAnonKey.length)
} else {
  // En producción, verificar configuración sin exponer datos sensibles
  console.log('🌐 Production mode - Supabase client initialized')
  console.log('Config check:', {
    hasUrl: !!supabaseUrl,
    hasKey: !!supabaseAnonKey,
    urlValid: supabaseUrl.includes('supabase.co')
  })
}

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase configuration')
}

// Crear cliente
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true
  }
})

// Test de conexión solo en desarrollo
if (import.meta.env.DEV) {
  supabase.auth.getSession()
    .then(({ data, error }) => {
      if (error) {
        console.error('❌ Supabase connection failed:', error.message)
      } else {
        console.log('✅ Supabase connected successfully')
      }
    })
    .catch(err => {
      console.error('❌ Supabase connection error:', err)
    })
}

// Types for our database
export interface Profile {
  id: string
  email: string
  full_name: string
  phone?: string
  role: 'customer' | 'mechanic' | 'admin'
  created_at: string
  updated_at: string
}

export interface Customer {
  id: string
  user_id: string
  address?: string
  emergency_contact?: string
  preferences?: any
}

export interface Motorcycle {
  id: string
  customer_id: string
  brand: string
  model: string
  year: number
  plate: string
  vin?: string
  color?: string
  engine_size?: string
  created_at: string
}

export interface Service {
  id: string
  name: string
  description: string
  base_price: number
  duration_minutes: number
  category: string
  active: boolean
}

export interface Appointment {
  id: string
  customer_id: string
  motorcycle_id: string
  service_id: string
  scheduled_date: string
  status: 'pending' | 'confirmed' | 'in_progress' | 'completed' | 'cancelled'
  notes?: string
  mechanic_id?: string
  total_cost?: number
  created_at: string
}

export interface Product {
  id: string
  name: string
  description: string
  category_id: string
  price: number
  stock_quantity: number
  min_stock: number
  supplier_id?: string
  sku: string
  image_url?: string
}

export interface Invoice {
  id: string
  appointment_id: string
  customer_id: string
  total_amount: number
  tax_amount: number
  status: 'pending' | 'paid' | 'cancelled'
  payment_method?: string
  paid_at?: string
}