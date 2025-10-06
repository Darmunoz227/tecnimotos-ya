# Proyecto de arquitectura Motos tecni-ya
## Project info

**URL**: https://proyectoarquitecturatecnimotos-ya.vercel.app/

## Tecnologias Usadas en este proyecto:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## Cómo ejecutar el proyecto

1. Clonar el repositorio:
```bash
git clone https://github.com/Darmunoz227/tecnimotos-ya.git
```

2. Navegar al directorio del proyecto:
```bash
cd tecnimotos-ya
```

3. Instalar dependencias:
```bash
npm install
# o
bun install
```

4. Ejecutar el proyecto:
```bash
npm run dev
# o
bun dev
```

5. Abrir en el navegador: `http://localhost:5173`

## 🌐 Despliegue en Producción

### Desplegar en Vercel (Recomendado)

1. **Conectar con GitHub:**
   - Ve a [vercel.com](https://vercel.com)
   - Inicia sesión con tu cuenta de GitHub
   - Haz clic en "New Project"
   - Selecciona el repositorio `tecnimotos-ya`

2. **Configurar variables de entorno:**
   ```
   VITE_SUPABASE_URL=https://tu-proyecto.supabase.co
   VITE_SUPABASE_ANON_KEY=tu_clave_anonima_aqui
   ```

3. **Deploy automático:**
   - Vercel detectará automáticamente que es un proyecto Vite
   - Haz clic en "Deploy"
   - ¡Tu aplicación estará en línea en minutos!

### Configuración de Supabase para Producción

1. En tu proyecto de Supabase, ve a **Authentication > Settings**
2. En **Site URL**, agrega tu dominio de Vercel: `https://tu-app.vercel.app`
3. En **Redirect URLs**, agrega: `https://tu-app.vercel.app/**`

## 🚀 Funcionalidades Implementadas

- ✅ **Frontend completo** con React + TypeScript + Vite
- ✅ **Backend serverless** con Supabase + PostgreSQL  
- ✅ **Autenticación completa** (registro, login, roles)
- ✅ **Base de datos** con 12+ tablas y políticas de seguridad
- ✅ **Gestión de citas** con disponibilidad en tiempo real
- ✅ **Catálogo de productos** con búsqueda y filtros
- ✅ **Gestión de servicios** con precios dinámicos
- ✅ **Sistema de roles** (cliente, mecánico, admin)
- ✅ **Interfaz responsiva** para móvil y desktop
- ✅ **Seguridad** con Row Level Security (RLS)


