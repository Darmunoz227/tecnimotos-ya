-- Supabase Database Schema for Motos Tecni YA
-- Run this in your Supabase SQL Editor

-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create profiles table (extends auth.users)
CREATE TABLE profiles (
  id UUID REFERENCES auth.users(id) PRIMARY KEY,
  email TEXT NOT NULL,
  full_name TEXT NOT NULL,
  phone TEXT,
  role TEXT CHECK (role IN ('customer', 'mechanic', 'admin')) DEFAULT 'customer',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create customers table
CREATE TABLE customers (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  address TEXT,
  emergency_contact TEXT,
  preferences JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create categories table
CREATE TABLE categories (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  parent_id UUID REFERENCES categories(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create suppliers table
CREATE TABLE suppliers (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name TEXT NOT NULL,
  contact_info JSONB,
  payment_terms TEXT,
  active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create services table
CREATE TABLE services (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  base_price DECIMAL(10,2) NOT NULL,
  duration_minutes INTEGER NOT NULL,
  category TEXT NOT NULL,
  active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create products table
CREATE TABLE products (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  category_id UUID REFERENCES categories(id),
  price DECIMAL(10,2) NOT NULL,
  stock_quantity INTEGER NOT NULL DEFAULT 0,
  min_stock INTEGER NOT NULL DEFAULT 0,
  supplier_id UUID REFERENCES suppliers(id),
  sku TEXT UNIQUE NOT NULL,
  image_url TEXT,
  active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create motorcycles table
CREATE TABLE motorcycles (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  customer_id UUID REFERENCES customers(id) ON DELETE CASCADE,
  brand TEXT NOT NULL,
  model TEXT NOT NULL,
  year INTEGER NOT NULL,
  plate TEXT NOT NULL UNIQUE,
  vin TEXT,
  color TEXT,
  engine_size TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create appointments table
CREATE TABLE appointments (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  customer_id UUID REFERENCES customers(id) ON DELETE CASCADE,
  motorcycle_id UUID REFERENCES motorcycles(id) ON DELETE CASCADE,
  service_id UUID REFERENCES services(id),
  scheduled_date TIMESTAMP WITH TIME ZONE NOT NULL,
  status TEXT CHECK (status IN ('pending', 'confirmed', 'in_progress', 'completed', 'cancelled')) DEFAULT 'pending',
  notes TEXT,
  mechanic_id UUID REFERENCES profiles(id),
  total_cost DECIMAL(10,2),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create appointment_items table (for multiple services in one appointment)
CREATE TABLE appointment_items (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  appointment_id UUID REFERENCES appointments(id) ON DELETE CASCADE,
  service_id UUID REFERENCES services(id),
  quantity INTEGER DEFAULT 1,
  unit_price DECIMAL(10,2) NOT NULL,
  subtotal DECIMAL(10,2) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create invoices table
CREATE TABLE invoices (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  appointment_id UUID REFERENCES appointments(id),
  customer_id UUID REFERENCES customers(id),
  total_amount DECIMAL(10,2) NOT NULL,
  tax_amount DECIMAL(10,2) NOT NULL DEFAULT 0,
  status TEXT CHECK (status IN ('pending', 'paid', 'cancelled')) DEFAULT 'pending',
  payment_method TEXT,
  paid_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create payments table
CREATE TABLE payments (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  invoice_id UUID REFERENCES invoices(id),
  amount DECIMAL(10,2) NOT NULL,
  payment_method TEXT NOT NULL,
  transaction_id TEXT,
  status TEXT CHECK (status IN ('pending', 'completed', 'failed', 'refunded')) DEFAULT 'pending',
  processed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create audit_logs table
CREATE TABLE audit_logs (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  table_name TEXT NOT NULL,
  record_id UUID NOT NULL,
  action TEXT NOT NULL,
  old_values JSONB,
  new_values JSONB,
  user_id UUID REFERENCES profiles(id),
  timestamp TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create system_settings table
CREATE TABLE system_settings (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  key TEXT NOT NULL UNIQUE,
  value JSONB NOT NULL,
  description TEXT,
  updated_by UUID REFERENCES profiles(id),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX idx_appointments_customer_date ON appointments(customer_id, scheduled_date);
CREATE INDEX idx_appointments_mechanic_date ON appointments(mechanic_id, scheduled_date);
CREATE INDEX idx_products_category ON products(category_id);
CREATE INDEX idx_products_supplier ON products(supplier_id);
CREATE INDEX idx_motorcycles_customer ON motorcycles(customer_id);
CREATE INDEX idx_motorcycles_plate ON motorcycles(plate);

-- Row Level Security (RLS) Policies
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE customers ENABLE ROW LEVEL SECURITY;
ALTER TABLE motorcycles ENABLE ROW LEVEL SECURITY;
ALTER TABLE appointments ENABLE ROW LEVEL SECURITY;
ALTER TABLE invoices ENABLE ROW LEVEL SECURITY;
ALTER TABLE payments ENABLE ROW LEVEL SECURITY;

-- Profiles: Users can only see their own profile
CREATE POLICY "Users can view own profile" ON profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON profiles FOR UPDATE USING (auth.uid() = id);

-- Customers: Users can only see their own customer data
CREATE POLICY "Users can view own customer data" ON customers FOR SELECT USING (
  user_id = auth.uid()
);

-- Motorcycles: Users can only see their own motorcycles
CREATE POLICY "Users can view own motorcycles" ON motorcycles FOR SELECT USING (
  customer_id IN (SELECT id FROM customers WHERE user_id = auth.uid())
);

CREATE POLICY "Users can insert own motorcycles" ON motorcycles FOR INSERT WITH CHECK (
  customer_id IN (SELECT id FROM customers WHERE user_id = auth.uid())
);

-- Appointments: Users can only see their own appointments
CREATE POLICY "Users can view own appointments" ON appointments FOR SELECT USING (
  customer_id IN (SELECT id FROM customers WHERE user_id = auth.uid())
);

CREATE POLICY "Users can insert own appointments" ON appointments FOR INSERT WITH CHECK (
  customer_id IN (SELECT id FROM customers WHERE user_id = auth.uid())
);

-- Services and products are public (readable by all authenticated users)
CREATE POLICY "Services are viewable by authenticated users" ON services FOR SELECT TO authenticated USING (active = true);
CREATE POLICY "Products are viewable by authenticated users" ON products FOR SELECT TO authenticated USING (active = true);
CREATE POLICY "Categories are viewable by authenticated users" ON categories FOR SELECT TO authenticated USING (true);

-- Insert some initial data
INSERT INTO categories (name, description) VALUES
('Piezas de Motor', 'Componentes del motor de la motocicleta'),
('Sistema de Frenos', 'Pastillas, discos y componentes de frenos'),
('Filtros y Aceites', 'Filtros de aire, aceite y combustible'),
('Accesorios de Seguridad', 'Cascos, guantes y equipos de protección'),
('Iluminación', 'Faros, bombillas y sistemas de iluminación'),
('Cadenas y Piñones', 'Kit de transmisión y cadenas');

INSERT INTO services (name, description, base_price, duration_minutes, category) VALUES
('Revisión Técnico-Mecánica', 'Inspección completa de todos los sistemas', 45000, 45, 'inspection'),
('Mantenimiento Preventivo', 'Cambio de aceite, filtros y sincronización', 80000, 120, 'maintenance'),
('Mantenimiento Correctivo', 'Reparación de fallas específicas', 120000, 180, 'repair'),
('Sincronización y Carburación', 'Ajuste del motor para óptimo rendimiento', 60000, 90, 'tuning'),
('Cambio de Aceite Express', 'Cambio rápido de aceite y filtro', 35000, 30, 'maintenance'),
('Servicio a Domicilio', 'Recogida y entrega en su ubicación', 15000, 60, 'pickup');

-- Function to automatically create customer record when profile is created
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  -- Create customer record for new user
  IF NEW.role = 'customer' THEN
    INSERT INTO public.customers (user_id)
    VALUES (NEW.id);
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to automatically create customer record
CREATE TRIGGER on_profile_created
  AFTER INSERT ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Add updated_at triggers
CREATE TRIGGER handle_profiles_updated_at BEFORE UPDATE ON profiles
  FOR EACH ROW EXECUTE FUNCTION handle_updated_at();