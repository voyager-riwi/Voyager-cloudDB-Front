<template>
  <div class="forgot-password-page">
    <div
      class="relative flex min-h-screen w-full flex-col items-center justify-center bg-[#192b33] bg-background-dark p-4 group/design-root"
      style="font-family: 'Inter', sans-serif"
    >
      <div class="w-full max-w-md space-y-8">
        <!-- Mensaje de error inline (solo para validaciones simples) -->
        <div
          v-if="error"
          class="bg-red-500/20 border border-red-500 text-red-700 text-red-300 px-4 py-3 rounded text-sm text-center"
        >
          ❌ {{ error }}
        </div>

        <div class="text-center">
          <h1 class="text-3xl font-bold tracking-tight text-slate-900 text-white">
            Forgot Password
          </h1>
          <p class="mt-2 text-base text-slate-600 text-slate-400">
            No worries, we'll send you reset instructions.
          </p>
        </div>

        <div class="space-y-6">
          <div class="flex flex-col">
            <label class="pb-2 text-sm font-medium text-slate-700 text-slate-300" for="email"
              >Email Address</label
            >
            <div class="relative flex w-full items-center">
              <input
                v-model="email"
                class="form-input h-12 w-full flex-1 rounded-lg border border-slate-300  p-3.5 pr-10 text-base text-slate-900 placeholder:text-slate-400 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 border-slate-700 bg-slate-900 text-white placeholder:text-slate-500"
                id="email"
                placeholder="Enter your registered email"
                type="email"
                :disabled="loading"
              />
              <span
                class="material-symbols-outlined absolute right-3 text-slate-400 text-slate-500"
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
            class="w-full bg-transparent border border-white rounded-full py-3 px-11 text-white text-sm font-black uppercase tracking-[1.63px] leading-[14px] text-center transition-all duration-100 ease-in hover: hover:text-black focus:outline-none relative box-border disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-transparent disabled:hover:text-white"
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
            class="inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background-dark rounded-md"
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
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useMagicToast } from '@/composables/useMagicToast'
import api from '@/services/api'

const router = useRouter()
const toast = useMagicToast()

const email = ref('')
const loading = ref(false)
const error = ref('')

const sendRecoveryEmail = async () => {
  if (!email.value) {
    error.value = 'Please enter your email address'
    toast.expelliarmus('Please enter your email address', {
      duration: 3000,
    })
    return
  }

  // Validación básica de email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(email.value)) {
    error.value = 'Please enter a valid email address'
    toast.expelliarmus('Please enter a valid email address', {
      duration: 3000,
    })
    return
  }

  loading.value = true
  error.value = ''

  try {

    // Enviar solicitud de recuperación
    const response = await api.auth.forgotPassword({
      email: email.value,
    })


    // Guardar el email en localStorage ANTES de redirigir
    localStorage.setItem('resetEmail', email.value)

    // Limpiar cualquier token previo (por si es un reintento)
    localStorage.removeItem('requiresPasswordChange')
    localStorage.removeItem('verifiedEmail')

    toast.lumos('Recovery email sent! Please check your inbox and enter the code. 📧', {
      title: '✉️ Email Sent',
      duration: 3000,
    })

    // Redirigir después de un breve delay
    setTimeout(() => {
      router.push('/recovery')
    }, 1500)
  } catch (err) {
    console.error('❌ Error sending recovery email:', err)

    let errorMessage = 'Failed to send recovery email. Please try again.'

    if (err.response?.status === 404) {
      errorMessage = 'Email address not found. Please check and try again.'
    } else if (err.response?.status === 429) {
      errorMessage = 'Too many attempts. Please try again later.'
    } else if (err.response?.data?.message) {
      errorMessage = err.response.data.message
    }

    error.value = errorMessage

    toast.expelliarmus(errorMessage, {
      title: '⚡ Error',
      duration: 5000,
    })
  } finally {
    loading.value = false
  }
}

const goBack = () => {
  router.push('/login')
}

// Limpiar localStorage al montar el componente
onMounted(() => {
  // Limpiar estado previo al cargar el formulario
  localStorage.removeItem('resetEmail')
  localStorage.removeItem('requiresPasswordChange')
  localStorage.removeItem('verifiedEmail')
})
</script>
