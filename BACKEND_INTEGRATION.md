# 📡 Integración Backend - CloudDB Frontend

## ✅ Estado Actual: **Fase 1 Completada**

Fecha de actualización: 10 de noviembre de 2025

---

## 📋 Resumen Ejecutivo

Se ha completado exitosamente la **Fase 1: Infraestructura y Servicios Base** de la integración con el backend de CloudDB. Todos los endpoints de la API están ahora configurados y accesibles, con servicios completos implementados y stores de Pinia listos para manejar el estado de la aplicación.

---

## 🎯 Componentes Implementados

### 1. Configuración de Endpoints (`src/config/env.js`)

**Nuevos endpoints agregados:**

```javascript
// Databases
databases.restore(id)           // POST /api/Databases/{id}/restore
databases.resetPassword(id)     // POST /api/Databases/{id}/reset-password

// Users
users.changePassword            // POST /api/Users/change-password

// Plans (no requieren auth)
plans.list                      // GET /api/Plans
plans.get(id)                   // GET /api/Plans/{id}

// Payments
payments.createPreference       // POST /api/Payments/create-preference
payments.configTest             // GET /api/Payments/config-test
payments.debugOrder(orderId)    // GET /api/Payments/debug-order/{orderId}

// Webhooks
webhooks.mercadopago           // POST /api/Webhooks/mercadopago

// Health Check
health.check                   // GET /api/Health
health.error                   // GET /api/Health/error
```

---

### 2. Cliente API (`src/services/api.js`)

**Métodos implementados:**

#### Databases
- ✅ `databases.restore(id)` - Restaura BD eliminada (< 30 días)
- ✅ `databases.resetPassword(id)` - Resetea password (se envía por email)
- 📝 `databases.delete(id)` - Actualizado: ahora es **Soft Delete** con período de gracia

#### Users
- ✅ `users.changePassword(data)` - Cambia password del usuario

#### Plans
- ✅ `plans.list()` - Obtiene todos los planes
- ✅ `plans.get(id)` - Obtiene plan por ID

#### Payments
- ✅ `payments.createPreference(data)` - Crea preferencia de MercadoPago
- ✅ `payments.getConfigTest()` - Verifica configuración (debug)
- ✅ `payments.debugOrder(orderId)` - Consulta estado de orden (debug)

#### Health
- ✅ `health.check()` - Verifica estado del servidor
- ✅ `health.error()` - Prueba manejo de errores

---

### 3. Constantes del Sistema (`src/utils/constants/database.js`)

**Nuevo archivo creado** con todas las constantes necesarias:

```javascript
// Tipos de motores de BD
ENGINE_TYPES = {
  POSTGRESQL: 1,
  MYSQL: 2,
  MONGODB: 3,
  SQLSERVER: 4
}

// Tipos de planes
PLAN_TYPES = {
  FREE: 1,
  INTERMEDIATE: 2,
  ADVANCED: 3
}

// Límites por plan
PLAN_LIMITS = {
  1: 2,   // Free: 2 BDs por motor
  2: 5,   // Intermediate: 5 BDs por motor
  3: 10   // Advanced: 10 BDs por motor
}

// Precios (COP)
PLAN_PRICES = {
  1: 0,      // Free
  2: 5000,   // Intermediate
  3: 10000   // Advanced
}

// Estados de BD
DATABASE_STATUS = {
  RUNNING: 'Running',
  STOPPED: 'Stopped',
  DELETED: 'Deleted',
  PENDING: 'Pending'
}

// Período de gracia para restauración
GRACE_PERIOD_DAYS = 30
```

**Funciones helper incluidas:**
- `getEngineName(engineId)` - Nombre del motor
- `getPlanName(planType)` - Nombre del plan
- `formatPrice(price)` - Formato colombiano ($5.000)
- `getEngineColors(engineId)` - Colores tema Harry Potter
- Y 10 funciones más...

---

### 4. Servicio de Planes (`src/services/planService.js`)

**Completamente implementado** con lógica de negocio:

```javascript
// Métodos principales
getAllPlans()                      // Obtiene todos los planes
getPlanById(planId)                // Obtiene plan específico
getPlanInfo(planType)              // Info enriquecida del plan
comparePlans(current, target)      // Compara dos planes
canCreateDatabase(planType, count) // Valida límite
calculateUsageByEngine(databases)  // Calcula uso por motor
getRecommendations(databases)      // Sugiere upgrade si necesario
```

**Ejemplo de uso:**
```javascript
import planService from '@/services/planService'

// Verificar si puede crear BD
const { canCreate, message, remaining } = planService.canCreateDatabase(
  1,  // Free Plan
  2   // Ya tiene 2 PostgreSQL
)
// canCreate: false
// message: "Has alcanzado el límite de 2 bases de datos..."

// Calcular uso
const usage = planService.calculateUsageByEngine(databases, planType)
// {
//   1: { used: 2, limit: 2, remaining: 0, percentage: 100 },
//   2: { used: 1, limit: 2, remaining: 1, percentage: 50 },
//   ...
// }
```

---

### 5. Servicio de Pagos (`src/services/paymentService.js`)

**Completamente implementado** para MercadoPago:

```javascript
// Métodos principales
createPaymentPreference(planId)     // Crea preferencia
redirectToPayment(initPoint)        // Redirige a MP
createAndRedirect(planId)           // Método de conveniencia
processPaymentReturn(queryParams)   // Procesa retorno
isPaymentSuccessful(queryParams)    // Verifica éxito
parseExternalReference(ref)         // Extrae userId y planId
checkConfiguration()                // Debug: verifica config
debugOrder(orderId)                 // Debug: consulta orden
getErrorMessage(errorCode)          // Traduce errores MP
```

**Flujo completo:**
```javascript
import paymentService from '@/services/paymentService'

// 1. Crear preferencia y redirigir
await paymentService.createAndRedirect(planId)

// 2. Usuario completa pago en MercadoPago

// 3. MercadoPago redirige de vuelta con query params

// 4. Procesar retorno en la página de callback
const urlParams = new URLSearchParams(window.location.search)
const result = paymentService.processPaymentReturn(urlParams)

if (result.success) {
  toast.lumos('¡Pago aprobado! ✨')
  // El webhook ya actualizó el plan automáticamente
} else {
  toast.expelliarmus(result.message)
}
```

---

### 6. Servicio de Bases de Datos (`src/services/databaseService.js`)

**Completamente implementado** con toda la lógica de negocio:

```javascript
// CRUD Básico
getAllDatabases()                    // Lista todas las BDs
getDatabaseById(id)                  // Obtiene BD específica
createDatabase(engineId)             // Crea nueva BD
deleteDatabase(id)                   // Soft Delete (30 días)

// Nuevas funcionalidades
restoreDatabase(id)                  // Restaura BD eliminada
resetDatabasePassword(id)            // Resetea password

// Helpers
groupByEngine(databases)             // Agrupa por motor
countByEngine(databases)             // Cuenta por motor
filterByStatus(databases, status)    // Filtra por estado
getStatistics(databases)             // Estadísticas generales
canDelete(database)                  // Valida eliminación
canRestore(database)                 // Valida restauración
enrichDatabase(database)             // Agrega info extra
formatConnectionString(cs, hide)     // Formatea connection string
```

**Validaciones incluidas:**
```javascript
// Validar si puede eliminar
const { canDelete, reason } = databaseService.canDelete(database)

// Validar si puede restaurar (verifica período de gracia)
const { canRestore, reason } = databaseService.canRestore(database)

// Enriquecer con información extra
const enriched = databaseService.enrichDatabase(database)
// Agrega: engineId, engineLabel, canBeRestored, canBeDeleted, etc.
```

---

### 7. Store de Bases de Datos (`src/stores/databases.js`)

**Pinia store completamente funcional:**

```javascript
// Estado
databases          // Array de todas las BDs
currentDatabase    // BD actualmente seleccionada
loading            // Estado de carga
error              // Último error
lastFetch          // Timestamp de última carga

// Getters (computed)
activeDatabases      // BDs en estado Running
deletedDatabases     // BDs eliminadas (soft delete)
totalDatabases       // Conteo total
databasesByEngine    // Agrupadas por motor
countByEngine        // Conteo por motor
statistics           // Estadísticas generales
hasData              // Si hay datos cargados
needsRefresh         // Si necesita refrescar (> 5 min)

// Acciones
fetchDatabases(force)        // Carga todas las BDs
fetchDatabaseById(id)        // Carga BD específica
createDatabase(engineId)     // Crea nueva BD
deleteDatabase(id)           // Elimina BD (soft delete)
restoreDatabase(id)          // Restaura BD eliminada
resetPassword(id)            // Resetea password
findDatabase(id)             // Busca en el store
filterByEngine(engineId)     // Filtra por motor
clearError()                 // Limpia error
clearCurrent()               // Limpia selección
$reset()                     // Resetea todo (logout)
```

**Ejemplo de uso en componente:**
```vue
<script setup>
import { useDatabaseStore } from '@/stores/databases'

const dbStore = useDatabaseStore()

// Cargar bases de datos
await dbStore.fetchDatabases()

// Acceder a datos
console.log(dbStore.activeDatabases) // Solo las Running
console.log(dbStore.countByEngine)   // { 1: 2, 2: 1, 3: 0, 4: 1 }

// Crear BD
await dbStore.createDatabase(1) // PostgreSQL

// Eliminar BD
await dbStore.deleteDatabase(databaseId)

// Restaurar BD
await dbStore.restoreDatabase(databaseId)

// Resetear password
await dbStore.resetPassword(databaseId)
</script>
```

---

### 8. Store de Planes (`src/stores/plans.js`)

**Pinia store completamente funcional:**

```javascript
// Estado
plans           // Array de todos los planes
currentPlan     // Plan actualmente seleccionado
loading         // Estado de carga
error           // Último error
lastFetch       // Timestamp de última carga

// Getters (computed)
freePlan           // Plan Free
intermediatePlan   // Plan Intermediate
advancedPlan       // Plan Advanced
sortedPlans        // Ordenados por precio
totalPlans         // Conteo total
hasData            // Si hay datos cargados
needsRefresh       // Si necesita refrescar (> 15 min)

// Acciones
fetchPlans(force)               // Carga todos los planes
fetchPlanById(id)               // Carga plan específico
findPlan(id)                    // Busca por ID
findPlanByType(type)            // Busca por tipo
getPlanInfo(type)               // Info enriquecida
comparePlans(current, target)   // Compara planes
canCreateDatabase(type, count)  // Valida límite
calculateUsage(dbs, type)       // Calcula uso
getRecommendations(dbs, type)   // Sugerencias
selectPlan(plan)                // Selecciona plan
clearCurrent()                  // Limpia selección
clearError()                    // Limpia error
$reset()                        // Resetea todo (logout)
```

**Ejemplo de uso en componente:**
```vue
<script setup>
import { usePlanStore } from '@/stores/plans'

const planStore = usePlanStore()

// Cargar planes
await planStore.fetchPlans()

// Acceder a datos
console.log(planStore.freePlan)        // Plan Free
console.log(planStore.sortedPlans)     // [Free, Intermediate, Advanced]

// Obtener info enriquecida
const info = planStore.getPlanInfo(1)
// {
//   name: "Free Plan",
//   limit: 2,
//   price: 0,
//   formattedPrice: "$0",
//   maxTotal: 8,
//   isFree: true
// }

// Comparar planes
const comparison = planStore.comparePlans(1, 2)
// {
//   isUpgrade: true,
//   limitDifference: 3,
//   priceDifference: 5000,
//   formattedPriceDifference: "$5.000"
// }

// Verificar si puede crear BD
const { canCreate, message, remaining } = planStore.canCreateDatabase(1, 2)

// Calcular uso por motor
const usage = planStore.calculateUsage(databases, 1)
// { 1: { used: 2, limit: 2, remaining: 0, percentage: 100 }, ... }

// Obtener recomendaciones
const rec = planStore.getRecommendations(databases, 1)
// { shouldUpgrade: true, message: "...", suggestedPlan: 2 }
</script>
```

---

## 📦 Estructura de Archivos Actualizada

```
src/
├── config/
│   └── env.js                      ✅ Actualizado con todos los endpoints
├── services/
│   ├── api.js                      ✅ Actualizado con métodos faltantes
│   ├── planService.js              ✅ Nuevo - Lógica de planes
│   ├── paymentService.js           ✅ Nuevo - Integración MercadoPago
│   └── databaseService.js          ✅ Nuevo - Lógica de bases de datos
├── stores/
│   ├── databases.js                ✅ Nuevo - Store de BDs con Pinia
│   └── plans.js                    ✅ Nuevo - Store de planes con Pinia
└── utils/
    └── constants/
        └── database.js             ✅ Nuevo - Constantes del sistema
```

---

## 🔐 Información Crítica del Backend

### Soft Delete de Bases de Datos

**⚠️ IMPORTANTE:**
- Al eliminar una BD, el backend hace **Soft Delete**
- Período de gracia: **30 días** para restauración
- Durante este período:
  - La BD sigue contando para el límite del plan
  - El acceso se bloquea inmediatamente (password cambiado)
  - Se puede restaurar con `restoreDatabase(id)`
- Después de 30 días: **Eliminación permanente automática**

### Credenciales de Bases de Datos

**⚠️ CRÍTICO:**
- Las credenciales se muestran **UNA SOLA VEZ** en la respuesta de creación
- También se envían por **email** al usuario
- Si se pierden, hay dos opciones:
  1. `resetPassword(id)` - Nueva contraseña por email
  2. `restoreDatabase(id)` - Si está eliminada, genera nueva password

### Límites por Motor (no totales)

**Ejemplo Plan Free (límite: 2 por motor):**
- ✅ Puede tener: 2 PostgreSQL + 2 MySQL + 2 MongoDB + 2 SQL Server = **8 total**
- ❌ NO puede tener: 3 PostgreSQL (supera límite del motor)

### Motores de Bases de Datos

```javascript
1 = PostgreSQL
2 = MySQL
3 = MongoDB
4 = SQLServer (SQL Server)
```

### Tipos de Planes

```javascript
1 = Free Plan       (0 COP,      2 BDs por motor)
2 = Intermediate    (5.000 COP,  5 BDs por motor)
3 = Advanced        (10.000 COP, 10 BDs por motor)
```

---

## 🚀 Flujos Implementados

### 1. Flujo de Creación de BD

```javascript
// 1. Usuario selecciona motor (ej: PostgreSQL = 1)

// 2. Frontend valida límite
const { canCreate, message } = planStore.canCreateDatabase(
  userPlanType,
  currentPostgresqlCount
)

if (!canCreate) {
  toast.expelliarmus(message)
  return
}

// 3. Crear BD
const newDB = await dbStore.createDatabase(1)

// 4. GUARDAR CREDENCIALES INMEDIATAMENTE
// ⚠️ Solo se muestran una vez!
console.log(newDB.connectionString)
console.log(newDB.username)
// newDB.password NO se incluye por seguridad (enviada por email)

// 5. Notificar éxito
toast.lumos('Base de datos creada! Revisa tu email para las credenciales.')
```

### 2. Flujo de Eliminación de BD

```javascript
// 1. Confirmar con modal mágico
const confirmed = await modal.obliviate(
  '¿Eliminar base de datos?',
  'Período de gracia: 30 días para restaurar'
)

if (!confirmed) return

// 2. Eliminar (Soft Delete)
const result = await dbStore.deleteDatabase(databaseId)

// 3. Notificar
toast.spell(
  `BD eliminada. Puedes restaurarla durante ${result.gracePeriodDays} días.`
)
```

### 3. Flujo de Restauración de BD

```javascript
// 1. Verificar si puede restaurar
const { canRestore, reason } = databaseService.canRestore(database)

if (!canRestore) {
  toast.expelliarmus(reason)
  return
}

// 2. Confirmar restauración
const confirmed = await modal.expectoPatronum(
  '¿Restaurar esta base de datos?',
  'Se generará una nueva contraseña (enviada por email)'
)

if (!confirmed) return

// 3. Restaurar
await dbStore.restoreDatabase(databaseId)

// 4. Notificar
toast.lumos('BD restaurada! Revisa tu email para la nueva contraseña.')
```

### 4. Flujo de Pago con MercadoPago

```javascript
// 1. Usuario selecciona plan
const selectedPlan = planStore.intermediatePlan

// 2. Confirmar compra
const confirmed = await modal.confirm(
  `¿Comprar ${selectedPlan.name}?`,
  `Precio: ${formatPrice(selectedPlan.price)}`
)

if (!confirmed) return

// 3. Crear preferencia y redirigir
try {
  await paymentService.createAndRedirect(selectedPlan.id)
  // Usuario es redirigido a MercadoPago...
} catch (error) {
  toast.expelliarmus('Error creando preferencia de pago')
}

// 4. MercadoPago procesa el pago

// 5. Webhook automático actualiza el plan del usuario

// 6. Usuario es redirigido de vuelta a la app

// 7. En la página de retorno:
const urlParams = new URLSearchParams(window.location.search)
const result = paymentService.processPaymentReturn(urlParams)

if (result.success) {
  toast.lumos('¡Pago aprobado! Tu plan se actualizó. ✨')
  // Refrescar perfil del usuario
  await userStore.fetchProfile()
} else {
  toast.expelliarmus(result.message)
}
```

---

## 🎨 Integración con Sistema de Notificaciones Mágicas

**Todos los servicios están listos para usar con las notificaciones mágicas:**

```javascript
import { useMagicToast } from '@/composables/useMagicToast'
import { useMagicModal } from '@/composables/useMagicModal'

const toast = useMagicToast()
const modal = useMagicModal()

// Ejemplos de uso

// Crear BD
try {
  const db = await dbStore.createDatabase(engineId)
  toast.lumos('¡Base de datos creada! ✨')
} catch (error) {
  toast.expelliarmus(error.message)
}

// Eliminar BD
const confirmed = await modal.obliviate(
  '¿Eliminar base de datos?',
  'Período de gracia: 30 días'
)
if (confirmed) {
  await dbStore.deleteDatabase(id)
  toast.spell('BD eliminada')
}

// Restaurar BD
try {
  await dbStore.restoreDatabase(id)
  toast.expectoPatronum('BD restaurada! Nueva contraseña por email.')
} catch (error) {
  if (error.message.includes('grace period expired')) {
    toast.avadaKedavra('Período de gracia expirado')
  } else {
    toast.expelliarmus(error.message)
  }
}

// Pago exitoso
toast.accio('Plan actualizado! Ahora tienes más cupo.')
```

---

## 📊 Próximos Pasos (Fase 2)

### 🔴 Prioridad Alta
1. **Actualizar DatabaseDetails.vue**
   - Agregar botón "Restaurar BD" (solo si `isDeleted = true`)
   - Agregar botón "Resetear Password"
   - Mostrar advertencia de soft delete con contador de días restantes

2. **Actualizar CreateDatabaseModal.vue**
   - Validar límite por motor antes de crear
   - Mostrar cupo disponible: "PostgreSQL: 1/2 usados"
   - Mensaje de error si alcanzó el límite
   - Sugerir upgrade al plan siguiente

3. **Implementar PlansView.vue**
   - Mostrar los 3 planes con precios
   - Botón "Comprar Plan" → crea preferencia → redirige a MercadoPago
   - Crear página de retorno (`/plans/payment-success`)
   - Manejar estados: approved, pending, rejected

### 🟡 Prioridad Media
4. **Actualizar ProfileView.vue**
   - Mostrar plan actual del usuario
   - Mostrar límites por motor
   - Fecha de membresía (`memberSince`)
   - Botón para cambiar de plan

5. **Migrar componentes restantes a notificaciones mágicas**
   - LoginForm.vue
   - RegisterForm.vue
   - ChangePassword.vue
   - RecoveryForm.vue
   - ResetPasswordForm.vue

### 🟢 Prioridad Baja
6. **Dashboard de métricas**
   - CPU/RAM/Disk usage por BD
   - Query logs
   - Connection history

7. **Webhooks UI**
   - WebhooksView.vue
   - Gestión de webhooks personalizados

---

## 🐛 Notas de Debugging

### Para probar MercadoPago

```javascript
// 1. Verificar configuración
const config = await api.payments.getConfigTest()
console.log(config)
// {
//   configured: true,
//   mode: "PRODUCTION",
//   notificationUrl: "https://service.voyager.andrescortes.dev/api/Webhooks/mercadopago"
// }

// 2. Consultar estado de una orden
const order = await api.payments.debugOrder(35452151330)
console.log(order)
// {
//   orderId: 35452151330,
//   status: "closed",
//   orderStatus: "paid",
//   totalAmount: 5000.00
// }
```

### Para probar creación de BD

```javascript
// 1. Cargar planes y BDs
await planStore.fetchPlans()
await dbStore.fetchDatabases()

// 2. Ver cupo disponible
const usage = planStore.calculateUsage(dbStore.databases, userPlanType)
console.log(usage)

// 3. Intentar crear
const { canCreate, message } = planStore.canCreateDatabase(
  userPlanType,
  usage[1].used // PostgreSQL
)

if (canCreate) {
  await dbStore.createDatabase(1)
}
```

---

## 📚 Documentación de Referencia

- **Backend API:** `C:\Users\Brahiam\Documents\CloudDb-Back\API_DOCUMENTATION.md`
- **Base URL:** `https://service.voyager.andrescortes.dev/api`
- **Sistema de notificaciones:** `/MAGIC_NOTIFICATIONS_GUIDE.md`
- **Estado del proyecto:** `/IMPLEMENTATION_STATUS.md`

---

## ✅ Checklist de Integración

### Fase 1: Infraestructura (COMPLETADA ✅)
- [x] Configurar endpoints en `env.js`
- [x] Actualizar cliente API con métodos faltantes
- [x] Crear constantes del sistema
- [x] Implementar `planService.js`
- [x] Implementar `paymentService.js`
- [x] Implementar `databaseService.js`
- [x] Implementar store `databases.js`
- [x] Implementar store `plans.js`

### Fase 2: Componentes UI (Pendiente)
- [ ] Actualizar `DatabaseDetails.vue` (restaurar, resetear password)
- [ ] Actualizar `CreateDatabaseModal.vue` (validación de límites)
- [ ] Implementar `PlansView.vue` (flujo MercadoPago completo)
- [ ] Actualizar `ProfileView.vue` (info del plan)
- [ ] Crear página de retorno de pago (`/plans/payment-success`)

### Fase 3: Migraciones (Pendiente)
- [ ] Migrar componentes restantes a notificaciones mágicas
- [ ] Actualizar `README.md` con información completa
- [ ] Testing end-to-end de flujos críticos

---

**🎉 ¡Fase 1 completada exitosamente!**

Todos los servicios, stores y configuraciones están listos. Ahora podemos comenzar con la implementación de la UI que consumirá estos servicios.
