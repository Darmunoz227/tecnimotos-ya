

## **DIAGRAMA 1: ARQUITECTURA SOA GENERAL**

```
┌─────────────────────────────────────────────────────────────┐
│                    ARQUITECTURA SOA - TECNIMOTOS YA         │
└─────────────────────────────────────────────────────────────┘

┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   FRONTEND      │    │   API GATEWAY   │    │   BACKEND       │
│   (React App)   │    │   (Supabase)    │    │   SERVICES      │
│                 │    │                 │    │                 │
│ • Dashboard     │◄──►│ • Authentication│◄──►│ • PostgreSQL    │
│ • Auth Modal    │    │ • REST APIs     │    │ • RLS Policies  │
│ • Components    │    │ • Rate Limiting │    │ • File Storage  │
│ • Pages         │    │ • CORS          │    │ • Real-time     │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```


- "Arquitectura de tres capas siguiendo principios SOA"
- "Separación clara entre presentación, lógica y datos"
- "Comunicación a través de APIs REST estandarizadas"

---

## **DIAGRAMA 2: SERVICIOS Y RESPONSABILIDADES**

```
┌─────────────────────────────────────────────────────────────┐
│                    SERVICIOS SOA                            │
└─────────────────────────────────────────────────────────────┘

┌─────────────────┐
│ AUTHENTICATION  │
│    SERVICE      │
│                 │
│ • Sign Up       │
│ • Sign In       │
│ • Sign Out      │
│ • JWT Tokens    │
└─────────────────┘
         │
         ▼
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   PRODUCT       │    │   APPOINTMENT   │    │    USER         │
│   SERVICE       │    │    SERVICE      │    │   SERVICE       │
│                 │    │                 │    │                 │
│ • Get Products  │    │ • Create Cita   │    │ • Get Profile   │
│ • Filter by Cat │    │ • Update Cita   │    │ • Update Profile│
│ • Product Info  │    │ • List Citas    │    │ • User History  │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```


- "Cada servicio tiene responsabilidades específicas"
- "Servicios independientes y reutilizables"
- "Contratos bien definidos para cada servicio"

---

## **DIAGRAMA 3: FLUJO DE AUTENTICACIÓN**

```
┌─────────────────────────────────────────────────────────────┐
│                FLUJO DE AUTENTICACIÓN SOA                   │
└─────────────────────────────────────────────────────────────┘

USER               FRONTEND           SUPABASE           DATABASE
 │                     │                  │                  │
 │ 1. Login Request    │                  │                  │
 ├────────────────────►│                  │                  │
 │                     │ 2. API Call      │                  │
 │                     ├─────────────────►│                  │
 │                     │                  │ 3. Validate      │
 │                     │                  ├─────────────────►│
 │                     │                  │ 4. User Data     │
 │                     │                  │◄─────────────────┤
 │                     │ 5. JWT Token     │                  │
 │                     │◄─────────────────┤                  │
 │ 6. Dashboard Access │                  │                  │
 │◄────────────────────┤                  │                  │
```


- "Flujo stateless siguiendo principios REST"
- "Tokens JWT para mantener sesiones sin estado"
- "Separación clara entre autenticación y autorización"

---

## **DIAGRAMA 4: COMPONENTES REACT (FRONTEND)**

```
┌─────────────────────────────────────────────────────────────┐
│                  COMPONENTES FRONTEND                       │
└─────────────────────────────────────────────────────────────┘

                    ┌─────────────────┐
                    │      APP        │
                    │   (Router)      │
                    └─────────────────┘
                             │
                ┌────────────┼────────────┐
                │            │            │
        ┌───────▼────┐  ┌────▼────┐  ┌───▼─────┐
        │   PAGES    │  │ HEADER  │  │ FOOTER  │
        │            │  │         │  │         │
        │• Index     │  │• Nav    │  │• Links  │
        │• Dashboard │  │• Auth   │  │• Info   │
        │• Services  │  │• Logo   │  │         │
        └────────────┘  └─────────┘  └─────────┘
               │
        ┌──────▼──────┐
        │ COMPONENTS  │
        │             │
        │• AuthModal  │
        │• Cards      │
        │• Forms      │
        │• UI Kit     │
        └─────────────┘
```


- "Arquitectura de componentes modular"
- "Reutilización y separación de responsabilidades"
- "Cada componente tiene un propósito específico"

---

## **DIAGRAMA 5: BASE DE DATOS (BACKEND)**

```
┌─────────────────────────────────────────────────────────────┐
│                  ESQUEMA DE BASE DE DATOS                   │
└─────────────────────────────────────────────────────────────┘

┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│    PROFILES     │    │   APPOINTMENTS  │    │    PRODUCTS     │
│                 │    │                 │    │                 │
│ • id (PK)       │    │ • id (PK)       │    │ • id (PK)       │
│ • email         │    │ • user_id (FK)  │    │ • name          │
│ • full_name     │    │ • service_id    │    │ • description   │
│ • phone         │    │ • date          │    │ • price         │
│ • created_at    │    │ • status        │    │ • category      │
└─────────────────┘    └─────────────────┘    └─────────────────┘
         │                       │                       
         └───────────────────────┼───────────────────────
                                 │
                    ┌─────────────▼─────────────┐
                    │        SERVICES          │
                    │                          │
                    │ • id (PK)                │
                    │ • name                   │
                    │ • description            │
                    │ • duration               │
                    │ • price                  │
                    └──────────────────────────┘
```


- "Esquema normalizado siguiendo mejores prácticas"
- "Relaciones claras entre entidades"
- "Políticas RLS para seguridad automática"
