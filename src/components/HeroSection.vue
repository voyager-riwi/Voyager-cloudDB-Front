<template>
  <div class="app-container">
    <!-- Parallax Section -->
    <div class="parallax-container" @mousemove="moverParallax" @touchmove="moverParallaxTouch">
      <!-- Capas dinámicas con Vue -->
      <div
        class="capa fondo"
        :style="{
          transform: `translate(${posiciones.fondo.x}px, ${posiciones.fondo.y}px) scale(1.1)`,
        }"
      ></div>

      <!-- Capa MEDIO con breakpoints -->
      <div
        class="capa medio"
        :style="{
          transform: `translate(${posiciones.medio.x}px, ${posiciones.medio.y}px) scale(1.05)`,
          width: tamanoMedio + 'px',
          height: tamanoMedioHeight + 'px',
          top: posicionMedio.top,
          left: posicionMedio.left,
        }"
      ></div>

      <!-- Capa DELANTERO con breakpoints -->
      <div
        class="capa delante"
        :style="{
          transform: `translate(${posiciones.delante.x}px, ${posiciones.delante.y}px)`,
          width: tamanoDelante + 'px',
          height: tamanoDelante + 'px',
          top: posicionDelante.top,
          left: posicionDelante.left,
        }"
      ></div>
    </div>
  </div>
</template>

<script>
import { ref, reactive, computed, onMounted, onUnmounted } from 'vue'

export default {
  name: 'HeroSection',

  setup() {
    // Tamaños de las capas
    const tamanoMedio = ref(300)
    const tamanoMedioHeight = ref(200)
    const tamanoDelante = ref(2)
    const contenidoEl = ref(null)

    // Estado del viewport y debug
    const viewportWidth = ref(window.innerWidth)
    const showDebug = ref(true) // Cambia a false para ocultar

    // Breakpoints actualizados con 600px
    const BREAKPOINTS = {
      desktop: 1300,
      medium: 950,
      tablet: 768,
      small: 600, // NUEVO BREAKPOINT
      mobile: 480,
    }

    // Detectar breakpoint actual
    const currentBreakpoint = computed(() => {
      if (viewportWidth.value >= BREAKPOINTS.desktop) return 'desktop'
      if (viewportWidth.value >= BREAKPOINTS.medium) return 'medium'
      if (viewportWidth.value >= BREAKPOINTS.tablet) return 'tablet'
      if (viewportWidth.value >= BREAKPOINTS.small) return 'small' // NUEVO
      return 'mobile'
    })

    // Estados para diferentes breakpoints
    const isLargeScreen = computed(() => viewportWidth.value >= BREAKPOINTS.desktop)
    const isMediumScreen = computed(
      () => viewportWidth.value >= BREAKPOINTS.medium && viewportWidth.value < BREAKPOINTS.desktop,
    )
    const isTabletScreen = computed(
      () => viewportWidth.value >= BREAKPOINTS.tablet && viewportWidth.value < BREAKPOINTS.medium,
    )
    const isSmallScreen = computed(
      () => viewportWidth.value >= BREAKPOINTS.small && viewportWidth.value < BREAKPOINTS.tablet,
    )
    const isMobileScreen = computed(() => viewportWidth.value < BREAKPOINTS.small)

    // Posiciones reactivas de cada capa
    const posiciones = reactive({
      fondo: { x: 0, y: 0 },
      medio: { x: 0, y: 0 },
      delante: { x: 0, y: 0 },
      texto: { x: 0, y: 0 },
      contenido: { x: window.innerWidth / 2, y: window.innerHeight / 2 },
    })

    // POSICIONES CALCULADAS SEGÚN BREAKPOINT - MEDIO
    const posicionMedio = computed(() => {
      const centroX = posiciones.contenido.x
      const centroY = posiciones.contenido.y

      if (isLargeScreen.value) {
        // PARA PANTALLAS ≥ 1300px - Configuración original
        return {
          top: centroY - tamanoMedioHeight.value / 1 + 'px',
          left: centroX + tamanoMedio.value / 1 + 'px',
        }
      } else if (isMediumScreen.value) {
        // PARA PANTALLAS 950px - 1299px - Ajuste medio
        return {
          top: centroY - tamanoMedioHeight.value / 1.3 + 'px',
          left: centroX + tamanoMedio.value / 1.3 + 'px',
        }
      } else if (isTabletScreen.value) {
        // PARA PANTALLAS 768px - 949px - Ajuste tablet
        return {
          top: centroY - tamanoMedioHeight.value / 1.5 + 'px',
          left: centroX + tamanoMedio.value / 1.5 + 'px',
        }
      } else if (isSmallScreen.value) {
        // PARA PANTALLAS 600px - 767px - NUEVO BREAKPOINT
        return {
          top: centroY - tamanoMedioHeight.value / 1.8 + 'px',
          left: centroX + tamanoMedio.value / 1.8 + 'px',
        }
      } else {
        // PARA PANTALLAS < 600px - Ajuste móvil
        return {
          top: centroY - tamanoMedioHeight.value / 2.2 + 'px',
          left: centroX + tamanoMedio.value / 2.2 + 'px',
        }
      }
    })

    // POSICIONES CALCULADAS SEGÚN BREAKPOINT - DELANTERO
    const posicionDelante = computed(() => {
      const centroX = posiciones.contenido.x
      const centroY = posiciones.contenido.y

      if (isLargeScreen.value) {
        // PARA PANTALLAS ≥ 1300px - Configuración original
        return {
          top: centroY + tamanoDelante.value / 2 + 'px',
          left: centroX - tamanoDelante.value / 0.3 + 'px',
        }
      } else if (isMediumScreen.value) {
        // PARA PANTALLAS 950px - 1299px - Ajuste medio
        return {
          top: centroY + tamanoDelante.value / 1.5 + 'px',
          left: centroX - tamanoDelante.value / 0.4 + 'px',
        }
      } else if (isTabletScreen.value) {
        // PARA PANTALLAS 768px - 949px - Ajuste tablet
        return {
          top: centroY + tamanoDelante.value / 1.3 + 'px',
          left: centroX - tamanoDelante.value / 0.5 + 'px',
        }
      } else if (isSmallScreen.value) {
        // PARA PANTALLAS 600px - 767px - NUEVO BREAKPOINT
        return {
          top: centroY + tamanoDelante.value / 1.2 + 'px',
          left: centroX - tamanoDelante.value / 0.6 + 'px',
        }
      } else {
        // PARA PANTALLAS < 600px - Ajuste móvil
        return {
          top: centroY + tamanoDelante.value / 1.0 + 'px',
          left: centroX - tamanoDelante.value / 0.8 + 'px',
        }
      }
    })

    // Tamaños dinámicos según breakpoint
    const sizesMedio = computed(() => {
      if (isLargeScreen.value) return { width: 300, height: 200 }
      if (isMediumScreen.value) return { width: 250, height: 170 }
      if (isTabletScreen.value) return { width: 220, height: 150 }
      if (isSmallScreen.value) return { width: 150, height: 100 } // NUEVO
      return { width: 120, height: 100 }
    })

    const sizesDelante = computed(() => {
      if (isLargeScreen.value) return 200
      if (isMediumScreen.value) return 170
      if (isTabletScreen.value) return 150
      if (isSmallScreen.value) return 130 // NUEVO
      return 110
    })

    // Velocidades computadas con ajuste para breakpoints
    const velocidades = computed(() => {
      const baseMultiplier = 3

      if (isLargeScreen.value) {
        return {
          fondo: 0.05 * baseMultiplier,
          medio: 0.1 * baseMultiplier,
          delante: 0.15 * baseMultiplier,
          texto: 0.02 * baseMultiplier,
        }
      } else if (isMediumScreen.value) {
        // Velocidad reducida para pantallas medianas
        return {
          fondo: 0.05 * baseMultiplier * 0.8,
          medio: 0.1 * baseMultiplier * 0.8,
          delante: 0.15 * baseMultiplier * 0.8,
          texto: 0.02 * baseMultiplier * 0.8,
        }
      } else if (isTabletScreen.value) {
        // Velocidad más reducida para tablets
        return {
          fondo: 0.05 * baseMultiplier * 0.7,
          medio: 0.1 * baseMultiplier * 0.7,
          delante: 0.15 * baseMultiplier * 0.7,
          texto: 0.02 * baseMultiplier * 0.7,
        }
      } else if (isSmallScreen.value) {
        // Velocidad para pantallas pequeñas (600px-767px)
        return {
          fondo: 0.05 * baseMultiplier * 0.6,
          medio: 0.1 * baseMultiplier * 0.6,
          delante: 0.15 * baseMultiplier * 0.6,
          texto: 0.02 * baseMultiplier * 0.6,
        }
      } else {
        // Velocidad mínima para móviles
        return {
          fondo: 0.05 * baseMultiplier * 0.5,
          medio: 0.1 * baseMultiplier * 0.5,
          delante: 0.15 * baseMultiplier * 0.5,
          texto: 0.02 * baseMultiplier * 0.5,
        }
      }
    })

    // Actualizar viewport
    const updateViewport = () => {
      viewportWidth.value = window.innerWidth
      actualizarPosicionContenido()

      // Actualizar tamaños dinámicos
      tamanoMedio.value = sizesMedio.value.width
      tamanoMedioHeight.value = sizesMedio.value.height
      tamanoDelante.value = sizesDelante.value
    }

    // Actualizar posición del contenido cuando se redimensiona la ventana
    const actualizarPosicionContenido = () => {
      if (contenidoEl.value) {
        const rect = contenidoEl.value.getBoundingClientRect()
        posiciones.contenido.x = rect.left + rect.width / 2
        posiciones.contenido.y = rect.top + rect.height / 2
      } else {
        // Fallback: centro de la pantalla
        posiciones.contenido.x = window.innerWidth / 2
        posiciones.contenido.y = window.innerHeight / 2
      }
    }

    // Función principal del parallax
    const moverParallax = (e) => {
      const mouseX = e.clientX / window.innerWidth
      const mouseY = e.clientY / window.innerHeight

      // Actualizar posición del contenido
      actualizarPosicionContenido()

      // Calcular movimientos con velocidades ajustadas
      posiciones.fondo.x = (mouseX - 0.5) * velocidades.value.fondo * 100
      posiciones.fondo.y = (mouseY - 0.5) * velocidades.value.fondo * 100

      posiciones.medio.x = (mouseX - 0.5) * velocidades.value.medio * 100
      posiciones.medio.y = (mouseY - 0.5) * velocidades.value.medio * 100

      posiciones.delante.x = (mouseX - 0.5) * velocidades.value.delante * 100
      posiciones.delante.y = (mouseY - 0.5) * velocidades.value.delante * 100

      posiciones.texto.x = (mouseX - 0.5) * velocidades.value.texto * 100
      posiciones.texto.y = (mouseY - 0.5) * velocidades.value.texto * 100
    }

    // Soporte para touch en móviles
    const moverParallaxTouch = (e) => {
      if (e.touches.length > 0) {
        const touch = e.touches[0]
        const fakeEvent = {
          clientX: touch.clientX,
          clientY: touch.clientY,
        }
        moverParallax(fakeEvent)
      }
    }

    // Listeners para redimensionamiento
    onMounted(() => {
      window.addEventListener('resize', updateViewport)
      window.addEventListener('load', updateViewport)
      updateViewport()
    })

    onUnmounted(() => {
      window.oveEventListener('resize', updateViewport)
      window.oveEventListener('load', updateViewport)
    })

    return {
      posiciones,
      tamanoMedio,
      tamanoMedioHeight,
      tamanoDelante,
      posicionMedio,
      posicionDelante,
      currentBreakpoint,
      viewportWidth,
      moverParallax,
      moverParallaxTouch,
    }
  },

  data() {
    return {
      backgroundImage:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuDawGFmSzbQaGSABw9_OZ5YztQ5Z_3bu_iogwqMU0jwNyY53jXrt_5-6LegUndPcflGJZjCb6CuxlC_xbP5MmRIkrIVWFO-gOk1pNnjUObCp9ikSn0LFxPW0Bb_htVvcOtNNzk7g-xyqmEAUrnc5dE0qLYskgolK-H4gIR3NK5jxfhv1O_CnhKDr1Fkeb4xkYVHxFp09nPAkbHAaAQyqicf1K1aQx_pxARAsZvqXAEJ9cLZs1AL4kQ2uMCCj9FpyY4QzgyWS4vh6T4',
    }
  },

  computed: {
    heroStyle() {
      return {
        backgroundImage: `linear-gradient(rgba(16, 28, 34, 0.1) 0%, rgba(16, 28, 34, 0.6) 100%), url("${this.backgroundImage}")`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }
    },
  },
}
</script>

<style scoped>
.app-container {
  width: 100%;
  min-height: 100vh;
  @media (max-width: 1000px) {
    min-height: 45vh;
  }
}

.parallax-container {
  position: relative;
  width: 100%;
  min-height: 100vh;
  overflow: hidden;

  @media (max-width: 1000px) {
    height: 65vh;
  }

  @media (max-width: 650px) {
    height: 45vh;
  }
}

.capa {
  position: absolute;
  background-position: center;
  background-size: cover;
  transition: transform 0.3s ease-out;
}

.fondo {
  background-image: url('@/assets/images/home/home_bg_image.png');
  width: 100%;
  height: 120%;
}

.medio {
  background-image: url('@/assets/images/home/bronw_dragon_home_image.png');
  background-size: cover;
  @media (max-width: 1000px) {
    top: 63.5px;
  }
}

.delante {
  background-image: url('@/assets/images/home/red_dragon_home_image.png');
  background-size: cover;
  @media (max-width: 1000px) {
    top: 103.5px;
  }
}
</style>
