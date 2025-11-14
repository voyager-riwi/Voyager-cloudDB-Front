<template>
  <nav
    ref="navbar"
    class="fixed top-0 left-0 w-full z-50 transition-all duration-300 ease-in-out"
    :class="navbarClasses"
  >
    <div class="container mx-auto px-4 py-3">
      <div class="flex justify-between items-center">
        <!-- Logo -->
        <div
          class="text-xl hover:text-yellow-300 cursor-pointer font-bold text-white"
          @click="router.push('/Dashboard')"
        >
          Dashboard
        </div>

        <!-- Menú de navegación -->
        <ul class="flex space-x-6">
          <li v-for="item in navItems" :key="item.name">
            <a
              @click="item.href"
              class="text-white hover:text-yellow-300 cursor-pointer transition-colors duration-200"
            >
              {{ item.name }}
            </a>
          </li>
        </ul>
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
const router = useRouter()

const navItems = [
  {
    name: 'Login',
    href: () => {
      router.push('/Login')
    },
  },
  {
    name: 'Register',
    href: () => {
      router.push('/Register')
    },
  },
]

// Clases computadas para el navbar
const navbarClasses = computed(() => {
  const baseClasses = {
    'opacity-0 -translate-y-full': !isVisible.value,
    'opacity-100 translate-y-0': isVisible.value,
  }

  if (isVisible.value) {
    if (isAtBottom.value) {
      baseClasses['bg-gray-900'] = true
    } else {
      baseClasses['bg-gray-800'] = true
    }
  }

  return baseClasses
})

const handleScroll = () => {
  const scrollY = window.scrollY
  const windowHeight = window.innerHeight
  const documentHeight = document.documentElement.scrollHeight

  // Verificar si estamos en los primeros 100vh
  const inFirst100vh = scrollY < windowHeight

  // Verificar si estamos cerca del final (últimos 100px)
  const atBottom = scrollY + windowHeight >= documentHeight - 100

  isAtBottom.value = atBottom
  isVisible.value = inFirst100vh || atBottom
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
  // Verificar posición inicial
  handleScroll()
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>
