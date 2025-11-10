<template>
  <div id="app">
    <!-- Sección parallax con background fijo y altura para scroll -->
    <section class="parallax-section" ref="parallaxSection">
      <header :class="{ hidden: scrollPhase >= 1 }">
        <h2 class="about_h1">Bienvenidos a Potter Cloud.</h2>
        <p class="about_p">
          Una pagina creada para sentir la experiencia y crear servicios en la nube
        </p>
        <div class="scroll-indicator">
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
            active: scrollPhase >= 1,
            zoom: scrollPhase >= 2,
            exit: scrollPhase >= 3,
          }"
        />
      </div>
      <div class="image-container">
        <img
          src="../../assets/images/parallax_three_left.png"
          alt="Tercera imagen"
          class="image image-3"
          :class="{
            active: scrollPhase >= 1,
            exit: scrollPhase >= 2,
          }"
        />
        <img
          src="../../assets/images/parallax_three_right.png"
          alt="Cuarta imagen"
          class="image image-4"
          :class="{
            active: scrollPhase >= 1,
            exit: scrollPhase >= 2,
          }"
        />
      </div>
      <div class="image-container">
        <img
          src="../../assets/images/parallax_final.png"
          alt="Quinta imagen"
          class="image image-5"
          :class="{
            active: scrollPhase >= 3,
          }"
        />
        <div class="final-text" :class="{ active: scrollPhase >= 1, hidden: scrollPhase >= 2 }">
          <p class="about_p">Potter cloud</p>
        </div>
        <div class="final-text" :class="{ active: scrollPhase >= 2, hidden: scrollPhase >= 3 }">
          <h2 class="about_h1">Texto al hacer zoom</h2>
          <p class="about_p">Este es el texto</p>
        </div>
        <div class="final-text" :class="{ active: scrollPhase >= 3 }">
          <h2 class="about_h1">Texto Final</h2>
          <p class="about_p">Este es el texto que aparece con la imagen final</p>
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
    const scrollPhase = ref(0)
    const scrollProgress = ref(0)

    const handleScroll = () => {
      const scrollY = window.scrollY
      const windowHeight = window.innerHeight
      const documentHeight = document.documentElement.scrollHeight - windowHeight

      // Calculamos el progreso total del scroll (0% a 100%)
      scrollProgress.value = (scrollY / documentHeight) * 100

      // Calculamos el progreso específico para las fases del parallax
      const parallaxProgress = scrollY / (windowHeight * 3)

      // Ajustamos las fases para que se distribuyan mejor
      if (parallaxProgress > 0.8) {
        scrollPhase.value = 4
      } else if (parallaxProgress > 0.6) {
        scrollPhase.value = 3
      } else if (parallaxProgress > 0.4) {
        scrollPhase.value = 2
      } else if (parallaxProgress > 0.1) {
        scrollPhase.value = 1
      } else {
        scrollPhase.value = 0
      }

      console.log('Fase:', scrollPhase.value, 'Progreso:', Math.round(parallaxProgress * 100) + '%')
    }

    onMounted(() => {
      window.addEventListener('scroll', handleScroll)
      handleScroll()
    })

    onUnmounted(() => {
      window.removeEventListener('scroll', handleScroll)
    })

    return {
      parallaxSection,
      scrollPhase,
      scrollProgress,
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
  color: #2c3e50;
  z-index: 10;
  position: relative;
  transition: opacity 0.8s ease-out;
}

.about_p {
  font-size: 1.2rem;
  max-width: 600px;
  margin-bottom: 2rem;
  z-index: 10;
  position: relative;
}

.scroll-indicator {
  position: fixed;
  bottom: 30px;
  left: 50%;
  transform: translateX(-50%);
  animation: bounce 2s infinite;
  z-index: 10;
  transition: opacity 2s ease-out;
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
  height: 350vh; /* Altura suficiente para hacer scroll */
  background-image: url('../../assets/images/dashboard_bg.png');
  background-size: cover;
  background-position: center;
  background-attachment: fixed; /* Efecto parallax en el background */
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
  /* Eliminar bordes transparentes */
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
  /* Ajustar para eliminar bordes */
  width: auto;
  height: 80vh;
  max-width: 30%;
}

.image-4 {
  z-index: 3;
  transform: translateX(100%) scale(0.8);
  opacity: 0;
  /* Ajustar para eliminar bordes */
  width: auto;
  height: 80vh;
  max-width: 30%;
}

.image-5 {
  z-index: 4;
  transform: scale(0.5) translateY(50px);
  opacity: 0;
  filter: blur(10px);
  /* Ajustar para eliminar bordes */
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
</style>
