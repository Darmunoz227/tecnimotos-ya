# Proyecto de arquitectura Motos tecni-ya

## 🚀 Project info

**URL de Producción**: https://tecnimotos-ya.vercel.app/

## 🛠️ Tecnologias Usadas en este proyecto:

- **Vite** - Build tool y servidor de desarrollo
- **TypeScript** - Lenguaje de programación tipado
- **React** - Framework de frontend
- **shadcn-ui** - Componentes de UI
- **Tailwind CSS** - Framework de CSS
- **Supabase** - Backend-as-a-Service (BaaS)
- **React Router** - Enrutamiento
- **Lucide React** - Iconos

## 📱 Funcionalidades Principales

### ✅ Implementadas
- **🏠 Página de Inicio** - Landing page completa
- **🔧 Servicios** - Catálogo de servicios del taller
- **🛒 Productos** - Repuestos y accesorios
- **📅 Sistema de Citas** - Formulario de agendamiento
- **👤 Autenticación** - Registro e inicio de sesión
- **📊 Dashboard** - Panel de usuario (requiere autenticación)

### 🔐 Acceso al Dashboard

Para acceder al Dashboard:

1. **Navega a** `/dashboard` o haz clic en "Mi Dashboard" en el menú
2. **Inicia sesión** con una cuenta existente o **regístrate**
3. **Opciones de acceso:**
   - Botón "Mi Dashboard" en la página principal (solo si estás autenticado)
   - Menú de usuario en el header (icono de usuario)
   - URL directa: `http://localhost:8080/dashboard`

### 🎯 Características del Dashboard

- **Información del usuario** - Datos de perfil
- **Historial de servicios** - Servicios realizados
- **Citas programadas** - Próximas citas
- **Datos de motocicletas** - Información de vehículos
- **Protección por autenticación** - Acceso seguro

## 🏗️ Arquitectura SOA

Este proyecto implementa principios de **Service-Oriented Architecture (SOA)** basados en Thomas Erl (2009):

- **Backend-as-a-Service (BaaS)** con Supabase
- **Servicios REST** para comunicación de datos
- **Microservicios** independientes
- **Bajo acoplamiento** entre componentes

📄 **Documentación completa**: Ver `/docs/ARQUITECTURA_SOA.md`

## 🚀 Desarrollo Local

```bash
# Clonar el repositorio
git clone https://github.com/Darmunoz227/tecnimotos-ya.git

# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm run dev

# Abrir en el navegador
http://localhost:8080
```

## 🌐 URLs Importantes

- **Inicio**: http://localhost:8080/
- **Servicios**: http://localhost:8080/servicios
- **Productos**: http://localhost:8080/productos
- **Citas**: http://localhost:8080/citas
- **Dashboard**: http://localhost:8080/dashboard *(requiere autenticación)*

## 📋 Estado del Proyecto

- ✅ **Frontend**: Completamente funcional
- ✅ **Backend REST**: Integrado con Supabase
- ✅ **Autenticación**: Sistema completo
- ✅ **Dashboard**: Implementado y protegido
- ✅ **Deployment**: Desplegado en Vercel
- ✅ **Documentación**: Arquitectura SOA documentada

---

*Proyecto académico - TecniMotos YA - 2025*


