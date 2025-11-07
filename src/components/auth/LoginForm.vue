<template>
  <div>
    <!-- Video Loading integrado -->
    <div
      v-if="showVideoLoading"
      class="video-loading"
      :class="{ 'fade-out': isFading }"
      @click="skipVideo"
    >
      <div v-if="videoError" class="video-error">
        <div class="error-icon">📹</div>
        <div class="error-text">No se pudo cargar el video</div>
        <button @click="redirectToDashboard" class="continue-btn">Continuar al Dashboard</button>
      </div>

      <video
        v-else
        ref="loadingVideoEl"
        class="loading-video"
        preload="auto"
        @loadeddata="handleVideoLoaded"
        @ended="handleVideoEnd"
        @error="handleVideoError"
        playsinline
        webkit-playsinline
        controlslist="nodownload"
      >
        <source :src="loadingVideoSrc" type="video/mp4" />
        <source :src="loadingVideoSrcWebm" type="video/webm" />
        Tu navegador no soporta el elemento video.
      </video>

      <!-- Controles de audio personalizados -->
      <div class="audio-controls" v-if="!videoError && !videoLoading">
        <button @click.stop="toggleMute" class="audio-btn">
          <!-- Mute/Unmute SVG con transición -->
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" class="audio-icon">
            <!-- Altavoz base -->
            <path d="M3 9V15H7L12 20V4L7 9H3Z" fill="currentColor" class="speaker-base" />

            <!-- Ondas de sonido para unmute -->
            <path
              v-if="!isMuted"
              d="M16 9C16.5 9.5 17 10.5 17 12C17 13.5 16.5 14.5 16 15"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              class="sound-wave-1"
            />
            <path
              v-if="!isMuted"
              d="M19 6C20.5 7.5 21 10 21 12C21 14 20.5 16.5 19 18"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              class="sound-wave-2"
            />

            <!-- X para mute -->
            <path
              v-if="isMuted"
              d="M16 9L21 14M21 9L16 14"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              class="mute-x"
            />
          </svg>
        </button>

        <button @click.stop="togglePlay" class="audio-btn">
          <!-- Play/Pause SVG con transición -->
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" class="audio-icon">
            <!-- Play icon -->
            <path v-if="!isPlaying" d="M8 5V19L19 12L8 5Z" fill="currentColor" class="play-icon" />

            <!-- Pause icon -->
            <rect
              v-if="isPlaying"
              x="6"
              y="4"
              width="4"
              height="16"
              fill="currentColor"
              class="pause-bar-1"
            />
            <rect
              v-if="isPlaying"
              x="14"
              y="4"
              width="4"
              height="16"
              fill="currentColor"
              class="pause-bar-2"
            />
          </svg>
        </button>
      </div>

      <div class="loading-content" :class="{ 'error-mode': videoError }">
        <div class="loading-text">{{ loadingMessage }}</div>
        <div class="skip-hint">(Click o presiona Escape para saltar)</div>

        <!-- Spinner mientras carga el video -->
        <div v-if="videoLoading" class="video-loading-spinner">
          <div class="spinner"></div>
          <div>Cargando video...</div>
        </div>
      </div>
    </div>

    <!-- Contenedor Principal del Login -->
    <div
      class="login-container min-h-screen flex items-center justify-center p-4 font-display bg-black dark:bg-background-dark font-display"
    >
      <div class="w-full max-w-md">
        <!-- Logo y título -->
        <div class="text-center mb-12">
          <!-- Logo -->
          <div class="flex justify-center mb-8">
            <div class="symbol">
              <div class="deathly"></div>
              <div class="hallows"></div>
            </div>
          </div>

          <!-- Título con elementos decorativos -->
          <div class="flex items-center justify-center gap-3 mb-4">
            <img src="@/assets/images/diamonds.svg" alt="" class="text-gray-500 w-5 h-5" />
            <h1 class="text-2xl text-white font-serif tracking-wide">Iniciar sesión</h1>
            <img src="@/assets/images/diamonds.svg" alt="" class="text-gray-500 w-5 h-5" />
          </div>
        </div>

        <!-- Formulario de login -->
        <form @submit.prevent="handleLogin" class="space-y-8">
          <!-- Mensaje de error -->
          <div
            v-if="error"
            class="bg-red-500/20 border border-red-500 text-white px-4 py-3 rounded text-sm"
          >
            ❌ {{ error }}
          </div>

          <!-- Mensaje de éxito -->
          <div
            v-if="success"
            class="bg-green-500/20 border border-green-500 text-white px-4 py-3 rounded text-sm"
          >
            ✅ {{ success }}
          </div>

          <!-- Campo Email -->
          <div class="space-y-3">
            <label class="block text-white text-sm font-medium tracking-wider uppercase">
              DIRECCIÓN DE CORREO ELECTRÓNICO
            </label>
            <input
              v-model="email"
              type="email"
              required
              placeholder="Ingresa tu correo electrónico"
              class="w-full bg-transparent border border-gray-600 text-white px-4 py-4 rounded-none focus:outline-none focus:border-gray-400 transition-colors placeholder-gray-500"
              :disabled="loading"
            />
          </div>

          <!-- Campo Contraseña -->
          <div class="space-y-3">
            <label class="block text-white text-sm font-medium tracking-wider uppercase">
              CONTRASEÑA
            </label>
            <div class="relative">
              <input
                v-model="password"
                :type="showPassword ? 'text' : 'password'"
                required
                placeholder="Ingresa tu contraseña"
                class="w-full bg-transparent border border-gray-600 text-white px-4 py-4 pr-12 rounded-none focus:outline-none focus:border-gray-400 transition-colors placeholder-gray-500"
                :disabled="loading"
              />
              <button
                type="button"
                @click="showPassword = !showPassword"
                class="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:text-gray-300 transition-colors"
                :disabled="loading"
              >
                <svg width="20px" height="20px" viewBox="0 0 32 32">
                  <path
                    fill="#ffffff"
                    d="M10.25,2.97h1.5V0h-1.5V2.97Zm6.61,2.11l1.06,1.06,2.1-2.1-1.06-1.06-2.1,2.1Zm2.1,15.93l-2.1-2.1,1.06-1.06,2.1,2.1-1.06,1.06Zm-8.71,2.98h1.5v-2.97h-1.5v2.97ZM1.98,4.05l2.1,2.1,1.06-1.06L3.04,2.98l-1.06,1.06Zm1.06,16.97l-1.06-1.06,2.1-2.1,1.06,1.06-2.1,2.1Zm7.96-5.27c-.28,0-.54-.11-.74-.31l-2.7-2.7c-.2-.2-.31-.46-.31-.74s.11-.54,.31-.74l2.7-2.7c.39-.39,1.09-.4,1.48,0l2.7,2.7c.2,.2,.31,.46,.31,.74s-.11,.54-.31,.74l-2.71,2.71c-.19,.2-.46,.31-.74,.31Zm0-1.69l-2.06-2.06,2.06-2.06,2.06,2.06-2.06,2.06ZM.43,12.49c.2,.23,4.95,5.59,10.56,5.59s10.37-5.36,10.56-5.59l.43-.49-.43-.49c-.2-.23-4.96-5.59-10.56-5.59S.63,11.28,.43,11.51l-.43,.49,.43,.49Zm10.56,4.09c-3.99,0-7.69-3.31-8.97-4.58,1.28-1.28,4.96-4.58,8.97-4.58s7.69,3.31,8.96,4.58c-1.27,1.28-4.96,4.58-8.96,4.58Z"
                  ></path>
                </svg>
              </button>
            </div>
          </div>

          <!-- Enlace de contraseña olvidada -->
          <div class="text-center">
            <a
              @click="$router.push('/reset')"
              class="text-white text-base underline hover:text-gray-300 transition-colors"
            >
              ¿Has olvidado tu contraseña?
            </a>
          </div>

          <!-- Botón de enviar -->
          <button
            type="submit"
            :disabled="loading"
            class="w-full bg-[#5b5fef] text-white font-bold text-base tracking-wider py-4 hover:bg-[#4a4ed8] transition-colors disabled:opacity-50 disabled:cursor-not-allowed uppercase flex items-center justify-center gap-2"
          >
            <span
              v-if="loading"
              class="animate-spin rounded-full h-4 w-4 border-b-2 border-white"
            ></span>
            {{ loading ? 'INICIANDO SESIÓN...' : 'INICIAR SESIÓN' }}
          </button>
        </form>

        <!-- Separador decorativo -->
        <div class="mt-12 mb-8">
          <div class="flex items-center justify-center gap-4">
            <div class="flex-1 h-px bg-gray-700"></div>
            <div class="w-2 h-2 bg-gray-600 rounded-full"></div>
            <div class="flex-1 h-px bg-gray-700"></div>
          </div>
        </div>

        <!-- Enlace de registro -->
        <div class="text-center">
          <p class="text-gray-400 text-base mb-4">¿No tienes una cuenta?</p>
          <button
            @click="$router.push('/register')"
            class="w-full bg-transparent border border-white rounded-full py-3 px-11 text-white text-sm font-black uppercase tracking-[1.63px] leading-[14px] text-center transition-all duration-100 ease-in hover:bg-white hover:text-black focus:outline-none relative box-border"
          >
            Regístrate aquí
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, watch, nextTick } from 'vue'
import { useRouter } from 'vue-router'
import api from '@/services/api'

const router = useRouter()

// Estados del formulario
const email = ref('')
const password = ref('')
const showPassword = ref(false)
const loading = ref(false)
const error = ref('')
const success = ref('')

// Estados del video loading
const showVideoLoading = ref(false)
const isFading = ref(false)
const videoLoading = ref(false)
const videoError = ref(false)
const loadingVideoEl = ref(null)

// Nuevos estados para audio
const isMuted = ref(false)
const isPlaying = ref(false)

// Ruta del video
const loadingVideoSrc = ref(
  new URL('@/assets/videos/Journey_to_Hogwarts.mp4', import.meta.url).href,
)

const loadingVideoSrcWebm = ref('')
const loadingMessage = ref('Preparando tu experiencia...')

const handleLogin = async () => {
  loading.value = true
  error.value = ''
  success.value = ''

  try {
    const response = await api.auth.login({
      email: email.value,
      password: password.value,
    })

    if (response.data?.token) {
      localStorage.setItem('authToken', response.data.token)
      localStorage.setItem('user', JSON.stringify(response.data))
      localStorage.setItem('userEmail', email.value)

      success.value = '¡Login exitoso! Redirigiendo...'

      setTimeout(() => {
        showVideoLoading.value = true
        videoLoading.value = true
      }, 1000)
    } else {
      throw new Error('No se recibió token de autenticación')
    }
  } catch (err) {
    error.value = err.response?.data?.message || err.message || 'Error al iniciar sesión'
  } finally {
    loading.value = false
  }
}

// Funciones del video loading
const handleVideoLoaded = () => {
  console.log('Video cargado correctamente')
  videoLoading.value = false

  // Configurar volumen inicial
  if (loadingVideoEl.value) {
    loadingVideoEl.value.volume = 0.7 // Volumen al 70%
  }

  playVideo()
}

const playVideo = async () => {
  try {
    if (loadingVideoEl.value) {
      console.log('Intentando reproducir video con audio...')

      // Estrategia para autoplay con audio
      const playPromise = loadingVideoEl.value.play()

      if (playPromise !== undefined) {
        await playPromise
        console.log('Video reproducido exitosamente con audio')
        isPlaying.value = true
      }
    }
  } catch (error) {
    console.error('Error reproduciendo video:', error)

    // Si falla por políticas de autoplay, intentar sin audio primero
    if (error.name === 'NotAllowedError') {
      console.log('Autoplay bloqueado, intentando con muted...')
      if (loadingVideoEl.value) {
        loadingVideoEl.value.muted = true
        await loadingVideoEl.value.play()
        isPlaying.value = true
        isMuted.value = true

        // Mostrar mensaje para activar audio
        loadingMessage.value = 'Haz click en el botón de audio para activar el sonido'
      }
    } else {
      videoError.value = true
      videoLoading.value = false
    }
  }
}

const toggleMute = () => {
  if (loadingVideoEl.value) {
    loadingVideoEl.value.muted = !loadingVideoEl.value.muted
    isMuted.value = loadingVideoEl.value.muted

    // Si se desactiva el mute y el volumen es 0, subirlo
    if (!isMuted.value && loadingVideoEl.value.volume === 0) {
      loadingVideoEl.value.volume = 0.7
    }
  }
}

const togglePlay = () => {
  if (loadingVideoEl.value) {
    if (isPlaying.value) {
      loadingVideoEl.value.pause()
    } else {
      loadingVideoEl.value.play()
    }
    isPlaying.value = !isPlaying.value
  }
}

const handleVideoEnd = () => {
  console.log('Video terminado')
  isPlaying.value = false
  fadeOutAndComplete()
}

const handleVideoError = (error) => {
  console.error('Error en video:', error)
  videoError.value = true
  videoLoading.value = false
}

const skipVideo = () => {
  if (loadingVideoEl.value) {
    loadingVideoEl.value.pause()
    isPlaying.value = false
  }
  isFading.value = true
  setTimeout(() => {
    redirectToDashboard()
  }, 500)
}

const fadeOutAndComplete = () => {
  isFading.value = true
  setTimeout(() => {
    redirectToDashboard()
  }, 500)
}

const handleKeydown = (event) => {
  if (event.key === 'Escape' && showVideoLoading.value) {
    skipVideo()
  }

  // Atajos de teclado para controles de audio
  if (showVideoLoading.value && !videoError.value) {
    if (event.key === 'm' || event.key === 'M') {
      toggleMute()
    }
    if (event.key === ' ' || event.key === 'Spacebar') {
      event.preventDefault()
      togglePlay()
    }
  }
}

// Reproducir video cuando se muestre
watch(showVideoLoading, (newVal) => {
  if (newVal) {
    nextTick(() => {
      window.addEventListener('keydown', handleKeydown)
    })
  }
})

// Redirigir al dashboard
const redirectToDashboard = () => {
  router.push('/dashboard')
}

// Cleanup
onUnmounted(() => {
  window.removeEventListener('keydown', handleKeydown)
})
</script>

<style scoped>
/* Estilos del video loading */
.video-loading {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: #000;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  cursor: pointer;
  transition: opacity 0.5s ease-in-out;
}

.video-loading.fade-out {
  opacity: 0;
}

.loading-video {
  width: 80%;
  max-width: 800px;
  height: auto;
  border-radius: 10px;
  box-shadow: 0 0 30px rgba(255, 255, 255, 0.3);
  background: #111;
}

/* Controles de audio */
.audio-controls {
  position: absolute;
  top: 20px;
  right: 20px;
  display: flex;
  gap: 10px;
  z-index: 10000;
}

.audio-btn {
  background: rgba(0, 0, 0, 0.7);
  border: 1px solid rgba(255, 255, 255, 0.3);
  color: white;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 1.2rem;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
}

.audio-btn:hover {
  background: rgba(0, 0, 0, 0.9);
  transform: scale(1.1);
}

.loading-content {
  text-align: center;
  margin-top: 20px;
}

.loading-content.error-mode {
  margin-top: 40px;
}

.loading-text {
  color: white;
  font-size: 1.5rem;
  font-family: 'Source Sans Pro', sans-serif;
  margin-bottom: 8px;
}

.skip-hint {
  color: rgba(255, 255, 255, 0.7);
  font-size: 0.9rem;
  font-family: 'Source Sans Pro', sans-serif;
}

/* Spinner para carga de video */
.video-loading-spinner {
  margin-top: 20px;
  color: white;
}

.spinner {
  border: 3px solid rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  border-top: 3px solid white;
  width: 30px;
  height: 30px;
  animation: spin 1s linear infinite;
  margin: 0 auto 10px;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

/* Estilos para error de video */
.video-error {
  text-align: center;
  color: white;
  padding: 40px;
}

.error-icon {
  font-size: 4rem;
  margin-bottom: 20px;
}

.error-text {
  font-size: 1.2rem;
  margin-bottom: 30px;
  color: #ff6b6b;
}

.continue-btn {
  background: #5b5fef;
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 6px;
  cursor: pointer;
  font-size: 1rem;
  transition: background 0.3s;
}

.continue-btn:hover {
  background: #4a4ed8;
}

/* Estilos del login container con nubes */
.login-container {
  position: relative;
  background-image: url('https://images.pexels.com/photos/1367192/pexels-photo-1367192.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260');
  background-position: center;
  background-size: cover;
  overflow: hidden;
}

.login-container::before,
.login-container::after {
  content: '';
  position: absolute;
  width: 100%;
  height: 50%;
  background-size: cover;
  z-index: 1;
}

.login-container::before {
  top: 0;
  background-image: url('https://github.com/joshuaward/codepen-images/blob/master/clouds-left.png?raw=true');
  animation: clouds1 110s linear infinite;
}

.login-container::after {
  bottom: 0;
  background-image: url('https://github.com/joshuaward/codepen-images/blob/master/clouds-right.png?raw=true');
  animation: clouds2 100s linear infinite;
}

.login-container > * {
  position: relative;
  z-index: 2;
}

@keyframes clouds1 {
  to {
    background-position: 200% 0;
  }
}

@keyframes clouds2 {
  to {
    background-position: -200% 0;
  }
}

/* Estilos del símbolo */
.symbol {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 250px;
  height: 210px;
}

.symbol .deathly {
  position: absolute;
  bottom: 7px;
  left: 50%;
  width: 230px;
  height: 5px;
  background-color: white;
  border-radius: 7px;
  box-shadow: 0 0 15px rgba(255, 255, 255, 0.5);
  transform: translateX(-50%);
  z-index: 10;
}

.symbol .deathly::before,
.symbol .deathly::after {
  position: absolute;
  content: '';
  bottom: -14px;
  width: 5px;
  height: 224px;
  background-color: white;
  border-radius: 7px;
  box-shadow: 0 0 15px rgba(255, 255, 255, 0.5);
  z-index: 11;
}

.symbol .deathly::before {
  left: 56px;
  transform: rotate(30.75deg);
}

.symbol .deathly::after {
  right: 56px;
  transform: rotate(-30.5deg);
}

.symbol .hallows {
  position: absolute;
  bottom: 7px;
  left: 50%;
  width: 130px;
  height: 130px;
  border: 5px solid white;
  border-radius: 50%;
  box-shadow: 0 0 15px rgba(255, 255, 255, 0.5);
  transform: translateX(-50%);
}

.symbol .hallows::before {
  position: absolute;
  content: '';
  top: -68px;
  left: 50%;
  width: 5px;
  height: 190px;
  background-color: white;
  border-radius: 7px;
  box-shadow: 0 0 15px rgba(255, 255, 255, 0.5);
  transform: translateX(-50%);
}
</style>
