<template>
  <div id="app">
    <!-- Sección parallax con background fijo y altura para scroll -->
    <section class="parallax-section" ref="parallaxSection">
      <header :class="{ hidden: currentPhase >= 1 }">
        <h2 class="about_h1">Bienvenidos a Potter Cloud.</h2>
        <p class="about_p">
          Una plataforma inspirada en la magia, creada para llevar tus proyectos a la nube. Explora
          un entorno donde la tecnología y la imaginación se fusionan para crear experiencias
          únicas.
        </p>
        <div class="scroll-indicator" :class="{ hidden: currentPhase >= 1 }">
          <svg
            width="30"
            height="30"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12 5V19M12 19L5 12M12 19L19 12"
              stroke="#2c3e50"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </div>
      </header>
      <!-- Imágenes con posición fixed que se animan sobre el background -->
      <div class="image-container">
        <img
          src="../../assets/images/parallax_clastle_bg.png"
          alt="Segunda imagen"
          class="image image-2"
          :class="{
            active: currentPhase >= 1,
            zoom: currentPhase >= 2,
            exit: currentPhase >= 3,
          }"
        />
      </div>
      <div class="image-container">
        <img
          src="../../assets/images/parallax_three_left.png"
          alt="Tercera imagen"
          class="image image-3"
          :class="{
            active: currentPhase >= 1,
            exit: currentPhase >= 2,
          }"
        />
        <img
          src="../../assets/images/parallax_three_right.png"
          alt="Cuarta imagen"
          class="image image-4"
          :class="{
            active: currentPhase >= 1,
            exit: currentPhase >= 2,
          }"
        />
      </div>
      <div class="image-container">
        <img
          src="../../assets/images/parallax_final.png"
          alt="Quinta imagen"
          class="image image-5"
          :class="{
            active: currentPhase >= 3,
          }"
        />
        <div class="final-text" :class="{ active: currentPhase === 1, hidden: currentPhase >= 2 }">
          <p class="about_p">
            En Potter Cloud creemos que cada idea tiene el poder de transformar el mundo. Da el
            primer paso hacia tu próxima creación y descubre la magia de construir en la nube.
          </p>
        </div>
        <div class="final-text" :class="{ active: currentPhase === 2, hidden: currentPhase >= 3 }">
          <p class="about_p">
            Potter Cloud te permite desplegar, monitorear y administrar tus aplicaciones con la
            facilidad de un hechizo. Desde proyectos personales hasta soluciones empresariales,
            nuestra nube está lista para recibirte.
          </p>
        </div>
        <div class="final-text" :class="{ active: currentPhase >= 3 }">
          <h2 class="about_h1 text-yellow">Crea y lanza tus servicios en la nube</h2>
          <div>
            <p class="about_p">
              Maneja múltiples proyectos! en Potter Cloud encontrarás un plan que se adapta a ti.
              Descubre nuestras opciones gratuitas y premium para llevar tu magia al siguiente
              nivel.
            </p>
          </div>
          <button class="btn-primary about-btn" @click="$router.push('/register')">
            Registrarse
          </button>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { ref, onMounted, onUnmounted } from 'vue'

export default {
  name: 'ParallaxApp',
  setup() {
    const parallaxSection = ref(null)
    const currentPhase = ref(0)
    const isAnimating = ref(false)
    const animationTimeout = ref(null)
    const lastScrollTime = ref(0)

    // Configuración
    const TOTAL_PHASES = 4
    const ANIMATION_DURATION = 1200 // ms para completar la animación
    const MIN_SCROLL_INTERVAL = 500 // ms mínimo entre scrolls
    const SCROLL_THRESHOLD = 50 // delta mínimo para considerar scroll

    const handleWheel = (event) => {
      const now = Date.now()

      // Prevenir scroll demasiado rápido
      if (now - lastScrollTime.value < MIN_SCROLL_INTERVAL) {
        event.preventDefault()
        return
      }

      // Prevenir animación durante otra animación
      if (isAnimating.value) {
        event.preventDefault()
        return
      }

      const delta = Math.sign(event.deltaY)

      // Solo procesar si el scroll es significativo
      if (Math.abs(event.deltaY) < SCROLL_THRESHOLD) {
        return
      }

      if (delta > 0) {
        // Scroll hacia abajo - siguiente fase
        nextPhase()
      } else if (delta < 0) {
        // Scroll hacia arriba - fase anterior
        prevPhase()
      }

      lastScrollTime.value = now
      event.preventDefault()
    }

    const handleKeydown = (event) => {
      if (isAnimating.value) {
        event.preventDefault()
        return
      }

      if (event.key === 'ArrowDown' || event.key === ' ') {
        event.preventDefault()
        nextPhase()
      } else if (event.key === 'ArrowUp') {
        event.preventDefault()
        prevPhase()
      }
    }

    const nextPhase = () => {
      if (currentPhase.value < TOTAL_PHASES - 1 && !isAnimating.value) {
        changePhase(currentPhase.value + 1)
      }
    }

    const prevPhase = () => {
      if (currentPhase.value > 0 && !isAnimating.value) {
        changePhase(currentPhase.value - 1)
      }
    }

    const changePhase = (newPhase) => {
      isAnimating.value = true
      const previousPhase = currentPhase.value
      currentPhase.value = newPhase

      // Scroll suave a la posición correspondiente
      const targetScroll = newPhase * window.innerHeight

      window.scrollTo({
        top: targetScroll,
        behavior: 'smooth',
      })

      // Calcular duración basada en la distancia
      const phaseDistance = Math.abs(newPhase - previousPhase)
      const animationTime = ANIMATION_DURATION * (1 + phaseDistance * 0.2)

      // Limpiar timeout anterior
      clearTimeout(animationTimeout.value)

      // Permitir nueva animación después del tiempo calculado
      animationTimeout.value = setTimeout(() => {
        isAnimating.value = false
      }, animationTime)
    }

    // Touch events para móviles
    let touchStartY = 0
    let touchStartTime = 0

    const handleTouchStart = (event) => {
      if (isAnimating.value) return

      touchStartY = event.touches[0].clientY
      touchStartTime = Date.now()
    }

    const handleTouchEnd = (event) => {
      if (isAnimating.value) return

      const touchEndY = event.changedTouches[0].clientY
      const touchEndTime = Date.now()
      const deltaY = touchStartY - touchEndY
      const deltaTime = touchEndTime - touchStartTime

      // Umbrales para considerar un swipe válido
      const minSwipeDistance = 50
      const maxSwipeTime = 500

      if (Math.abs(deltaY) > minSwipeDistance && deltaTime < maxSwipeTime) {
        if (deltaY > 0) {
          // Swipe hacia arriba - siguiente fase
          nextPhase()
        } else {
          // Swipe hacia abajo - fase anterior
          prevPhase()
        }
      }
    }

    // También manejar el scroll nativo como fallback
    const handleScroll = () => {
      if (isAnimating.value) return

      const scrollY = window.scrollY
      const windowHeight = window.innerHeight
      const expectedPhase = Math.round(scrollY / windowHeight)

      // Solo corregir si hay una diferencia significativa
      if (Math.abs(expectedPhase - currentPhase.value) >= 1) {
        changePhase(expectedPhase)
      }
    }

    onMounted(() => {
      window.addEventListener('wheel', handleWheel, { passive: false })
      window.addEventListener('keydown', handleKeydown)
      window.addEventListener('touchstart', handleTouchStart, { passive: true })
      window.addEventListener('touchend', handleTouchEnd, { passive: true })
      window.addEventListener('scroll', handleScroll, { passive: true })

      // Asegurar que empezamos en la fase 0
      window.scrollTo({ top: 0, behavior: 'instant' })
    })

    onUnmounted(() => {
      window.removeEventListener('wheel', handleWheel)
      window.removeEventListener('keydown', handleKeydown)
      window.removeEventListener('touchstart', handleTouchStart)
      window.removeEventListener('touchend', handleTouchEnd)
      window.removeEventListener('scroll', handleScroll)
      clearTimeout(animationTimeout.value)
    })

    return {
      parallaxSection,
      currentPhase,
    }
  },
}
</script>

<style scoped>
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

header {
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  background-color: transparent;
  position: relative;
  overflow: hidden;
  transition:
    opacity 0.8s ease-out,
    transform 0.8s ease-out;
}

header.hidden {
  opacity: 0;
  transform: translateY(-20px);
  pointer-events: none;
}

.about_h1 {
  font-size: 3.5rem;
  margin-bottom: 1rem;
  color: #daa520;
  z-index: 10;
  position: relative;
  transition: opacity 0.8s ease-out;
}

.about_p {
  color: white  ;
  font-size: 1.2rem;
  max-width: 600px;
  margin-bottom: 2rem;
  z-index: 10;
  position: relative;
}

.about-btn {
  display: inline-block;
  padding: 0.75rem 1.5rem;
  border: 2px solid #ffd700;
  color: #ffd700;
  background-color: transparent;
  border-radius: 8px;
  font-family: 'Cinzel', serif;
  font-weight: 600;
  font-size: 1rem;
  text-transform: uppercase;
  letter-spacing: 1px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: all 0.3s ease;
}

.about-btn::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, #ffd700, transparent);
  transition: all 0.5s ease;
}

.about-btn:hover::before {
  left: 100%;
}

.about-btn {
  position: relative;
  z-index: 1000;
  pointer-events: auto;
}

.scroll-indicator {
  position: fixed;
  bottom: 30px;
  left: 50%;
  transform: translateX(-50%);
  animation: bounce 2s infinite;
  z-index: 10;
  transition: opacity 0.8s ease-out;
}

.scroll-indicator.hidden {
  opacity: 0;
  pointer-events: none;
}

@keyframes bounce {
  0%,
  20%,
  50%,
  80%,
  100% {
    transform: translateY(0) translateX(-50%);
  }
  40% {
    transform: translateY(-10px) translateX(-50%);
  }
  60% {
    transform: translateY(-5px) translateX(-50%);
  }
}

/* Sección parallax con background fijo y altura para scroll */
.parallax-section {
  position: relative;
  width: 100%;
  height: 400vh; /* 4 fases de 100vh cada una */
  background-image: url('../../assets/images/dashboard_bg.png');
  background-size: cover;
  background-position: center;
  background-attachment: fixed;
  z-index: 1;
}

/* Imágenes con posición fixed que se animan sobre el background */
.image-container {
  position: fixed;
  top: 0;
  left: -28vw;
  width: 151%;
  height: 100vh;
  display: flex;
  align-items: center;
  pointer-events: none;
  justify-content: space-around;
  z-index: 2;
}

/* Contenedor específico para las imágenes 3 y 4 */
.image-container:nth-child(2) {
  justify-content: space-between;
  padding: 0 10%;
}

.image {
  transition: all 1.5s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  pointer-events: none;
  image-rendering: -webkit-optimize-contrast;
  image-rendering: crisp-edges;
  backface-visibility: hidden;
  transform: translateZ(0);
}

.image-2 {
  z-index: 2;
  position: relative;
  transform: translateY(150%);
  left: 0;
  width: 100%;
  height: 100vh;
  object-fit: cover;
  object-position: top;
}

.image-3 {
  z-index: 3;
  transform: translateX(-100%) scale(0.8);
  opacity: 0;
  width: auto;
  height: 80vh;
  max-width: 30%;
}

.image-4 {
  z-index: 3;
  transform: translateX(100%) scale(0.8);
  opacity: 0;
  width: auto;
  height: 80vh;
  max-width: 30%;
}

.image-5 {
  z-index: 4;
  transform: scale(0.5) translateY(50px);
  opacity: 0;
  filter: blur(10px);
  width: 100%;
  height: 100vh;
  object-fit: fill;
}

.final-text {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%) scale(0.8);
  text-align: center;
  color: white;
  z-index: 5;
  opacity: 0;
  transition: all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

.final-text h2 {
  font-size: 3rem;
  margin-bottom: 1rem;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
  transform: translateY(20px);
  transition: transform 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

.final-text p {
  font-size: 1.5rem;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
  color: white;
  transform: translateY(20px);
  transition: transform 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

/* Estados de las animaciones - ENTRADA */
.image-2.active {
  transform: translateY(0);
  opacity: 1;
}

.image-3.active {
  height: 105%;
  transform: translateX(0) scale(1);
  opacity: 1;
}

.image-4.active {
  height: 105%;
  transform: translateX(0) scale(1);
  opacity: 1;
}

.image-2.zoom {
  transform: scale(1.2) translateY(0);
  opacity: 1;
  object-position: bottom;
}

/* Estados de las animaciones - SALIDA */
.image-3.exit {
  transform: translateX(-150%) scale(0.6) rotate(-15deg);
  opacity: 0;
}

.image-4.exit {
  transform: translateX(150%) scale(0.6) rotate(15deg);
  opacity: 0;
}

.image-2.exit {
  transform: translateY(-150%) scale(1.1) rotate(5deg);
  opacity: 0;
}

.image-5.active {
  transform: scale(1) translateY(0);
  opacity: 1;
  filter: blur(0);
}

.final-text.active {
  opacity: 1;
  transform: translate(-50%, -50%) scale(1);
}

.final-text.active h2,
.final-text.active p {
  transform: translateY(0);
}

.final-text.hidden {
  opacity: 0;
  pointer-events: none;
}

/* Correcciones adicionales para bordes transparentes */
.image::before {
  content: '';
  position: absolute;
  top: -1px;
  left: -1px;
  right: -1px;
  bottom: -1px;
  background: inherit;
  z-index: -1;
  filter: blur(0);
}

/* Asegurar que no haya espacios alrededor de las imágenes */
.image-container {
  overflow: hidden;
}

.image {
  margin: 0;
  padding: 0;
  border: none;
  outline: none;
}

/* Mejorar la experiencia de scroll */
html {
  scroll-behavior: smooth;
}

/* Deshabilitar scroll nativo cuando sea posible */
body {
  overflow-y: scroll;
}

/* Indicador visual de que está animando */
.parallax-section.animating * {
  pointer-events: none;
}
</style>
