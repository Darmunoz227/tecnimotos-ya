# Guía de Configuración Backend - Motos Tecni YA

## 🚀 Pasos para configurar el backend completo

### 1. Crear cuenta en Supabase
1. Ve a [supabase.com](https://supabase.com)
2. Crea una cuenta gratuita
3. Crea un nuevo proyecto

### 2. Configurar la base de datos
1. En tu proyecto de Supabase, ve a **SQL Editor**
2. Copia y pega todo el contenido del archivo `database/schema.sql`
3. Ejecuta el script para crear todas las tablas y políticas de seguridad

### 3. Configurar variables de entorno
1. En tu proyecto de Supabase, ve a **Settings > API**
2. Copia la `Project URL` y la `anon/public key`
3. Actualiza el archivo `.env.local` con tus valores reales:

```env
VITE_SUPABASE_URL=https://tu-proyecto.supabase.co
VITE_SUPABASE_ANON_KEY=tu_clave_anonima_aqui
```

### 4. Configurar autenticación
1. En Supabase, ve a **Authentication > Settings**
2. Configura:
   - **Enable email confirmations**: ON (opcional)
   - **Enable email invites**: ON
   - **Site URL**: http://localhost:5173 (para desarrollo)

### 5. Configurar almacenamiento (Storage)
1. Ve a **Storage** en tu panel de Supabase
2. Crea un bucket llamado `motorcycles` para fotos de motos
3. Crea un bucket llamado `documents` para documentos
4. Configura políticas de acceso público para visualización

### 6. Probar la conexión
```bash
npm run dev
```

## 🧪 Funcionalidades implementadas

### ✅ Autenticación completa
- Registro de usuarios
- Inicio de sesión
- Perfiles de usuario
- Roles (customer, mechanic, admin)

### ✅ Gestión de citas
- Crear citas
- Ver citas del cliente
- Verificar disponibilidad
- Cancelar citas
- Estados de citas

### ✅ Gestión de productos
- Catálogo de productos
- Búsqueda y filtros
- Categorías
- Control de inventario

### ✅ Gestión de servicios
- Catálogo de servicios
- Precios dinámicos
- Categorización
- Duración de servicios

### ✅ Seguridad
- Row Level Security (RLS)
- Políticas de acceso por usuario
- Autenticación JWT
- Validación de datos

## 🔧 Cómo usar los servicios

### Autenticación
```typescript
import { useAuth } from '@/contexts/AuthContext'

const { user, signIn, signUp, signOut } = useAuth()
```

### Citas
```typescript
import { useCustomerAppointments, useCreateAppointment } from '@/hooks/useApi'

const appointments = useCustomerAppointments(customerId)
const createAppointment = useCreateAppointment()
```

### Productos
```typescript
import { useProducts, useCategories } from '@/hooks/useApi'

const products = useProducts({ category: 'Frenos', search: 'pastillas' })
const categories = useCategories()
```

## 📱 Próximos pasos opcionales

### 1. Notificaciones por email
- Configurar Resend o SendGrid
- Crear Edge Functions para envío
- Templates de email

### 2. Pagos
- Integrar Stripe o mercadoPago
- Webhook handlers
- Facturación automática

### 3. Notificaciones SMS
- Integrar Twilio
- Recordatorios de citas
- Notificaciones de estado

### 4. Analytics
- Dashboard de administrador
- Métricas de negocio
- Reportes

## 🐛 Solución de problemas

### Error de conexión
- Verifica las variables de entorno
- Asegúrate de que el proyecto de Supabase esté activo

### Error de permisos
- Revisa las políticas RLS en Supabase
- Verifica que el usuario esté autenticado

### Error de tablas
- Ejecuta nuevamente el script `schema.sql`
- Verifica que todas las tablas se crearon correctamente

## 📚 Recursos adicionales
- [Documentación de Supabase](https://supabase.com/docs)
- [Tutorial de React + Supabase](https://supabase.com/docs/guides/getting-started/tutorials/with-react)
- [Políticas RLS](https://supabase.com/docs/guides/auth/row-level-security)