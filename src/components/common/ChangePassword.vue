<template>
  <div class="relative flex min-h-screen w-full flex-col bg-[#101c22] text-white">
    <!-- Top App Bar -->
    <header class="flex shrink-0 items-center border-b border-gray-700 bg-[#101c22] p-4">
      <button
        @click="goBack"
        class="flex size-10 shrink-0 items-center justify-center rounded-full text-white hover:bg-white/10"
      >
        <span class="material-symbols-outlined text-2xl">arrow_back</span>
      </button>
      <h1 class="ml-2 text-lg font-bold leading-tight tracking-tight text-white">
        Change Password
      </h1>
    </header>

    <!-- Main Content -->
    <main class="flex flex-1 items-center justify-center p-4 sm:p-6 lg:p-8">
      <div class="w-full max-w-md space-y-8">
        <div class="space-y-6">
          <!-- New Password Field -->
          <label class="flex flex-col">
            <p class="pb-2 text-sm font-medium leading-normal text-white">New Password</p>
            <div class="relative flex w-full flex-1 items-stretch">
              <input
                v-model="form.newPassword"
                :type="showNewPassword ? 'text' : 'password'"
                class="h-12 w-full flex-1 resize-none overflow-hidden rounded-lg border border-gray-600 bg-[#192b33] p-3 text-base font-normal leading-normal text-white placeholder:text-gray-400 focus:border-blue-500 focus:outline-0 focus:ring-2 focus:ring-blue-500/20"
                placeholder="Enter your new password"
                :class="{ 'border-red-500': errors.newPassword }"
                @input="validatePassword"
              />
              <div class="absolute right-3 top-0 flex h-full items-center justify-center">
                <button
                  type="button"
                  @click="showNewPassword = !showNewPassword"
                  class="text-gray-400 hover:text-white"
                >
                  <span class="material-symbols-outlined text-2xl">
                    {{ showNewPassword ? 'visibility' : 'visibility_off' }}
                  </span>
                </button>
              </div>
            </div>
            <p v-if="errors.newPassword" class="mt-1.5 text-sm text-red-400">
              {{ errors.newPassword }}
            </p>
          </label>

          <!-- Confirm New Password Field -->
          <label class="flex flex-col">
            <p class="pb-2 text-sm font-medium leading-normal text-white">Confirm New Password</p>
            <div class="relative flex w-full flex-1 items-stretch">
              <input
                v-model="form.confirmPassword"
                :type="showConfirmPassword ? 'text' : 'password'"
                class="h-12 w-full flex-1 resize-none overflow-hidden rounded-lg border border-gray-600 bg-[#192b33] p-3 text-base font-normal leading-normal text-white placeholder:text-gray-400 focus:border-blue-500 focus:outline-0 focus:ring-2 focus:ring-blue-500/20"
                placeholder="Confirm your new password"
                :class="{ 'border-red-500': errors.confirmPassword }"
                @input="validatePassword"
              />
              <div class="absolute right-3 top-0 flex h-full items-center justify-center">
                <button
                  type="button"
                  @click="showConfirmPassword = !showConfirmPassword"
                  class="text-gray-400 hover:text-white"
                >
                  <span class="material-symbols-outlined text-2xl">
                    {{ showConfirmPassword ? 'visibility' : 'visibility_off' }}
                  </span>
                </button>
              </div>
            </div>
            <p v-if="errors.confirmPassword" class="mt-1.5 text-sm text-red-400">
              {{ errors.confirmPassword }}
            </p>
          </label>
        </div>

        <!-- Password Requirements Checklist -->
        <div class="space-y-3 rounded-lg border border-gray-700 bg-[#192b33] p-4">
          <h3 class="text-sm font-bold leading-tight text-white">
            Your new password must contain:
          </h3>
          <ul class="space-y-2 text-sm text-gray-300">
            <li
              class="flex items-center"
              :class="passwordRequirements.minLength ? 'text-green-400' : 'text-gray-400'"
            >
              <span class="material-symbols-outlined mr-2 text-base">
                {{ passwordRequirements.minLength ? 'check_circle' : 'radio_button_unchecked' }}
              </span>
              <span>Minimum 8 characters</span>
            </li>
            <li
              class="flex items-center"
              :class="passwordRequirements.upperLower ? 'text-green-400' : 'text-gray-400'"
            >
              <span class="material-symbols-outlined mr-2 text-base">
                {{ passwordRequirements.upperLower ? 'check_circle' : 'radio_button_unchecked' }}
              </span>
              <span>At least one uppercase & lowercase letter</span>
            </li>
            <li
              class="flex items-center"
              :class="passwordRequirements.number ? 'text-green-400' : 'text-gray-400'"
            >
              <span class="material-symbols-outlined mr-2 text-base">
                {{ passwordRequirements.number ? 'check_circle' : 'radio_button_unchecked' }}
              </span>
              <span>At least one number</span>
            </li>
            <li
              class="flex items-center"
              :class="passwordRequirements.specialChar ? 'text-green-400' : 'text-gray-400'"
            >
              <span class="material-symbols-outlined mr-2 text-base">
                {{ passwordRequirements.specialChar ? 'check_circle' : 'radio_button_unchecked' }}
              </span>
              <span>At least one special character (!@#$%)</span>
            </li>
          </ul>
        </div>

        <!-- Action Button -->
        <button
          @click="updatePassword"
          :disabled="!isFormValid || loading"
          class="flex h-12 w-full items-center justify-center rounded-lg bg-blue-500 px-6 text-base font-bold text-white transition-colors hover:bg-blue-600 disabled:cursor-not-allowed disabled:bg-blue-500/50"
        >
          <span v-if="loading" class="flex items-center gap-2">
            <div class="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
            Updating...
          </span>
          <span v-else>Update Password</span>
        </button>

        <!-- Toast Notifications -->
        <div
          v-if="toast.show"
          class="fixed bottom-5 right-5 flex items-center gap-4 rounded-lg p-4 text-white shadow-lg z-50"
          :class="toast.type === 'success' ? 'bg-green-600' : 'bg-red-600'"
        >
          <span class="material-symbols-outlined">
            {{ toast.type === 'success' ? 'task_alt' : 'error' }}
          </span>
          <p class="text-sm font-medium">{{ toast.message }}</p>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, reactive, computed, watch, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import api from '@/services/api'

const router = useRouter()

// Estados reactivos
const form = reactive({
  newPassword: '',
  confirmPassword: '',
})

const errors = reactive({
  newPassword: '',
  confirmPassword: '',
})

const showNewPassword = ref(false)
const showConfirmPassword = ref(false)
const loading = ref(false)

const toast = reactive({
  show: false,
  type: 'success', // 'success' or 'error'
  message: '',
})

// Computed properties
const passwordRequirements = computed(() => {
  const password = form.newPassword
  return {
    minLength: password.length >= 8,
    upperLower: /[a-z]/.test(password) && /[A-Z]/.test(password),
    number: /\d/.test(password),
    specialChar: /[!@#$%*]/.test(password),
  }
})

const isPasswordValid = computed(() => {
  return Object.values(passwordRequirements.value).every((req) => req)
})

const isFormValid = computed(() => {
  return (
    form.newPassword &&
    form.confirmPassword &&
    isPasswordValid.value &&
    form.newPassword === form.confirmPassword
  )
})

// Métodos
const goBack = () => {
  router.back()
}

const validatePassword = () => {
  // Limpiar errores previos
  errors.newPassword = ''
  errors.confirmPassword = ''

  // Validar nueva contraseña
  if (form.newPassword && !isPasswordValid.value) {
    errors.newPassword = 'Password does not meet requirements'
  }

  // Validar confirmación
  if (form.confirmPassword && form.newPassword !== form.confirmPassword) {
    errors.confirmPassword = 'Passwords do not match'
  }
}

const showToast = (type, message, duration = 3000) => {
  toast.type = type
  toast.message = message
  toast.show = true

  setTimeout(() => {
    toast.show = false
  }, duration)
}

const updatePassword = async () => {
  // Validación final
  if (!isFormValid.value) {
    showToast('error', 'Please fix the errors before submitting')
    return
  }

  loading.value = true

  try {
    const userEmail = localStorage.getItem('verifiedEmail')
    const requiresChange = localStorage.getItem('requiresPasswordChange')

    console.log('=== CHANGE PASSWORD DEBUG ===')
    console.log('📧 Email from localStorage:', userEmail)
    console.log('🔐 Token from localStorage:', requiresChange)

    // Verificación mejorada del flujo de recuperación
    if (!requiresChange || requiresChange === 'null' || !userEmail) {
      console.log('❌ Invalid reset flow')
      showToast('error', 'Please complete the verification process first')
      setTimeout(() => {
        router.push('/forgot-password')
      }, 2000)
      return
    }

    // Preparar los datos EXACTAMENTE como los espera la API
    const resetData = {
      token: requiresChange,
      newPassword: form.newPassword,
      confirmNewPassword: form.confirmPassword,
    }

    console.log('📤 Sending reset data:', resetData)

    // Llamar a la API de reset-password
    let response
    if (api.auth && api.auth.resetPassword) {
      response = await api.auth.resetPassword(resetData)
    } else {
      response = await api.post('/api/Auth/reset-password', resetData)
    }

    console.log('✅ Password reset successful:', response.data)

    // Éxito - limpiar localStorage completamente
    localStorage.removeItem('verifiedEmail')
    localStorage.removeItem('requiresPasswordChange')
    localStorage.removeItem('resetEmail') // Limpiar también el email inicial

    // Limpiar el formulario
    form.newPassword = ''
    form.confirmPassword = ''

    showToast('success', 'Password updated successfully! You will be redirected to login.')

    // Redirigir al login después de 2 segundos
    setTimeout(() => {
      router.push('/login')
    }, 2000)
  } catch (error) {
    console.error('❌ Password update error:', error)
    console.log('Error response:', error.response)
    console.log('Error data:', error.response?.data)

    // Manejo específico de errores de la API
    let errorMessage = 'Failed to update password. Please try the recovery process again.'

    if (error.response) {
      // Error de respuesta de la API
      const apiError = error.response.data
      if (apiError.message) {
        errorMessage = apiError.message
      } else if (apiError.errors) {
        // Si hay múltiples errores, tomar el primero
        const firstError = Object.values(apiError.errors)[0]
        errorMessage = Array.isArray(firstError) ? firstError[0] : firstError
      }
    } else if (error.request) {
      // Error de red
      errorMessage = 'Network error. Please check your connection and try again.'
    } else {
      // Error de la llamada API
      errorMessage = error.message || 'Failed to update password.'
    }

    showToast('error', errorMessage)
  } finally {
    loading.value = false
  }
}

// Verificar al montar el componente si viene del flujo correcto
const verifyResetFlow = () => {
  const userEmail = localStorage.getItem('verifiedEmail')
  const requiresChange = localStorage.getItem('requiresPasswordChange')

  console.log('🔍 Verifying reset flow on mount:')
  console.log('  - User Email:', userEmail)
  console.log('  - Token:', requiresChange)

  if (!requiresChange || requiresChange === 'null' || !userEmail) {
    console.log('❌ Invalid reset flow detected - redirecting to forgot-password')
    showToast('error', 'Invalid reset password flow. Redirecting...')
    setTimeout(() => {
      router.push('/forgot-password')
    }, 3000)
  } else {
    console.log('✅ Valid reset flow detected')
  }
}

// Watchers
watch(() => form.newPassword, validatePassword)
watch(() => form.confirmPassword, validatePassword)

// Lifecycle hooks
onMounted(() => {
  verifyResetFlow()
})
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined');

.material-symbols-outlined {
  font-variation-settings:
    'FILL' 0,
    'wght' 400,
    'GRAD' 0,
    'opsz' 24;
}

body {
  min-height: max(884px, 100dvh);
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background-color: #101c22;
}
</style>
