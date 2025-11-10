# 🪄 Magic Notification System - CloudDB

Sistema de notificaciones mágico con temática de **Harry Potter** integrado en CloudDB.

---

## 📦 Componentes Creados

### 1. **MagicToast.vue** - Notificaciones Toast
Componente de notificaciones toast con efectos mágicos y partículas.

### 2. **MagicModal.vue** - Modales de Confirmación
Modal de confirmación elegante para reemplazar `alert()` y `confirm()`.

### 3. **useMagicToast.js** - Composable de Toasts
Composable para usar toasts desde cualquier componente.

### 4. **useMagicModal.js** - Composable de Modales
Composable para mostrar modales de confirmación.

---

## 🎯 Uso Básico

### Toast Notifications

```vue
<script setup>
import { useMagicToast } from '@/composables/useMagicToast'

const toast = useMagicToast()

// Métodos estándar
toast.success('Operation completed!')
toast.error('Something went wrong')
toast.warning('Be careful!')
toast.info('Here is some information')
toast.spell('Magic is happening! ✨')

// Métodos temáticos Harry Potter
toast.lumos('Database created successfully! ✨')
toast.expelliarmus('Access denied! ⚡')
toast.protego('Warning: This action is irreversible')
toast.accio('Fetching your data...')
</script>
```

### Opciones Avanzadas

```javascript
toast.success('Custom message', {
  title: '🎉 Custom Title',
  duration: 5000, // milisegundos
  position: 'top-right', // top-right, top-left, bottom-right, bottom-left, top-center
  showClose: true,
  showProgress: true,
})
```

---

## 🎭 Modales de Confirmación

### Uso Básico

```vue
<script setup>
import { useMagicModal } from '@/composables/useMagicModal'

const modal = useMagicModal()

const handleDelete = async () => {
  const confirmed = await modal.confirm('Are you sure you want to delete this?')
  
  if (confirmed) {
    // Usuario confirmó
    console.log('Confirmed!')
  } else {
    // Usuario canceló
    console.log('Cancelled')
  }
}
</script>
```

### Tipos de Modales

```javascript
// Confirmación estándar
const result = await modal.confirm('Are you sure?')

// Advertencia
const result = await modal.warning('This action may cause issues')

// Peligro (destructivo)
const result = await modal.danger('This will delete everything!')

// Informativo (sin cancelar)
await modal.info('Here is some important information')

// Prompt (con input)
const value = await modal.prompt('Enter your name:', {
  placeholder: 'John Doe'
})
```

---

## 🪄 Métodos Temáticos Harry Potter

### Toasts

| Método | Uso | Descripción |
|--------|-----|-------------|
| `lumos()` | Success brillante | Para operaciones exitosas |
| `expelliarmus()` | Error/desarmar | Para errores o accesos denegados |
| `protego()` | Warning/protección | Para advertencias |
| `accio()` | Info/atraer atención | Para información |

### Modales

| Método | Uso | Descripción |
|--------|-----|-------------|
| `avadaKedavra()` | Eliminación destructiva | Para acciones de eliminación permanente |
| `expectoPatronum()` | Protección/Confirmación segura | Para confirmar acciones de protección |
| `crucio()` | Advertencia seria | Para advertencias críticas |
| `obliviate()` | Borrar datos | Para confirmación de borrado de datos |
| `riddikulus()` | Confirmación ligera | Para confirmaciones no críticas |
| `imperio()` | Confirmación forzada | Para acciones que requieren confirmación obligatoria |
| `alohomora()` | Desbloquear/Abrir | Para acciones de desbloqueo o apertura |

---

## 💡 Ejemplos Completos

### Ejemplo 1: Eliminar Base de Datos

```vue
<script setup>
import { useMagicModal } from '@/composables/useMagicModal'
import { useMagicToast } from '@/composables/useMagicToast'

const modal = useMagicModal()
const toast = useMagicToast()

const deleteDatabase = async (dbId) => {
  // Modal de confirmación con temática mágica
  const confirmed = await modal.obliviate(
    'Are you sure you want to delete this database? All data will be lost forever.',
    {
      confirmText: 'Erase Forever',
      cancelText: 'Keep Database',
    }
  )
  
  if (!confirmed) return
  
  try {
    await api.databases.delete(dbId)
    toast.spell('Database has been erased from existence! 💨', {
      title: '🌀 Obliviate',
      duration: 4000,
    })
  } catch (error) {
    toast.expelliarmus('Failed to delete database', {
      duration: 5000,
    })
  }
}
</script>
```

### Ejemplo 2: Rotar Credenciales

```vue
<script setup>
const rotateCredentials = async () => {
  const confirmed = await modal.alohomora(
    'Generate new credentials? The old password will stop working immediately.',
    {
      confirmText: 'Rotate Credentials',
      cancelText: 'Keep Current',
    }
  )
  
  if (!confirmed) return
  
  try {
    const response = await api.databases.resetPassword(dbId)
    toast.lumos('New credentials generated! 🔐', {
      title: '✨ Alohomora',
    })
  } catch (error) {
    toast.error('Failed to rotate credentials')
  }
}
</script>
```

### Ejemplo 3: Copiar al Portapapeles

```vue
<script setup>
const copyToClipboard = async (text) => {
  try {
    await navigator.clipboard.writeText(text)
    toast.accio('Copied to clipboard! 📋', {
      duration: 2000,
    })
  } catch (error) {
    toast.error('Failed to copy')
  }
}
</script>
```

### Ejemplo 4: Crear Base de Datos

```vue
<script setup>
const createDatabase = async (data) => {
  try {
    const response = await api.databases.create(data)
    
    toast.spell('Your magical database has been summoned! ✨', {
      title: '🪄 Database Created',
      duration: 5000,
    })
    
    router.push(`/databases/${response.id}`)
  } catch (error) {
    toast.expelliarmus('Failed to create database', {
      duration: 4000,
    })
  }
}
</script>
```

---

## 🎨 Personalización

### Posiciones Disponibles

- `top-right` (default)
- `top-left`
- `top-center`
- `bottom-right`
- `bottom-left`

### Tipos de Toast

- `success` - Verde (operación exitosa)
- `error` - Rojo (error)
- `warning` - Naranja/Amarillo (advertencia)
- `info` - Azul (información)
- `spell` - Morado (magia especial)

### Tipos de Modal

- `confirm` - Azul (confirmación estándar)
- `warning` - Naranja (advertencia)
- `danger` - Rojo (acción peligrosa)
- `info` - Verde (información)

---

## ⚙️ Opciones Avanzadas

### Toast con todas las opciones

```javascript
toast.show({
  type: 'success',
  message: 'Your custom message',
  title: 'Custom Title',
  duration: 6000,
  position: 'bottom-right',
  showClose: true,
  showProgress: true,
})
```

### Modal con todas las opciones

```javascript
const result = await modal.show({
  type: 'danger',
  title: 'Dangerous Action',
  message: 'This is a custom modal',
  confirmText: 'Do It',
  cancelText: 'Never Mind',
  showCancel: true,
  closeOnBackdrop: false, // No cerrar al hacer click fuera
  requireInput: true, // Requiere input de texto
  inputPlaceholder: 'Type confirmation',
  showDontAskAgain: true, // Checkbox "Don't ask again"
})

// result.value contiene el texto del input
// result.dontAskAgain contiene el estado del checkbox
```

---

## 🚀 Migración desde `alert()` y `confirm()`

### Antes ❌

```javascript
if (confirm('Are you sure?')) {
  // do something
}

alert('Success!')
```

### Después ✅

```javascript
const confirmed = await modal.confirm('Are you sure?')
if (confirmed) {
  // do something
}

toast.success('Success!')
```

---

## 📝 Notas Importantes

1. **Async/Await**: Los modales devuelven Promesas, usa `await` o `.then()`
2. **Toast Stacking**: Los toasts se apilan automáticamente
3. **Responsive**: Todo es responsive y funciona en mobile
4. **Dark Mode**: Compatible con el dark mode de la app
5. **Accesibilidad**: Incluye roles ARIA y manejo de teclado
6. **Animaciones**: Transiciones suaves con partículas mágicas

---

## 🐛 Troubleshooting

### Los toasts no aparecen
- Verifica que hayas importado el composable
- Asegúrate de estar usando `toast.method()` correctamente

### Los modales no cierran
- Los modales se cierran automáticamente después de confirmar/cancelar
- Usa `closeOnBackdrop: false` si no quieres que se cierre al hacer click fuera

### Múltiples toasts superpuestos
- Usa `toast.closeAll()` para cerrar todos los toasts activos

---

## 🎓 Best Practices

1. **Usa métodos temáticos** para operaciones específicas
2. **Sé consistente** con los títulos y mensajes
3. **Mantén mensajes cortos** y claros
4. **Usa duraciones apropiadas**: 2-3s para success, 4-5s para errors
5. **Confirma acciones destructivas** siempre con modales
6. **Usa toasts para feedback** inmediato
7. **No abuses de las notificaciones** - solo para acciones importantes

---

## 📄 Licencia

Parte del proyecto CloudDB - Sistema de gestión de bases de datos en la nube con magia de Harry Potter 🪄✨
