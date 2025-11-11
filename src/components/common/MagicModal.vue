<template>
  <Teleport to="body">
    <Transition name="modal-fade">
      <div v-if="visible" class="magic-modal-backdrop" @click="handleBackdropClick">
        <Transition name="modal-scale">
          <div v-if="visible" class="magic-modal" role="dialog" aria-modal="true" @click.stop>
            <!-- Efectos mágicos de fondo -->
            <div class="magic-modal__effects">
              <div
                v-for="i in 8"
                :key="i"
                class="magic-circle"
                :style="{ animationDelay: `${i * 0.2}s` }"
              ></div>
            </div>

            <!-- Icono del tipo -->
            <div class="magic-modal__icon" :class="`magic-modal__icon--${type}`">
              <component :is="iconComponent" />
            </div>

            <!-- Contenido -->
            <div class="magic-modal__content">
              <h3 v-if="title" class="magic-modal__title">{{ title }}</h3>
              <p class="magic-modal__message">{{ message }}</p>

              <!-- Input adicional si es requerido -->
              <input
                v-if="requireInput"
                v-model="inputValue"
                :placeholder="inputPlaceholder"
                class="magic-modal__input"
                @keyup.enter="handleConfirm"
              />
            </div>

            <!-- Acciones -->
            <div class="magic-modal__actions">
              <button
                v-if="showCancel"
                class="magic-modal__button magic-modal__button--cancel"
                @click="handleCancel"
              >
                {{ cancelText }}
              </button>
              <button
                class="magic-modal__button magic-modal__button--confirm"
                :class="`magic-modal__button--${type}`"
                :disabled="requireInput && !inputValue"
                @click="handleConfirm"
              >
                {{ confirmText }}
              </button>
            </div>

            <!-- Don't ask again checkbox -->
            <label v-if="showDontAskAgain" class="magic-modal__checkbox">
              <input v-model="dontAskAgain" type="checkbox" />
              <span>Don't ask me again</span>
            </label>
          </div>
        </Transition>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, h } from 'vue'

// Props
const props = defineProps({
  type: {
    type: String,
    default: 'confirm',
    validator: (value) => ['confirm', 'warning', 'danger', 'info'].includes(value),
  },
  title: {
    type: String,
    default: '',
  },
  message: {
    type: String,
    required: true,
  },
  confirmText: {
    type: String,
    default: 'Confirm',
  },
  cancelText: {
    type: String,
    default: 'Cancel',
  },
  showCancel: {
    type: Boolean,
    default: true,
  },
  closeOnBackdrop: {
    type: Boolean,
    default: true,
  },
  requireInput: {
    type: Boolean,
    default: false,
  },
  inputPlaceholder: {
    type: String,
    default: 'Type here...',
  },
  showDontAskAgain: {
    type: Boolean,
    default: false,
  },
})

// Emits
const emit = defineEmits(['confirm', 'cancel', 'close'])

// Estado
const visible = ref(false)
const inputValue = ref('')
const dontAskAgain = ref(false)

// Computed
const iconComponent = computed(() => {
  const icons = {
    confirm: () =>
      h(
        'svg',
        { width: '48', height: '48', viewBox: '0 0 24 24', fill: 'none' },
        h('path', {
          d: 'M9 12L11 14L15 10M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z',
          stroke: 'currentColor',
          'stroke-width': '2',
          'stroke-linecap': 'round',
          'stroke-linejoin': 'round',
        }),
      ),
    warning: () =>
      h(
        'svg',
        { width: '48', height: '48', viewBox: '0 0 24 24', fill: 'none' },
        h('path', {
          d: 'M12 9V13M12 17H12.01M10.29 3.86L1.82 18C1.64537 18.3024 1.55296 18.6453 1.55199 18.9945C1.55101 19.3437 1.64151 19.6871 1.81445 19.9905C1.98738 20.2939 2.23675 20.5467 2.53773 20.7239C2.83871 20.9011 3.18082 20.9962 3.53 21H20.47C20.8192 20.9962 21.1613 20.9011 21.4623 20.7239C21.7633 20.5467 22.0126 20.2939 22.1856 19.9905C22.3585 19.6871 22.449 19.3437 22.448 18.9945C22.447 18.6453 22.3546 18.3024 22.18 18L13.71 3.86C13.5317 3.56611 13.2807 3.32312 12.9812 3.15448C12.6817 2.98585 12.3437 2.89725 12 2.89725C11.6563 2.89725 11.3183 2.98585 11.0188 3.15448C10.7193 3.32312 10.4683 3.56611 10.29 3.86Z',
          stroke: 'currentColor',
          'stroke-width': '2',
          'stroke-linecap': 'round',
          'stroke-linejoin': 'round',
        }),
      ),
    danger: () =>
      h(
        'svg',
        { width: '48', height: '48', viewBox: '0 0 24 24', fill: 'none' },
        h('path', {
          d: 'M12 8V12M12 16H12.01M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z',
          stroke: 'currentColor',
          'stroke-width': '2',
          'stroke-linecap': 'round',
          'stroke-linejoin': 'round',
        }),
      ),
    info: () =>
      h(
        'svg',
        { width: '48', height: '48', viewBox: '0 0 24 24', fill: 'none' },
        h('path', {
          d: 'M13 16H12V12H11M12 8H12.01M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z',
          stroke: 'currentColor',
          'stroke-width': '2',
          'stroke-linecap': 'round',
          'stroke-linejoin': 'round',
        }),
      ),
  }
  return icons[props.type] || icons.confirm
})

// Métodos
const show = () => {
  visible.value = true
}

const close = () => {
  visible.value = false
  emit('close')
}

const handleConfirm = () => {
  if (props.requireInput && !inputValue.value) return

  emit('confirm', {
    value: inputValue.value,
    dontAskAgain: dontAskAgain.value,
  })
  close()
}

const handleCancel = () => {
  emit('cancel')
  close()
}

const handleBackdropClick = () => {
  if (props.closeOnBackdrop) {
    handleCancel()
  }
}

// Manejar tecla Escape
const handleEscape = (e) => {
  if (e.key === 'Escape' && visible.value) {
    handleCancel()
  }
}

// Lifecycle
onMounted(() => {
  show()
  document.addEventListener('keydown', handleEscape)
  // Prevenir scroll del body
  document.body.style.overflow = 'hidden'
})

onUnmounted(() => {
  document.removeEventListener('keydown', handleEscape)
  document.body.style.overflow = ''
})

// Exponer métodos
defineExpose({
  show,
  close,
})
</script>

<style scoped lang="scss">
.magic-modal-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.7);
  backdrop-filter: blur(8px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  padding: 20px;
}

.magic-modal {
  position: relative;
  width: 100%;
  max-width: 450px;
  background: linear-gradient(135deg, rgba(17, 28, 34, 0.98) 0%, rgba(25, 43, 51, 0.98) 100%);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 16px;
  padding: 32px 28px;
  box-shadow:
    0 20px 60px rgba(0, 0, 0, 0.5),
    0 0 0 1px rgba(255, 255, 255, 0.05);
  overflow: hidden;

  // Efectos mágicos de fondo
  &__effects {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    overflow: hidden;

    .magic-circle {
      position: absolute;
      width: 100px;
      height: 100px;
      border: 1px solid rgba(255, 255, 255, 0.1);
      border-radius: 50%;
      animation: float-circle 8s ease-in-out infinite;

      @for $i from 1 through 8 {
        &:nth-child(#{$i}) {
          left: random(100) * 1%;
          top: random(100) * 1%;
          width: (50 + random(100)) * 1px;
          height: (50 + random(100)) * 1px;
        }
      }
    }
  }

  // Icono
  &__icon {
    position: relative;
    width: 64px;
    height: 64px;
    margin: 0 auto 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    animation: pulse-icon 2s ease-in-out infinite;

    &--confirm {
      color: #4a90e2;
      background: rgba(74, 144, 226, 0.1);
      border: 2px solid rgba(74, 144, 226, 0.3);
    }

    &--warning {
      color: #f5a623;
      background: rgba(245, 166, 35, 0.1);
      border: 2px solid rgba(245, 166, 35, 0.3);
    }

    &--danger {
      color: #ef4444;
      background: rgba(239, 68, 68, 0.1);
      border: 2px solid rgba(239, 68, 68, 0.3);
    }

    &--info {
      color: #50e3c2;
      background: rgba(80, 227, 194, 0.1);
      border: 2px solid rgba(80, 227, 194, 0.3);
    }
  }

  // Contenido
  &__content {
    position: relative;
    text-align: center;
    margin-bottom: 24px;
  }

  &__title {
    font-size: 22px;
    font-weight: 700;
    color: #ffffff;
    margin: 0 0 12px 0;
    font-family: 'Wizard World', 'Inter', sans-serif;
    letter-spacing: 0.5px;
  }

  &__message {
    font-size: 15px;
    line-height: 1.6;
    color: rgba(255, 255, 255, 0.85);
    margin: 0;
  }

  &__input {
    width: 100%;
    margin-top: 16px;
    padding: 12px 16px;
    background: rgba(255, 255, 255, 0.05);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 8px;
    color: #ffffff;
    font-size: 14px;
    outline: none;
    transition: all 0.3s ease;

    &:focus {
      background: rgba(255, 255, 255, 0.08);
      border-color: rgba(74, 144, 226, 0.5);
      box-shadow: 0 0 0 3px rgba(74, 144, 226, 0.1);
    }

    &::placeholder {
      color: rgba(255, 255, 255, 0.4);
    }
  }

  // Acciones
  &__actions {
    position: relative;
    display: flex;
    gap: 12px;
    margin-bottom: 16px;
  }

  &__button {
    flex: 1;
    padding: 12px 24px;
    border: none;
    border-radius: 8px;
    font-size: 14px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
    font-family: 'Inter', sans-serif;
    letter-spacing: 0.3px;

    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
    }

    &:active {
      transform: translateY(0);
    }

    &:disabled {
      opacity: 0.5;
      cursor: not-allowed;
      transform: none !important;
    }

    &--cancel {
      background: rgba(255, 255, 255, 0.1);
      color: rgba(255, 255, 255, 0.8);
      border: 1px solid rgba(255, 255, 255, 0.2);

      &:hover:not(:disabled) {
        background: rgba(255, 255, 255, 0.15);
      }
    }

    &--confirm {
      color: #ffffff;

      &.magic-modal__button--confirm {
        background: linear-gradient(135deg, #4a90e2 0%, #357abd 100%);
        box-shadow: 0 0 20px rgba(74, 144, 226, 0.3);
      }

      &.magic-modal__button--warning {
        background: linear-gradient(135deg, #f5a623 0%, #e59400 100%);
        box-shadow: 0 0 20px rgba(245, 166, 35, 0.3);
      }

      &.magic-modal__button--danger {
        background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%);
        box-shadow: 0 0 20px rgba(239, 68, 68, 0.3);
      }

      &.magic-modal__button--info {
        background: linear-gradient(135deg, #50e3c2 0%, #4fd1b5 100%);
        box-shadow: 0 0 20px rgba(80, 227, 194, 0.3);
      }
    }
  }

  // Checkbox
  &__checkbox {
    position: relative;
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 13px;
    color: rgba(255, 255, 255, 0.6);
    cursor: pointer;
    user-select: none;

    input[type='checkbox'] {
      width: 16px;
      height: 16px;
      cursor: pointer;
    }

    &:hover {
      color: rgba(255, 255, 255, 0.8);
    }
  }
}

// Animaciones
@keyframes pulse-icon {
  0%,
  100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
}

@keyframes float-circle {
  0%,
  100% {
    transform: translate(0, 0) rotate(0deg);
    opacity: 0.1;
  }
  50% {
    transform: translate(20px, -20px) rotate(180deg);
    opacity: 0.3;
  }
}

// Transiciones
.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity 0.3s ease;
}

.modal-fade-enter-from,
.modal-fade-leave-to {
  opacity: 0;
}

.modal-scale-enter-active {
  transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.modal-scale-leave-active {
  transition: all 0.2s ease-out;
}

.modal-scale-enter-from {
  opacity: 0;
  transform: scale(0.9) translateY(-20px);
}

.modal-scale-leave-to {
  opacity: 0;
  transform: scale(0.95) translateY(10px);
}

// Responsive
@media (max-width: 500px) {
  .magic-modal {
    max-width: calc(100vw - 40px);
    padding: 24px 20px;

    &__icon {
      width: 56px;
      height: 56px;
    }

    &__title {
      font-size: 20px;
    }

    &__message {
      font-size: 14px;
    }

    &__actions {
      flex-direction: column;
    }

    &__button {
      width: 100%;
    }
  }
}
</style>
