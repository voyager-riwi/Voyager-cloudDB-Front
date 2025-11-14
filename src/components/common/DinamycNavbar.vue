<template>
  <nav
    ref="navbar"
    class="fixed top-0 left-0 w-full z-50 transition-all duration-300 ease-in-out bg-gradient-to-b from-[#0a1628]/95 to-[#0a1628]/80 backdrop-blur-lg border-b border-[#daa520]/20 shadow-xl"
    :class="navbarClasses"
  >
    <div class="container mx-auto px-4 py-3">
      <div class="flex items-center justify-between">
        <!-- Logo -->
        <div class="flex items-center">
          <span
            class="text-lg md:text-xl lg:text-2xl font-bold cursor-pointer transition-all duration-300 bg-gradient-to-r from-[#daa520] via-[#ffd700] to-[#daa520] bg-clip-text text-transparent"
            @click="router.push('/Dashboard')"
          >
            Dashboard
          </span>
        </div>

        <!-- Botones de escritorio -->
        <div class="hidden md:flex items-center space-x-3 lg:space-x-4">
          <button
            @click="$router.push('/login')"
            class="relative overflow-hidden rounded-lg font-semibold transition-all duration-300 px-4 py-2 lg:px-6 lg:py-2.5 text-sm lg:text-base bg-transparent border-2 border-[#daa520]/50 text-[#daa520] hover:border-[#daa520] hover:text-[#ffd700] hover:shadow-lg hover:shadow-[#daa520]/20 font-cinzel tracking-wide"
          >
            <span class="relative z-10">Iniciar Sesión</span>
            <div
              class="absolute inset-0 bg-radial-gradient from-[#daa520]/10 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 rounded-lg"
            ></div>
          </button>
          <button
            @click="$router.push('/register')"
            class="relative overflow-hidden rounded-lg font-semibold transition-all duration-300 px-4 py-2 lg:px-6 lg:py-2.5 text-sm lg:text-base bg-gradient-to-r from-[#daa520] to-[#cd9a1e] text-[#0a1628] border-2 border-transparent hover:shadow-2xl hover:shadow-[#daa520]/30 hover:-translate-y-0.5 active:translate-y-0 font-cinzel tracking-wide"
          >
            <span class="relative z-10">Registrarse</span>
            <div
              class="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent transform -translate-x-full hover:translate-x-full transition-transform duration-500"
            ></div>
          </button>
        </div>

        <!-- Menú hamburguesa móvil -->
        <button
          class="md:hidden flex flex-col justify-center items-center w-10 h-10 relative z-50"
          @click="toggleMobileMenu"
          aria-label="Menú"
        >
          <span
            class="w-6 h-0.5 bg-[#daa520] transition-all duration-300"
            :class="{ 'rotate-45 translate-y-1.5': isMobileMenuOpen }"
          ></span>
          <span
            class="w-6 h-0.5 bg-[#daa520] transition-all duration-300 mt-1.5"
            :class="{ 'opacity-0': isMobileMenuOpen }"
          ></span>
          <span
            class="w-6 h-0.5 bg-[#daa520] transition-all duration-300 mt-1.5"
            :class="{ '-rotate-45 -translate-y-1.5': isMobileMenuOpen }"
          ></span>
        </button>
      </div>

      <!-- Menú móvil -->
      <div
        class="fixed inset-0 z-40 md:hidden transition-all duration-300"
        :class="{
          'opacity-100 visible': isMobileMenuOpen,
          'opacity-0 invisible': !isMobileMenuOpen,
        }"
      >
        <!-- Overlay -->
        <div class="absolute inset-0 bg-black bg-opacity-70" @click="closeMobileMenu"></div>

        <!-- Panel del menú -->
        <div
          class="absolute top-0 right-0 h-full w-80 max-w-full bg-gradient-to-b from-[#0a1628] to-[#061021] transform transition-transform duration-300 shadow-2xl"
          :class="{
            'translate-x-0': isMobileMenuOpen,
            'translate-x-full': !isMobileMenuOpen,
          }"
        >
          <!-- Header del menú móvil -->
          <div
            class="flex items-center justify-between p-6 border-b border-[#daa520] border-opacity-20"
          >
            <span class="text-xl font-bold text-[#daa520]">Menú</span>
            <button
              @click="closeMobileMenu"
              class="w-10 h-10 flex items-center justify-center text-[#daa520] hover:text-[#ffd700] transition-colors"
            ></button>
          </div>

          <!-- Botones del menú móvil -->
          <div class="p-6 space-y-4">
            <button
              @click="navigateTo('/login')"
              class="w-full relative overflow-hidden rounded-xl font-semibold transition-all duration-300 border-2 py-4 px-6 text-base bg-transparent border-[#daa520]/30 text-[#daa520] hover:border-[#daa520] hover:text-[#ffd700] hover:bg-[#daa520]/5 font-cinzel tracking-wide"
            >
              Iniciar Sesión
            </button>
            <button
              @click="navigateTo('/register')"
              class="w-full relative overflow-hidden rounded-xl font-semibold transition-all duration-300 border-2 py-4 px-6 text-base bg-gradient-to-r from-[#daa520] to-[#cd9a1e] text-[#0a1628] border-transparent hover:shadow-lg hover:shadow-[#daa520]/30 font-cinzel tracking-wide"
            >
              Registrarse
            </button>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { ref, onMounted, onUnmounted, computed } from 'vue'
import { useRouter } from 'vue-router'

const navbar = ref(null)
const isVisible = ref(false)
const isAtBottom = ref(false)
const isMobileMenuOpen = ref(false)
const router = useRouter()

// Clases computadas para el navbar
const navbarClasses = computed(() => {
  if (!isVisible.value) {
    return ['opacity-0', '-translate-y-full']
  } else {
    return ['opacity-100', 'translate-y-0']
  }
})

const handleScroll = () => {
  const scrollY = window.scrollY
  const windowHeight = window.innerHeight
  const documentHeight = document.documentElement.scrollHeight

  const inFirst100vh = scrollY < windowHeight
  const atBottom = scrollY + windowHeight >= documentHeight - 100

  isAtBottom.value = atBottom
  isVisible.value = inFirst100vh || atBottom
}

const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
  if (isMobileMenuOpen.value) {
    document.body.style.overflow = 'hidden'
  } else {
    document.body.style.overflow = ''
  }
}

const closeMobileMenu = () => {
  isMobileMenuOpen.value = false
  document.body.style.overflow = ''
}

const navigateTo = (route) => {
  closeMobileMenu()
  router.push(route)
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
  handleScroll()
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
  document.body.style.overflow = ''
})
</script>

<style>
/* Agregar la fuente Cinzel si no está en tu proyecto */
@import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600;700&display=swap');

.font-cinzel {
  font-family: 'Cinzel', serif;
}

/* Efecto de gradiente radial para el botón login */
.bg-radial-gradient {
  background: radial-gradient(circle, rgba(218, 165, 32, 0.1) 0%, transparent 70%);
}
</style>
