# 🎬 GUIÓN COMPLETO PARA VIDEO - ARQUITECTURA SOA TECNIMOTOS YA

## **DURACIÓN TOTAL: 10-12 MINUTOS**

---

## **🎯 PARTE 1: INTRODUCCIÓN [0:00 - 1:30]**

### **Slide 1: Título**
```
"Hola, soy Diego Muñoz y les presento TecniMotos YA: 
Una implementación práctica de Arquitectura SOA siguiendo 
los principios de Thomas Erl 2009."
```

### **Slide 2: Agenda**
```
"Hoy vamos a ver:
• La problemática que resolvemos
• Justificación de la arquitectura SOA
• Demostración en vivo de la aplicación
• Análisis técnico del código
• Diagramas de arquitectura y componentes"
```

---

## **❌ PARTE 2: PROBLEMÁTICA [1:30 - 3:00]**

### **Slide 3: Problemática Actual**
```
"Los talleres de motocicletas enfrentan desafíos significativos:

❌ PROBLEMAS IDENTIFICADOS:
• Agendamiento manual propenso a errores
• Inventarios y servicios no digitalizados  
• Comunicación limitada por teléfono
• Pérdida de información de clientes
• Falta de seguimiento de servicios
• Procesos ineficientes y no escalables"
```

### **Slide 4: Solución Propuesta**
```
"TecniMotos YA digitaliza integralmente estos procesos:

✅ SOLUCIÓN SOA:
• Sistema de autenticación robusto
• Catálogos digitales de servicios y productos
• Dashboard personalizado por usuario
• Arquitectura escalable y modular
• APIs reutilizables y bien documentadas"
```

---

## **🖥️ PARTE 3: DEMOSTRACIÓN EN VIVO [3:00 - 5:30]**

### **Demo Script:**
```
"Veamos la aplicación funcionando en producción:"

🌐 NAVEGACIÓN A: https://tecnimotos-ya.vercel.app

1. **LANDING PAGE [3:00 - 3:30]**
   "Aquí vemos la página principal con:
   • Información corporativa clara
   • Navegación intuitiva
   • Call-to-actions estratégicos"

2. **SISTEMA DE AUTENTICACIÓN [3:30 - 4:15]**
   "Demostración del registro completo:
   • Click en 'Iniciar Sesión'
   • Cargar credenciales demo: darmunoz@poligran.edu.co
   • Login exitoso con redirección automática"

3. **DASHBOARD PERSONALIZADO [4:15 - 4:45]**
   "Una vez autenticado, accedemos al dashboard:
   • Información personalizada del usuario
   • Historial de citas y servicios
   • Navegación a diferentes secciones"

4. **CATÁLOGOS [4:45 - 5:30]**
   "Exploremos los servicios y productos:
   • Servicios organizados por categorías
   • Información detallada de cada servicio
   • Catálogo de productos con precios
   • Interfaz responsive y moderna"
```

---

## **🏗️ PARTE 4: ARQUITECTURA SOA - ANÁLISIS [5:30 - 8:00]**

### **Slide 5: Principios SOA Implementados**
```
"Nuestra arquitectura implementa los 8 principios de Thomas Erl:

1. 🎯 SEPARACIÓN DE RESPONSABILIDADES
   • AuthContext para autenticación
   • ProductService para productos  
   • AppointmentService para citas
   
2. 📋 CONTRATOS ESTANDARIZADOS
   • APIs REST con esquemas JSON
   • Interfaces TypeScript estrictas
   
3. 🔗 ACOPLAMIENTO DÉBIL
   • Frontend independiente del backend
   • Comunicación solo vía APIs REST"
```

### **Slide 6: Principios SOA (Continuación)**
```
"4. 🎭 ABSTRACCIÓN
   • Supabase abstrae complejidad de BD
   • Servicios encapsulan lógica de negocio
   
5. ♻️ REUSABILIDAD
   • Componentes React modulares
   • APIs consumibles por múltiples clientes
   
6. 🏛️ AUTONOMÍA
   • Servicios desplegables independientemente
   • Base de datos autónoma con RLS"
```

### **Slide 7: Principios SOA (Final)**
```
"7. 🚫 SIN ESTADO (STATELESS)
   • APIs REST sin estado
   • Autenticación con JWT tokens
   
8. 🔍 DISCOVERABILIDAD
   • APIs autodocumentadas
   • Estructura navegable y clara
   • Documentación completa en GitHub"
```

---

## **💻 PARTE 5: ANÁLISIS DE CÓDIGO [8:00 - 10:30]**

### **Mostrar Archivo 1: supabase.ts [8:00 - 8:30]**
```
"Veamos la implementación del patrón BaaS (Backend-as-a-Service):

[MOSTRAR CÓDIGO en pantalla]

• Cliente Supabase como punto único de acceso
• Configuración PKCE para seguridad OAuth
• Abstracción completa de la infraestructura
• Principio de autonomía implementado"
```

### **Mostrar Archivo 2: AuthContext.tsx [8:30 - 9:00]**
```
"El contexto de autenticación demuestra separación de responsabilidades:

[MOSTRAR CÓDIGO en pantalla]

• Encapsulación completa de lógica de auth
• Reutilizable por toda la aplicación
• Contratos claros con TypeScript
• Manejo centralizado de estados"
```

### **Mostrar Archivo 3: Services [9:00 - 9:30]**
```
"Los servicios de negocio implementan autonomía y reusabilidad:

[MOSTRAR CÓDIGO en pantalla]

• ProductService autónomo
• Métodos con responsabilidades específicas
• Contratos bien definidos
• Fácilmente testeable y mantenible"
```

### **Mostrar Archivo 4: Components [9:30 - 10:00]**
```
"Los componentes React demuestran acoplamiento débil:

[MOSTRAR CÓDIGO en pantalla]

• Props tipadas con TypeScript
• Uso de hooks para servicios
• Componentes reutilizables
• Separación UI/lógica de negocio"
```

---

## **📊 PARTE 6: DIAGRAMAS DE ARQUITECTURA [10:00 - 11:30]**

### **Diagrama 1: Arquitectura General [10:00 - 10:30]**
```
"Este diagrama muestra la arquitectura SOA de tres capas:

[MOSTRAR DIAGRAMA 1]

• Frontend React independiente
• API Gateway con Supabase
• Backend services autónomos
• Comunicación únicamente vía REST APIs"
```

### **Diagrama 2: Servicios [10:30 - 11:00]**
```
"Los servicios implementan separación de responsabilidades:

[MOSTRAR DIAGRAMA 2]

• Cada servicio tiene una responsabilidad específica
• Interfaces bien definidas
• Servicios reutilizables e independientes"
```

### **Diagrama 3: Flujo de Autenticación [11:00 - 11:30]**
```
"El flujo de autenticación es completamente stateless:

[MOSTRAR DIAGRAMA 3]

• Comunicación REST sin estado
• JWT tokens para sesiones
• Separación autenticación/autorización"
```

---

## **🎯 PARTE 7: CONCLUSIONES [11:30 - 12:00]**

### **Slide Final: Resultados**
```
"RESULTADOS OBTENIDOS:

✅ Arquitectura SOA completa y funcional
✅ Aplicación en producción: tecnimotos-ya.vercel.app
✅ 85% de cumplimiento principios Thomas Erl
✅ Backend escalable con Supabase
✅ Frontend modular con React + TypeScript
✅ Documentación técnica completa

🎯 PRÓXIMOS PASOS:
• Implementación de más servicios de negocio
• Integración con pasarelas de pago
• Sistema de notificaciones en tiempo real
• Aplicación móvil consumiendo las mismas APIs"
```

### **Despedida**
```
"Gracias por su atención. 
El código completo está disponible en GitHub: 
github.com/Darmunoz227/tecnimotos-ya

¿Preguntas?"
```

---

## **📝 NOTAS PARA LA GRABACIÓN:**

### **Preparación Técnica:**
- ✅ Tener la aplicación funcionando en: https://tecnimotos-ya.vercel.app
- ✅ Credenciales demo listas: darmunoz@poligran.edu.co / demo123456
- ✅ VS Code abierto con los archivos clave
- ✅ Diagramas como imágenes o slides preparados

### **Timing Recomendado:**
- **Total: 10-12 minutos máximo**
- **Demo práctica: 2.5 minutos** (lo más importante)
- **Código: 2.5 minutos** (mostrar archivos clave)
- **Arquitectura: 2.5 minutos** (principios SOA)
- **Introducción/Conclusión: 2.5 minutos**

### **Tips de Grabación:**
- 🎤 Hablar claramente y pausadamente
- 🖱️ Movimientos de mouse lentos y deliberados
- 📺 Resolución de pantalla alta para legibilidad
- ⏸️ Pausas entre secciones para edición
- 🔄 Grabar secciones por separado si es necesario