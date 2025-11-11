import { createApp, h } from 'vue'
import MagicToast from '@/components/common/MagicToast.vue'

// Container para los toasts
let toastContainer = null
const activeToasts = new Map()

// Crear container si no existe
const ensureContainer = () => {
  if (!toastContainer) {
    toastContainer = document.createElement('div')
    toastContainer.id = 'magic-toast-container'
    toastContainer.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      pointer-events: none;
      z-index: 10000;
    `
    document.body.appendChild(toastContainer)
  }
  return toastContainer
}

// Función para mostrar toast
const showToast = (options) => {
  const {
    type = 'info',
    message = '',
    title = '',
    duration = 4000,
    position = 'top-right',
    showClose = true,
    showProgress = true,
  } = options

  const container = ensureContainer()
  const toastId = Date.now() + Math.random()

  // Crear wrapper para el toast
  const wrapper = document.createElement('div')
  wrapper.style.pointerEvents = 'auto'
  container.appendChild(wrapper)

  // Crear instancia de Vue para el toast
  const app = createApp({
    render() {
      return h(MagicToast, {
        type,
        message,
        title,
        duration,
        position,
        showClose,
        showProgress,
        onClose: () => {
          removeToast(toastId)
        },
      })
    },
  })

  const instance = app.mount(wrapper)

  // Guardar referencia
  activeToasts.set(toastId, {
    app,
    wrapper,
    instance,
  })

  return toastId
}

// Función para remover toast
const removeToast = (toastId) => {
  const toast = activeToasts.get(toastId)
  if (toast) {
    const { app, wrapper } = toast

    // Unmount y limpiar
    setTimeout(() => {
      app.unmount()
      if (wrapper.parentNode) {
        wrapper.parentNode.removeChild(wrapper)
      }
      activeToasts.delete(toastId)

      // Limpiar container si está vacío
      if (activeToasts.size === 0 && toastContainer) {
        if (toastContainer.parentNode) {
          toastContainer.parentNode.removeChild(toastContainer)
        }
        toastContainer = null
      }
    }, 300) // Esperar animación de salida
  }
}

// Composable principal
export const useMagicToast = () => {
  // Métodos de ayuda para cada tipo
  const success = (message, options = {}) => {
    return showToast({
      type: 'success',
      message,
      title: options.title || '✨ Success',
      ...options,
    })
  }

  const error = (message, options = {}) => {
    return showToast({
      type: 'error',
      message,
      title: options.title || '⚠️ Error',
      duration: options.duration || 5000, // Más tiempo para errores
      ...options,
    })
  }

  const warning = (message, options = {}) => {
    return showToast({
      type: 'warning',
      message,
      title: options.title || '⚡ Warning',
      ...options,
    })
  }

  const info = (message, options = {}) => {
    return showToast({
      type: 'info',
      message,
      title: options.title || 'ℹ️ Info',
      ...options,
    })
  }

  const spell = (message, options = {}) => {
    return showToast({
      type: 'spell',
      message,
      title: options.title || '🪄 Magic',
      ...options,
    })
  }

  // Atajos temáticos
  const lumos = (message, options = {}) => {
    return success(message, {
      title: '✨ Lumos',
      ...options,
    })
  }

  const expelliarmus = (message, options = {}) => {
    return error(message, {
      title: '⚡ Expelliarmus',
      ...options,
    })
  }

  const protego = (message, options = {}) => {
    return warning(message, {
      title: '🛡️ Protego',
      ...options,
    })
  }

  const accio = (message, options = {}) => {
    return info(message, {
      title: '🎯 Accio',
      ...options,
    })
  }

  // Método genérico
  const show = (options) => {
    return showToast(options)
  }

  // Cerrar toast específico
  const close = (toastId) => {
    removeToast(toastId)
  }

  // Cerrar todos los toasts
  const closeAll = () => {
    activeToasts.forEach((_, toastId) => {
      removeToast(toastId)
    })
  }

  return {
    // Métodos estándar
    success,
    error,
    warning,
    info,
    spell,
    show,
    close,
    closeAll,

    // Métodos temáticos Harry Potter
    lumos, // Success brillante
    expelliarmus, // Error/desarmar
    protego, // Warning/protección
    accio, // Info/atraer atención
  }
}

// Export por defecto para uso directo
export default useMagicToast
