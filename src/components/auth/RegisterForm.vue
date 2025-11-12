<template>
  <div
    class="relative flex h-auto min-h-screen w-full flex-col overflow-x-hidden bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 font-sans"
  >
    <div class="absolute inset-0 bg-grid-pattern opacity-10"></div>

    <header class="relative w-full py-8 px-4 flex flex-col items-center justify-center">
      <div
        class="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-gray-500 to-transparent opacity-40"
      ></div>
      <h1 class="text-4xl font-bold text-gray-100 tracking-wider mb-3 text-center">Crear Cuenta</h1>
      <div class="w-28 h-1 bg-gradient-to-r from-gray-500 to-gray-300 rounded-full"></div>
    </header>
    <button
      class="absolute left-6 top-6 flex items-center justify-center z-20 rounded-full size-10 bg-gray-800/60 border border-gray-700/50 backdrop-blur-sm text-gray-200 transition-all hover:text-white hover:bg-gray-700/70 hover:border-gray-600 md:left-8 md:top-8"
      @click="goHome"
    >
      <span class="material-symbols-outlined text-lg">arrow_back</span>
    </button>

    <main class="flex-1 px-6 py-8 flex flex-col max-w-md mx-auto w-full z-10">
      <div class="text-center mb-10">
        <p class="text-gray-400 text-sm">Únete a nuestra plataforma de administración</p>
      </div>

      <form @submit.prevent="handleSubmit" class="flex flex-col gap-6">
        <div class="space-y-6">
          <div class="grid grid-cols-2 gap-4">
            <div class="flex flex-col">
              <label class="text-gray-300 text-sm font-medium mb-2"> Nombre </label>
              <input
                v-model="form.firstName"
                autocomplete="given-name"
                class="w-full rounded-lg bg-gray-800/60 border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-gray-500 h-12 placeholder:text-gray-500 p-4 text-base font-normal transition-all"
                placeholder="Ej: Juan"
                type="text"
                required
                :disabled="isSubmitting"
              />
            </div>

            <div class="flex flex-col">
              <label class="text-gray-300 text-sm font-medium mb-2"> Apellido </label>
              <input
                v-model="form.lastName"
                autocomplete="family-name"
                class="w-full rounded-lg bg-gray-800/60 border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-gray-500 h-12 placeholder:text-gray-500 p-4 text-base font-normal transition-all"
                placeholder="Ej: Pérez"
                type="text"
                required
                :disabled="isSubmitting"
              />
            </div>
          </div>

          <div class="flex flex-col">
            <label class="text-gray-300 text-sm font-medium mb-2"> Correo Electrónico </label>
            <input
              v-model="form.email"
              autocomplete="email"
              class="w-full rounded-lg bg-gray-800/60 border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-gray-500 h-12 placeholder:text-gray-500 p-4 text-base font-normal transition-all"
              placeholder="juan.perez@ejemplo.com"
              type="email"
              required
              :disabled="isSubmitting"
            />
          </div>

          <div class="flex flex-col">
            <label class="text-gray-300 text-sm font-medium mb-2"> Contraseña </label>
            <div class="flex w-full items-stretch">
              <input
                v-model="form.password"
                :type="showPassword ? 'text' : 'password'"
                autocomplete="new-password"
                class="flex w-full rounded-l-lg bg-gray-800/60 border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-gray-500 h-12 placeholder:text-gray-500 p-4 border-r-0 text-base font-normal transition-all"
                placeholder="8+ caracteres, una mayúscula, un número"
                required
                :disabled="isSubmitting"
              />
              <button
                type="button"
                class="text-gray-400 flex border border-gray-600 bg-gray-800/60 items-center justify-center px-4 rounded-r-lg border-l-0 hover:bg-gray-700/60 transition-colors"
                @click="togglePasswordVisibility"
                :disabled="isSubmitting"
              >
                <span class="material-symbols-outlined cursor-pointer text-lg">
                  {{ showPassword ? 'visibility_off' : 'visibility' }}
                </span>
              </button>
            </div>
          </div>

          <!-- Confirmar Contraseña -->
          <div class="flex flex-col">
            <label class="text-gray-300 text-sm font-medium mb-2"> Confirmar Contraseña </label>
            <div class="flex w-full items-stretch">
              <input
                v-model="form.confirmPassword"
                :type="showConfirmPassword ? 'text' : 'password'"
                autocomplete="new-password"
                class="flex w-full rounded-l-lg bg-gray-800/60 border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-gray-500 h-12 placeholder:text-gray-500 p-4 border-r-0 text-base font-normal transition-all"
                placeholder="Vuelve a escribir tu contraseña"
                required
                :disabled="isSubmitting"
              />
              <button
                type="button"
                class="text-gray-400 flex border border-gray-600 bg-gray-800/60 items-center justify-center px-4 rounded-r-lg border-l-0 hover:bg-gray-700/60 transition-colors"
                @click="toggleConfirmPasswordVisibility"
                :disabled="isSubmitting"
              >
                <span class="material-symbols-outlined cursor-pointer text-lg">
                  {{ showConfirmPassword ? 'visibility_off' : 'visibility' }}
                </span>
              </button>
            </div>
            <p v-if="passwordMismatch" class="text-red-300 text-sm mt-2 font-medium">
              Las contraseñas no coinciden
            </p>
          </div>
        </div>

        <!-- Términos y Condiciones -->
        <div class="flex items-start gap-3 py-2">
          <input
            v-model="form.agreeToTerms"
            class="form-checkbox mt-1 h-5 w-5 rounded border-gray-500 bg-gray-700 text-gray-300 focus:ring-gray-500 focus:ring-offset-gray-900"
            id="terms"
            type="checkbox"
            required
            :disabled="isSubmitting"
          />
          <label class="text-gray-400 text-sm" for="terms">
            Acepto los
            <a
              class="font-semibold text-gray-300 hover:underline cursor-pointer"
              @click="navigateToTerms"
            >
              Términos y Condiciones
            </a>
            y la
            <a
              class="font-semibold text-gray-300 hover:underline cursor-pointer"
              @click="navigateToPrivacy"
            >
              Política de Privacidad </a
            >.
          </label>
        </div>

        <div class="flex-grow"></div>

        <div class="py-2">
          <button
            type="submit"
            :disabled="isSubmitting || passwordMismatch || !form.agreeToTerms"
            class="flex w-full items-center justify-center rounded-lg bg-gradient-to-r from-gray-700 to-gray-600 h-14 text-white text-base font-bold leading-normal transition-all hover:from-gray-600 hover:to-gray-500 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
          >
            <span v-if="isSubmitting" class="flex items-center gap-2">
              <svg
                class="animate-spin h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  class="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  stroke-width="4"
                ></circle>
                <path
                  class="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8
 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              Creando Cuenta...
            </span>
            <span v-else class="flex items-center gap-2"> Crear Cuenta </span>
          </button>
        </div>
      </form>

      <p class="text-center text-gray-400 text-base font-normal leading-normal pb-6 pt-4">
        ¿Ya tienes una cuenta?
        <a class="font-bold text-gray-300 hover:underline cursor-pointer" @click="navigateToLogin">
          Iniciar Sesión
        </a>
      </p>
    </main>

    <div
      class="absolute bottom-0 left-0 w-full h-16 bg-gradient-to-t from-gray-900 to-transparent pointer-events-none"
    ></div>
    <div
      class="fixed top-10 left-5 w-3 h-3 bg-gray-500 rounded-full opacity-70 animate-pulse"
    ></div>
    <div
      class="fixed top-20 right-8 w-2 h-2 bg-gray-400 rounded-full opacity-50 animate-pulse delay-1000"
    ></div>
    <div
      class="fixed bottom-32 left-10 w-2 h-2 bg-gray-500 rounded-full opacity-60 animate-pulse delay-500"
    ></div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { useMagicToast } from '@/composables/useMagicToast'

const router = useRouter()
const authStore = useAuthStore()
const toast = useMagicToast()

const form = ref({
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  confirmPassword: '',
  agreeToTerms: false,
})

const showPassword = ref(false)
const showConfirmPassword = ref(false)
const isSubmitting = ref(false)

const error = ref('')
const success = ref('')
const showSuccess = ref(false)

const handleSubmit = async () => {
  error.value = ''

  // Validación de contraseñas
  if (form.value.password !== form.value.confirmPassword) {
    toast.expelliarmus('Las contraseñas no coinciden', { title: 'Error de Validación' })
    return
  }

  if (!form.value.agreeToTerms) {
    toast.expelliarmus('Debes aceptar los términos y condiciones', { title: 'Error de Validación' })
    return
  }

  isSubmitting.value = true

  try {
    const registerData = {
      firstName: form.value.firstName,
      lastName: form.value.lastName,
      email: form.value.email,
      password: form.value.password,
    }

    console.log('Enviando datos de registro:', registerData)
    const response = await authStore.register(registerData)
    console.log('Respuesta del registro:', response)

    toast.lumos('¡Cuenta creada con éxito! Redirigiendo al login...', {
      title: '¡Registro Completo!',
      duration: 3000,
    })
    setTimeout(() => {
      router.push('/login?registered=true')
    }, 3000)
  } catch (err) {
    console.error('Error en el registro:', err)

    const errorMessage =
      err.response?.data?.message ||
      err.message ||
      'El registro falló. Por favor, inténtalo de nuevo.'

    toast.expelliarmus(errorMessage, {
      title: '⚡ Error de Registro',
    })
  } finally {
    isSubmitting.value = false
  }
}

const togglePasswordVisibility = () => {
  showPassword.value = !showPassword.value
}

const toggleConfirmPasswordVisibility = () => {
  showConfirmPassword.value = !showConfirmPassword.value
}

const passwordMismatch = computed(() => {
  return (
    form.value.password &&
    form.value.confirmPassword &&
    form.value.password !== form.value.confirmPassword
  )
})

const navigateToLogin = () => {
  router.push('/login')
}

const navigateToTerms = () => {
  // Implementar navegación a términos y condiciones
  console.log('Navegar a términos y condiciones')
}

const navigateToPrivacy = () => {
  // Implementar navegación a política de privacidad
  console.log('Navegar a política de privacidad')
}

const goHome = () => {
  router.push('/about') // O a donde corresponda, ej: '/'
}
</script>

<style>
.bg-grid-pattern {
  background-image: url('https://wallpapercave.com/wp/wp6652276.jpg');
  background-size: cover;
  background-position: right;
  background-repeat: no-repeat;
  background-attachment: fixed;
  opacity: 0.3;
}
</style>
