<template>
  <div class="video-loading" :class="{ 'fade-out': isFading }" @click="skipVideo">
    <video
      ref="videoEl"
      class="loading-video"
      preload="auto"
      @ended="handleVideoEnd"
      @error="handleVideoError"
      muted
    >
      <source :src="videoSrc" type="video/mp4" />
      <source :src="videoSrcWebm" type="video/webm" />
      Tu navegador no soporta el elemento video.
    </video>

    <div class="loading-content">
      <div class="loading-text">{{ message }}</div>
      <div class="skip-hint">(Click o presiona Escape para saltar)</div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const props = defineProps({
  videoSrc: {
    type: String,
    required: true,
  },
  videoSrcWebm: {
    type: String,
    default: '',
  },
  message: {
    type: String,
    default: 'Cargando tu experiencia...',
  },
})

const emit = defineEmits(['completed', 'skipped', 'error'])

const videoEl = ref(null)
const isFading = ref(false)

const playVideo = async () => {
  try {
    if (videoEl.value) {
      // Forzar reproducción con muted para evitar políticas de autoplay
      videoEl.value.muted = true
      await videoEl.value.play()
    }
  } catch (error) {
    console.error('Error reproduciendo video:', error)
    emit('error', error)
  }
}

const handleVideoEnd = () => {
  fadeOutAndComplete()
}

const handleVideoError = (error) => {
  console.error('Error en video:', error)
  emit('error', error)
  fadeOutAndComplete()
}

const skipVideo = () => {
  if (videoEl.value) {
    videoEl.value.pause()
  }
  isFading.value = true
  emit('skipped')

  setTimeout(() => {
    emit('completed')
  }, 500)
}

const fadeOutAndComplete = () => {
  isFading.value = true
  setTimeout(() => {
    emit('completed')
  }, 500)
}

const handleKeydown = (event) => {
  if (event.key === 'Escape') {
    skipVideo()
  }
}

onMounted(() => {
  playVideo()
  window.addEventListener('keydown', handleKeydown)
})

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeydown)
  if (videoEl.value) {
    videoEl.value.pause()
  }
})
</script>

<style scoped>
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
}

.loading-content {
  text-align: center;
  margin-top: 20px;
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
</style>
