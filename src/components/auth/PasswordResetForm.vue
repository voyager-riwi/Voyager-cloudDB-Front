<template>
  <div class="forgot-password-page">
    <div
      class="relative flex min-h-screen w-full flex-col items-center justify-center bg-[#192b33] dark:bg-background-dark p-4 group/design-root"
      style="font-family: 'Inter', sans-serif"
    >
      <div class="w-full max-w-md space-y-8">
        <!-- Mensajes de estado -->
        <div
          v-if="success"
          class="bg-green-500/20 border border-green-500 text-green-700 dark:text-green-300 px-4 py-3 rounded text-sm text-center"
        >
          ✅ {{ success }}
        </div>
        <div
          v-if="error"
          class="bg-red-500/20 border border-red-500 text-red-700 dark:text-red-300 px-4 py-3 rounded text-sm text-center"
        >
          ❌ {{ error }}
        </div>

        <div class="text-center">
          <h1 class="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
            Forgot Password
          </h1>
          <p class="mt-2 text-base text-slate-600 dark:text-slate-400">
            No worries, we'll send you reset instructions.
          </p>
        </div>

        <div class="space-y-6">
          <div class="flex flex-col">
            <label class="pb-2 text-sm font-medium text-slate-700 dark:text-slate-300" for="email"
              >Email Address</label
            >
            <div class="relative flex w-full items-center">
              <input
                v-model="email"
                class="form-input h-12 w-full flex-1 rounded-lg border border-slate-300 bg-white p-3.5 pr-10 text-base text-slate-900 placeholder:text-slate-400 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 dark:border-slate-700 dark:bg-slate-900 dark:text-white dark:placeholder:text-slate-500"
                id="email"
                placeholder="Enter your registered email"
                type="email"
                :disabled="loading"
              />
              <span
                class="material-symbols-outlined absolute right-3 text-slate-400 dark:text-slate-500"
                style="font-size: 24px"
                >mail</span
              >
            </div>
          </div>
        </div>

        <!-- Botón para enviar correo de recuperación -->
        <div>
          <button
            @click="sendRecoveryEmail"
            :disabled="loading || !email"
            class="w-full bg-transparent border border-white rounded-full py-3 px-11 text-white text-sm font-black uppercase tracking-[1.63px] leading-[14px] text-center transition-all duration-100 ease-in hover:bg-white hover:text-black focus:outline-none relative box-border disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-transparent disabled:hover:text-white"
          >
            <span v-if="loading" class="flex items-center justify-center gap-2">
              <div class="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
              Sending...
            </span>
            <span v-else>Send Recovery Email</span>
          </button>
        </div>

        <div class="text-center">
          <button
            @click="goBack"
            class="inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 dark:focus:ring-offset-background-dark rounded-md"
          >
            <span class="material-symbols-outlined" style="font-size: 20px">arrow_back</span>
            Back to Sign In
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import api from '@/services/api'

const router = useRouter()
const email = ref('')
const loading = ref(false)
const error = ref('')
const success = ref('')

const sendRecoveryEmail = async () => {
  if (!email.value) {
    error.value = 'Please enter your email address'
    return
  }

  // Validación básica de email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(email.value)) {
    error.value = 'Please enter a valid email address'
    return
  }

  loading.value = true
  error.value = ''
  success.value = ''

  try {
    console.log('Sending recovery email to:', email.value)

    // Enviar solicitud de recuperación
    const response = await api.auth.forgotPassword({
      email: email.value,
    })

    console.log('Recovery email response:', response.data)

    // ✅ CORRECCIÓN CRÍTICA: Guardar el email en localStorage ANTES de redirigir
    localStorage.setItem('resetEmail', email.value)

    // Limpiar cualquier token previo (por si es un reintento)
    localStorage.removeItem('requiresPasswordChange')
    localStorage.removeItem('verifiedEmail')

    success.value = 'Recovery email sent! Please check your inbox.'

    // Redirigir después de un breve delay para que el usuario vea el mensaje
    setTimeout(() => {
      router.push('/recovery')
    }, 1500)
  } catch (err) {
    console.error('Error sending recovery email:', err)

    // Manejo específico de errores
    if (err.response?.status === 404) {
      error.value = 'Email address not found. Please check and try again.'
    } else if (err.response?.status === 429) {
      error.value = 'Too many attempts. Please try again later.'
    } else if (err.response?.data?.message) {
      error.value = err.response.data.message
    } else {
      error.value = 'Failed to send recovery email. Please try again.'
    }
  } finally {
    loading.value = false
  }
}

const goBack = () => {
  router.push('/login')
}

// Opcional: Limpiar localStorage al montar el componente
import { onMounted } from 'vue'

onMounted(() => {
  // Limpiar estado previo al cargar el formulario
  localStorage.removeItem('resetEmail')
  localStorage.removeItem('requiresPasswordChange')
  localStorage.removeItem('verifiedEmail')
})
</script>
