# 🖼️ DIAGRAMAS PARA RECREAR EN HERRAMIENTAS DE DISEÑO

## **HERRAMIENTAS RECOMENDADAS:**
- **Draw.io** (diagrama.net) - Gratis
- **Lucidchart** - Gratis con límites
- **Figma** - Gratis
- **PowerPoint** - Si tienes Office

---

## **DIAGRAMA 1: ARQUITECTURA SOA GENERAL**

### **Elementos a dibujar:**

1. **Tres rectángulos principales (horizontal):**
   ```
   [FRONTEND]  ←→  [API GATEWAY]  ←→  [BACKEND]
   React App      Supabase         Services
   ```

2. **Frontend (color azul):**
   - Dashboard
   - Auth Modal  
   - Components
   - Pages

3. **API Gateway (color verde):**
   - Authentication
   - REST APIs
   - Rate Limiting
   - CORS

4. **Backend (color naranja):**
   - PostgreSQL
   - RLS Policies
   - File Storage
   - Real-time

5. **Flechas bidireccionales** entre cada capa

---

## **DIAGRAMA 2: SERVICIOS SOA**

### **Elementos a dibujar:**

1. **Rectángulo central (Authentication Service):**
   ```
   AUTHENTICATION SERVICE
   • Sign Up
   • Sign In  
   • Sign Out
   • JWT Tokens
   ```

2. **Tres rectángulos debajo (servicios de negocio):**
   ```
   PRODUCT SERVICE    APPOINTMENT SERVICE    USER SERVICE
   • Get Products     • Create Cita          • Get Profile
   • Filter by Cat    • Update Cita          • Update Profile
   • Product Info     • List Citas           • User History
   ```

3. **Flecha desde Authentication** hacia los tres servicios

---

## **DIAGRAMA 3: FLUJO DE AUTENTICACIÓN**

### **Elementos a dibujar:**

1. **Cuatro columnas verticales:**
   ```
   USER  |  FRONTEND  |  SUPABASE  |  DATABASE
   ```

2. **Flechas numeradas (1-6) mostrando el flujo:**
   ```
   USER → FRONTEND (1. Login Request)
   FRONTEND → SUPABASE (2. API Call)
   SUPABASE → DATABASE (3. Validate)
   DATABASE → SUPABASE (4. User Data)
   SUPABASE → FRONTEND (5. JWT Token)
   FRONTEND → USER (6. Dashboard Access)
   ```

---

## **DIAGRAMA 4: COMPONENTES REACT**

### **Elementos a dibujar:**

1. **Jerarquía de componentes:**
   ```
                APP (Router)
                     |
         ┌───────────┼───────────┐
         |           |           |
      PAGES      HEADER      FOOTER
         |
   COMPONENTS
   ```

2. **Detalles en cada caja:**
   - **Pages:** Index, Dashboard, Services
   - **Header:** Nav, Auth, Logo  
   - **Footer:** Links, Info
   - **Components:** AuthModal, Cards, Forms, UI Kit

---

## **DIAGRAMA 5: BASE DE DATOS**

### **Elementos a dibujar:**

1. **Cuatro tablas principales:**
   ```
   PROFILES        APPOINTMENTS       PRODUCTS
   • id (PK)       • id (PK)          • id (PK)
   • email         • user_id (FK)     • name
   • full_name     • service_id       • description
   • phone         • date             • price
   • created_at    • status           • category
   ```

2. **Tabla central:**
   ```
   SERVICES
   • id (PK)
   • name
   • description
   • duration
   • price
   ```

3. **Líneas de relación** entre las tablas

---

## **COLORES SUGERIDOS:**

- **Frontend:** Azul (#3B82F6)
- **Backend:** Naranja (#F97316)  
- **APIs:** Verde (#10B981)
- **Database:** Púrpura (#8B5CF6)
- **Servicios:** Gris (#6B7280)

---

## **FORMATO PARA SLIDES:**

### **Slide Template:**
```
TÍTULO: [Nombre del Diagrama]
SUBTÍTULO: Arquitectura SOA - TecniMotos YA

[DIAGRAMA CENTRADO]

PUNTOS CLAVE:
• Punto 1
• Punto 2  
• Punto 3
```

---

## **CONSEJOS PARA LA CREACIÓN:**

1. **Usa fuentes legibles:** Arial, Helvetica o similar
2. **Tamaño de fuente:** Mínimo 12pt para que se vea en video
3. **Contraste alto:** Texto oscuro sobre fondo claro
4. **Espaciado:** Deja espacio entre elementos
5. **Consistencia:** Usa los mismos colores y estilos
6. **Simplicidad:** No sobrecargues con detalles

¡Los diagramas no necesitan ser perfectos, solo claros y explicativos!