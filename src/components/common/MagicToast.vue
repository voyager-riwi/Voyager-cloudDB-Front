<template>
  <Transition
    name="magic-toast"
    @before-enter="onBeforeEnter"
    @enter="onEnter"
    @leave="onLeave"
  >
    <div
      v-if="visible"
      :class="['magic-toast', `magic-toast--${type}`, positionClass]"
      role="alert"
      @mouseenter="pauseTimer"
      @mouseleave="resumeTimer"
    >
      <!-- Efecto de partículas mágicas -->
      <div class="magic-particles">
        <span v-for="i in 6" :key="i" class="particle"></span>
      </div>

      <!-- Icono del tipo de toast -->
      <div class="magic-toast__icon">
        <component :is="iconComponent" />
      </div>

      <!-- Contenido -->
      <div class="magic-toast__content">
        <h4 v-if="title" class="magic-toast__title">{{ title }}</h4>
        <p class="magic-toast__message">{{ message }}</p>
      </div>

      <!-- Botón cerrar -->
      <button
        v-if="showClose"
        class="magic-toast__close"
        @click="close"
        aria-label="Close notification"
      >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path
            d="M12 4L4 12M4 4L12 12"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
          />
        </svg>
      </button>

      <!-- Barra de progreso -->
      <div v-if="showProgress" class="magic-toast__progress">
        <div class="magic-toast__progress-bar" :style="{ width: progressWidth + '%' }"></div>
      </div>
    </div>
  </Transition>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, h } from 'vue'

// Props
const props = defineProps({
  type: {
    type: String,
    default: 'info',
    validator: (value) => ['success', 'error', 'warning', 'info', 'spell'].includes(value),
  },
  message: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    default: '',
  },
  duration: {
    type: Number,
    default: 4000,
  },
  position: {
    type: String,
    default: 'top-right',
    validator: (value) =>
      ['top-left', 'top-right', 'bottom-left', 'bottom-right', 'top-center'].includes(value),
  },
  showClose: {
    type: Boolean,
    default: true,
  },
  showProgress: {
    type: Boolean,
    default: true,
  },
})

// Emits
const emit = defineEmits(['close'])

// Estado reactivo
const visible = ref(false)
const progressWidth = ref(100)
let timer = null
let progressTimer = null
let startTime = null
let remainingTime = props.duration

// Computed
const positionClass = computed(() => `magic-toast--${props.position}`)

// Iconos SVG para cada tipo
const iconComponent = computed(() => {
  const icons = {
    success: () =>
      h(
        'svg',
        { width: '24', height: '24', viewBox: '0 0 24 24', fill: 'none' },
        h('path', {
          d: 'M9 12L11 14L15 10M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z',
          stroke: 'currentColor',
          'stroke-width': '2',
          'stroke-linecap': 'round',
          'stroke-linejoin': 'round',
        }),
      ),
    error: () =>
      h(
        'svg',
        { width: '24', height: '24', viewBox: '0 0 24 24', fill: 'none' },
        h('path', {
          d: 'M12 8V12M12 16H12.01M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z',
          stroke: 'currentColor',
          'stroke-width': '2',
          'stroke-linecap': 'round',
          'stroke-linejoin': 'round',
        }),
      ),
    warning: () =>
      h(
        'svg',
        { width: '24', height: '24', viewBox: '0 0 24 24', fill: 'none' },
        h('path', {
          d: 'M12 9V13M12 17H12.01M10.29 3.86L1.82 18C1.64537 18.3024 1.55296 18.6453 1.55199 18.9945C1.55101 19.3437 1.64151 19.6871 1.81445 19.9905C1.98738 20.2939 2.23675 20.5467 2.53773 20.7239C2.83871 20.9011 3.18082 20.9962 3.53 21H20.47C20.8192 20.9962 21.1613 20.9011 21.4623 20.7239C21.7633 20.5467 22.0126 20.2939 22.1856 19.9905C22.3585 19.6871 22.449 19.3437 22.448 18.9945C22.447 18.6453 22.3546 18.3024 22.18 18L13.71 3.86C13.5317 3.56611 13.2807 3.32312 12.9812 3.15448C12.6817 2.98585 12.3437 2.89725 12 2.89725C11.6563 2.89725 11.3183 2.98585 11.0188 3.15448C10.7193 3.32312 10.4683 3.56611 10.29 3.86Z',
          stroke: 'currentColor',
          'stroke-width': '2',
          'stroke-linecap': 'round',
          'stroke-linejoin': 'round',
        }),
      ),
    info: () =>
      h(
        'svg',
        { width: '24', height: '24', viewBox: '0 0 24 24', fill: 'none' },
        h('path', {
          d: 'M13 16H12V12H11M12 8H12.01M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z',
          stroke: 'currentColor',
          'stroke-width': '2',
          'stroke-linecap': 'round',
          'stroke-linejoin': 'round',
        }),
      ),
    spell: () =>
      h(
        'svg',
        { width: '24', height: '24', viewBox: '0 0 24 24', fill: 'none' },
        h('path', {
          d: 'M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z',
          stroke: 'currentColor',
          'stroke-width': '2',
          'stroke-linecap': 'round',
          'stroke-linejoin': 'round',
          fill: 'currentColor',
          'fill-opacity': '0.2',
        }),
      ),
  }
  return icons[props.type] || icons.info
})

// Métodos
const show = () => {
  visible.value = true
  startTimer()
  startProgressTimer()
}

const close = () => {
  clearTimer()
  clearProgressTimer()
  visible.value = false
  setTimeout(() => {
    emit('close')
  }, 300) // Esperar animación de salida
}

const startTimer = () => {
  if (props.duration > 0) {
    startTime = Date.now()
    timer = setTimeout(() => {
      close()
    }, remainingTime)
  }
}

const clearTimer = () => {
  if (timer) {
    clearTimeout(timer)
    timer = null
  }
}

const pauseTimer = () => {
  if (timer) {
    clearTimer()
    remainingTime -= Date.now() - startTime
    clearProgressTimer()
  }
}

const resumeTimer = () => {
  if (props.duration > 0 && !timer) {
    startTimer()
    startProgressTimer()
  }
}

const startProgressTimer = () => {
  if (props.showProgress && props.duration > 0) {
    const interval = 50
    const step = (interval / props.duration) * 100

    progressTimer = setInterval(() => {
      progressWidth.value -= step
      if (progressWidth.value <= 0) {
        clearProgressTimer()
      }
    }, interval)
  }
}

const clearProgressTimer = () => {
  if (progressTimer) {
    clearInterval(progressTimer)
    progressTimer = null
  }
}

// Animaciones
const onBeforeEnter = (el) => {
  el.style.opacity = '0'
  el.style.transform = 'translateY(-20px) scale(0.95)'
}

const onEnter = (el, done) => {
  void el.offsetHeight // trigger reflow
  el.style.transition = 'all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)'
  el.style.opacity = '1'
  el.style.transform = 'translateY(0) scale(1)'
  done()
}

const onLeave = (el, done) => {
  el.style.transition = 'all 0.2s ease-out'
  el.style.opacity = '0'
  el.style.transform = 'translateX(100px) scale(0.9)'
  setTimeout(done, 200)
}

// Lifecycle
onMounted(() => {
  show()
})

onUnmounted(() => {
  clearTimer()
  clearProgressTimer()
})

// Exponer métodos para uso programático
defineExpose({
  close,
})
</script>

<style scoped lang="scss">
.magic-toast {
  position: fixed;
  min-width: 300px;
  max-width: 450px;
  padding: 16px 20px;
  background: linear-gradient(135deg, rgba(17, 28, 34, 0.98) 0%, rgba(25, 43, 51, 0.98) 100%);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  box-shadow:
    0 10px 40px rgba(0, 0, 0, 0.3),
    0 0 0 1px rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(20px);
  display: flex;
  align-items: flex-start;
  gap: 12px;
  z-index: 10000;
  cursor: default;
  transition: all 0.3s ease;
  overflow: hidden;

  &:hover {
    transform: translateY(-2px);
    box-shadow:
      0 15px 50px rgba(0, 0, 0, 0.4),
      0 0 0 1px rgba(255, 255, 255, 0.1);
  }

  // Posiciones
  &--top-right {
    top: 20px;
    right: 20px;
  }

  &--top-left {
    top: 20px;
    left: 20px;
  }

  &--top-center {
    top: 20px;
    left: 50%;
    transform: translateX(-50%);
  }

  &--bottom-right {
    bottom: 20px;
    right: 20px;
  }

  &--bottom-left {
    bottom: 20px;
    left: 20px;
  }

  // Tipos con colores temáticos Harry Potter
  &--success {
    border-color: rgba(80, 227, 194, 0.3);
    background: linear-gradient(135deg, rgba(17, 28, 34, 0.98) 0%, rgba(15, 89, 73, 0.3) 100%);

    .magic-toast__icon {
      color: #50e3c2;
    }

    .magic-toast__progress-bar {
      background: linear-gradient(90deg, #50e3c2 0%, #4fd1b5 100%);
    }
  }

  &--error {
    border-color: rgba(239, 68, 68, 0.3);
    background: linear-gradient(135deg, rgba(17, 28, 34, 0.98) 0%, rgba(127, 29, 29, 0.3) 100%);

    .magic-toast__icon {
      color: #ef4444;
    }

    .magic-toast__progress-bar {
      background: linear-gradient(90deg, #ef4444 0%, #dc2626 100%);
    }
  }

  &--warning {
    border-color: rgba(245, 166, 35, 0.3);
    background: linear-gradient(135deg, rgba(17, 28, 34, 0.98) 0%, rgba(120, 53, 15, 0.3) 100%);

    .magic-toast__icon {
      color: #f5a623;
    }

    .magic-toast__progress-bar {
      background: linear-gradient(90deg, #f5a623 0%, #f59e0b 100%);
    }
  }

  &--info {
    border-color: rgba(74, 144, 226, 0.3);
    background: linear-gradient(135deg, rgba(17, 28, 34, 0.98) 0%, rgba(30, 64, 175, 0.3) 100%);

    .magic-toast__icon {
      color: #4a90e2;
    }

    .magic-toast__progress-bar {
      background: linear-gradient(90deg, #4a90e2 0%, #3b82f6 100%);
    }
  }

  &--spell {
    border-color: rgba(168, 85, 247, 0.3);
    background: linear-gradient(135deg, rgba(17, 28, 34, 0.98) 0%, rgba(88, 28, 135, 0.3) 100%);

    .magic-toast__icon {
      color: #a855f7;
      animation: sparkle 2s ease-in-out infinite;
    }

    .magic-toast__progress-bar {
      background: linear-gradient(90deg, #a855f7 0%, #9333ea 100%);
    }
  }

  // Icono
  &__icon {
    flex-shrink: 0;
    width: 24px;
    height: 24px;
    display: flex;
    align-items: center;
    justify-content: center;
    animation: iconPulse 2s ease-in-out infinite;
  }

  // Contenido
  &__content {
    flex: 1;
    min-width: 0;
  }

  &__title {
    font-size: 14px;
    font-weight: 700;
    color: #ffffff;
    margin: 0 0 4px 0;
    font-family: 'Wizard World', 'Inter', sans-serif;
    letter-spacing: 0.5px;
  }

  &__message {
    font-size: 13px;
    color: rgba(255, 255, 255, 0.85);
    margin: 0;
    line-height: 1.5;
  }

  // Botón cerrar
  &__close {
    flex-shrink: 0;
    width: 20px;
    height: 20px;
    padding: 0;
    background: transparent;
    border: none;
    color: rgba(255, 255, 255, 0.5);
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 4px;
    transition: all 0.2s ease;

    &:hover {
      color: rgba(255, 255, 255, 0.9);
      background: rgba(255, 255, 255, 0.1);
      transform: rotate(90deg);
    }
  }

  // Barra de progreso
  &__progress {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 3px;
    background: rgba(255, 255, 255, 0.1);
    overflow: hidden;
  }

  &__progress-bar {
    height: 100%;
    transition: width 0.05s linear;
    box-shadow: 0 0 10px currentColor;
  }

  // Partículas mágicas
  .magic-particles {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    overflow: hidden;

    .particle {
      position: absolute;
      width: 3px;
      height: 3px;
      background: rgba(255, 255, 255, 0.6);
      border-radius: 50%;
      animation: float 3s ease-in-out infinite;
      opacity: 0;

      @for $i from 1 through 6 {
        &:nth-child(#{$i}) {
          left: random(100) * 1%;
          top: random(100) * 1%;
          animation-delay: #{$i * 0.3}s;
        }
      }
    }
  }
}

// Animaciones
@keyframes iconPulse {
  0%,
  100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.1);
  }
}

@keyframes sparkle {
  0%,
  100% {
    filter: brightness(1) drop-shadow(0 0 2px currentColor);
  }
  50% {
    filter: brightness(1.3) drop-shadow(0 0 8px currentColor);
  }
}

@keyframes float {
  0% {
    opacity: 0;
    transform: translateY(20px);
  }
  50% {
    opacity: 1;
  }
  100% {
    opacity: 0;
    transform: translateY(-20px);
  }
}

// Transiciones
.magic-toast-enter-active,
.magic-toast-leave-active {
  transition: all 0.3s ease;
}

// Responsive
@media (max-width: 768px) {
  .magic-toast {
    min-width: 280px;
    max-width: calc(100vw - 40px);
    margin: 0 20px;

    &--top-right,
    &--top-left {
      left: 50%;
      right: auto;
      transform: translateX(-50%);
    }

    &--bottom-right,
    &--bottom-left {
      left: 50%;
      right: auto;
      transform: translateX(-50%);
    }
  }
}
</style>
