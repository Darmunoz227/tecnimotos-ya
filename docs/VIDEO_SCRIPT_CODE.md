
## **ARCHIVO 1: Configuración de Supabase (src/lib/supabase.ts)**
```typescript
// Cliente de Supabase - Implementa patrón BaaS (Backend-as-a-Service)
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    flowType: 'pkce', // Implementa flujo PKCE para seguridad
  }
})
```

**Explicar:**
- "Aquí implementamos el patrón Backend-as-a-Service"
- "Supabase actúa como nuestro proveedor de servicios"
- "Configuración PKCE para autenticación segura"

---

## **ARCHIVO 2: Contexto de Autenticación (src/contexts/AuthContext.tsx)**
```typescript
// Servicio de Autenticación - Principio de Separación de Responsabilidades
const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const signUp = async (email: string, password: string, fullName: string) => {
    // Lógica de registro encapsulada
  }
  
  const signIn = async (email: string, password: string) => {
    // Lógica de login encapsulada
  }
}
```

**Explicar:**
- "Separación clara de responsabilidades para autenticación"
- "Encapsulación de la lógica de autenticación"
- "Reutilizable por toda la aplicación"

---

## **ARCHIVO 3: Servicios de Negocio (src/services/)**
```typescript
// Ejemplo: ProductService - Autonomía y Reusabilidad
export class ProductService {
  static async getProducts(): Promise<Product[]> {
    // Servicio autónomo para gestión de productos
  }
  
  static async getProductById(id: string): Promise<Product | null> {
    // Cada método tiene una responsabilidad específica
  }
}
```

**Explicar:**
- "Servicios autónomos para cada dominio de negocio"
- "Contratos bien definidos con TypeScript"
- "Reutilizables y testeable"

---

## **ARCHIVO 4: Componentes React (src/components/)**
```typescript
// Componente AuthModal - Acoplamiento Débil
interface AuthModalProps {
  isOpen: boolean
  onClose: () => void
  mode: 'signin' | 'signup'
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, mode }) => {
  const { signIn, signUp } = useAuth() // Usa el servicio de autenticación
  // Componente independiente con contrato claro
}
```

**Explicar:**
- "Componentes con contratos bien definidos"
- "Acoplamiento débil con servicios"
- "Reutilizable y modular"

---

## **ARCHIVO 5: Base de Datos (database/schema.sql)**
```sql
-- Políticas de Seguridad RLS (Row Level Security)
CREATE POLICY "Users can view own profile" ON profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON profiles
  FOR UPDATE USING (auth.uid() = id);
```

**Explicar:**
- "Políticas de seguridad a nivel de fila"
- "Separación de responsabilidades en la base de datos"
- "Autonomía y seguridad de los datos"
