# 🚀 CONFIGURACIÓN PARA VERCEL

Para que la autenticación funcione en Vercel, configura estas variables de entorno:

## Paso 1: Ir a Vercel Dashboard
1. Ve a https://vercel.com/dashboard
2. Selecciona tu proyecto "tecnimotos-ya"
3. Ve a Settings → Environment Variables

## Paso 2: Agregar Variables
Agrega exactamente estas variables:

**Variable 1:**
Name: VITE_SUPABASE_URL
Value: https://nvywmiyqclowqevznrwx.supabase.co

**Variable 2:**
Name: VITE_SUPABASE_ANON_KEY
Value: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im52eXdtaXlxY2xvd3Fldnpucnd4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTk3NzE0OTAsImV4cCI6MjA3NTM0NzQ5MH0.W1Q7YF87tmSjcQOdZl8vDh4fvhVFodZUX8013rPFOho

## Paso 3: Redeploy
Después de agregar las variables, haz un redeploy desde el dashboard de Vercel.

## ✅ Resultado Esperado:
- ✅ Registro de usuarios funcional
- ✅ Envío de emails de confirmación 
- ✅ Inicio de sesión funcional
- ✅ Dashboard protegido
- ✅ Gestión de sesiones

¡El sistema de autenticación funcionará igual que antes!