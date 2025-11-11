import { createApp, h } from 'vue'
import MagicModal from '@/components/common/MagicModal.vue'

// Container para los modales
let modalContainer = null

// Crear container si no existe
const ensureContainer = () => {
  if (!modalContainer) {
    modalContainer = document.createElement('div')
    modalContainer.id = 'magic-modal-container'
    document.body.appendChild(modalContainer)
  }
  return modalContainer
}

// Función para mostrar modal
const showModal = (options) => {
  return new Promise((resolve, reject) => {
    const {
      type = 'confirm',
      title = '',
      message = '',
      confirmText = 'Confirm',
      cancelText = 'Cancel',
      showCancel = true,
      closeOnBackdrop = true,
      requireInput = false,
      inputPlaceholder = 'Type here...',
      showDontAskAgain = false,
    } = options

    const container = ensureContainer()

    // Crear wrapper para el modal
    const wrapper = document.createElement('div')
    container.appendChild(wrapper)

    // Crear instancia de Vue para el modal
    const app = createApp({
      render() {
        return h(MagicModal, {
          type,
          title,
          message,
          confirmText,
          cancelText,
          showCancel,
          closeOnBackdrop,
          requireInput,
          inputPlaceholder,
          showDontAskAgain,
          onConfirm: (data) => {
            resolve(data)
            cleanup()
          },
          onCancel: () => {
            reject(new Error('cancelled'))
            cleanup()
          },
          onClose: () => {
            reject(new Error('closed'))
            cleanup()
          },
        })
      },
    })

    app.mount(wrapper)

    // Función de limpieza
    const cleanup = () => {
      setTimeout(() => {
        app.unmount()
        if (wrapper.parentNode) {
          wrapper.parentNode.removeChild(wrapper)
        }

        // Limpiar container si está vacío
        if (modalContainer && modalContainer.children.length === 0) {
          if (modalContainer.parentNode) {
            modalContainer.parentNode.removeChild(modalContainer)
          }
          modalContainer = null
        }
      }, 300) // Esperar animación de salida
    }
  })
}

// Composable principal
export const useMagicModal = () => {
  // Método de confirmación estándar
  const confirm = async (message, options = {}) => {
    try {
      await showModal({
        type: 'confirm',
        title: options.title || '🪄 Confirm Action',
        message,
        confirmText: options.confirmText || 'Confirm',
        cancelText: options.cancelText || 'Cancel',
        ...options,
      })
      return true
    } catch {
      return false
    }
  }

  // Confirmación de advertencia
  const warning = async (message, options = {}) => {
    try {
      await showModal({
        type: 'warning',
        title: options.title || '⚡ Warning',
        message,
        confirmText: options.confirmText || 'Proceed',
        cancelText: options.cancelText || 'Cancel',
        ...options,
      })
      return true
    } catch {
      return false
    }
  }

  // Confirmación peligrosa
  const danger = async (message, options = {}) => {
    try {
      await showModal({
        type: 'danger',
        title: options.title || '⚠️ Dangerous Action',
        message,
        confirmText: options.confirmText || 'Delete',
        cancelText: options.cancelText || 'Cancel',
        ...options,
      })
      return true
    } catch {
      return false
    }
  }

  // Modal informativo
  const info = async (message, options = {}) => {
    try {
      await showModal({
        type: 'info',
        title: options.title || 'ℹ️ Information',
        message,
        confirmText: options.confirmText || 'OK',
        showCancel: false,
        ...options,
      })
      return true
    } catch {
      return false
    }
  }

  // Modal con input
  const prompt = async (message, options = {}) => {
    try {
      const result = await showModal({
        type: options.type || 'confirm',
        title: options.title || '📝 Input Required',
        message,
        confirmText: options.confirmText || 'Submit',
        cancelText: options.cancelText || 'Cancel',
        requireInput: true,
        inputPlaceholder: options.placeholder || 'Type here...',
        ...options,
      })
      return result.value
    } catch {
      return null
    }
  }

  // ===== MÉTODOS TEMÁTICOS HARRY POTTER =====

  // Avada Kedavra - Acción destructiva/eliminación
  const avadaKedavra = async (message, options = {}) => {
    return danger(message, {
      title: '💀 Avada Kedavra',
      confirmText: 'Cast Spell',
      message: `⚠️ ${message}\n\nThis action cannot be undone!`,
      ...options,
    })
  }

  // Expecto Patronum - Confirmación de protección/seguridad
  const expectoPatronum = async (message, options = {}) => {
    return confirm(message, {
      title: '🦌 Expecto Patronum',
      confirmText: 'Protect',
      ...options,
    })
  }

  // Crucio - Advertencia seria
  const crucio = async (message, options = {}) => {
    return warning(message, {
      title: '⚡ Crucio',
      confirmText: 'I Understand',
      ...options,
    })
  }

  // Obliviate - Confirmación de eliminación de datos
  const obliviate = async (message, options = {}) => {
    return danger(message, {
      title: '🌀 Obliviate',
      confirmText: 'Erase',
      message: `${message}\n\nAll related data will be permanently removed.`,
      showDontAskAgain: true,
      ...options,
    })
  }

  // Riddikulus - Confirmación ligera/divertida
  const riddikulus = async (message, options = {}) => {
    return confirm(message, {
      title: '😄 Riddikulus',
      confirmText: 'Make It Funny',
      ...options,
    })
  }

  // Imperio - Forzar confirmación importante
  const imperio = async (message, options = {}) => {
    return showModal({
      type: 'warning',
      title: '👁️ Imperio',
      message: `${message}\n\nYou must confirm this action.`,
      confirmText: 'I Accept',
      closeOnBackdrop: false,
      ...options,
    })
      .then(() => true)
      .catch(() => false)
  }

  // Alohomora - Desbloquear/abrir con confirmación
  const alohomora = async (message, options = {}) => {
    return confirm(message, {
      title: '🔓 Alohomora',
      confirmText: 'Unlock',
      ...options,
    })
  }

  // Método genérico para casos personalizados
  const show = (options) => {
    return showModal(options)
  }

  return {
    // Métodos estándar
    confirm,
    warning,
    danger,
    info,
    prompt,
    show,

    // Métodos temáticos Harry Potter
    avadaKedavra, // Eliminación destructiva
    expectoPatronum, // Protección/Confirmación segura
    crucio, // Advertencia seria
    obliviate, // Borrar datos
    riddikulus, // Confirmación ligera
    imperio, // Confirmación forzada
    alohomora, // Desbloquear/Abrir
  }
}

// Export por defecto
export default useMagicModal
