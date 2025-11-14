<template>
  <div class="relative flex min-h-screen w-full flex-col bg-[#101c22] text-white">
    <!-- Top App Bar - Solo mostrar en modo standalone -->
    <header
      v-if="isStandalone"
      class="flex shrink-0 items-center border-b border-gray-700 bg-[#101c22] p-4"
    >
      <button
        @click="goBack"
        class="flex size-10 shrink-0 items-center justify-center rounded-full text-white hover:/10"
      >
        <span class="material-symbols-outlined text-2xl">arrow_back</span>
      </button>
      <h1 class="ml-2 text-lg font-bold leading-tight tracking-tight text-white">
        {{ isResetFlow ? 'Change Password' : 'Update Password' }}
      </h1>
    </header>

    <!-- Main Content -->
    <main
      class="flex flex-1 items-center justify-center p-4 sm:p-6 lg:p-8"
      :class="{ 'pt-4': !isStandalone }"
    >
      <div class="w-full max-w-md space-y-8">
        <!-- Título para modo embed -->
        <div v-if="!isStandalone" class="text-center">
          <h1 class="text-2xl font-bold leading-tight tracking-tight text-white mb-2">
            Update Password
          </h1>
          <p class=" text-sm">Create a new strong password for your account</p>
        </div>

        <div class="space-y-6">
          <!-- Current Password Field - Solo en modo dashboard -->
          <label v-if="!isResetFlow" class="flex flex-col">
            <p class="pb-2 text-sm font-medium leading-normal text-white">Current Password</p>
            <div class="relative flex w-full flex-1 items-stretch">
              <input
                v-model="form.currentPassword"
                :type="showCurrentPassword ? 'text' : 'password'"
                class="h-12 w-full flex-1 resize-none overflow-hidden rounded-lg border  bg-[#192b33] p-3 text-base font-normal leading-normal text-white placeholder: focus:border-blue-500 focus:outline-0 focus:ring-2 focus:ring-blue-500/20"
                placeholder="Enter your current password"
                :class="{ 'border-red-500': errors.currentPassword }"
              />
              <div class="absolute right-3 top-0 flex h-full items-center justify-center">
                <button
                  type="button"
                  @click="showCurrentPassword = !showCurrentPassword"
                  class=" hover:text-white"
                >
                  <span class="material-symbols-outlined text-2xl">
                    {{ showCurrentPassword ? 'visibility' : 'visibility_off' }}
                  </span>
                </button>
              </div>
            </div>
            <p v-if="errors.currentPassword" class="mt-1.5 text-sm text-red-400">
              {{ errors.currentPassword }}
            </p>
          </label>

          <!-- New Password Field -->
          <label class="flex flex-col">
            <p class="pb-2 text-sm font-medium leading-normal text-white">New Password</p>
            <div class="relative flex w-full flex-1 items-stretch">
              <input
                v-model="form.newPassword"
                :type="showNewPassword ? 'text' : 'password'"
                class="h-12 w-full flex-1 resize-none overflow-hidden rounded-lg border  bg-[#192b33] p-3 text-base font-normal leading-normal text-white placeholder: focus:border-blue-500 focus:outline-0 focus:ring-2 focus:ring-blue-500/20"
                placeholder="Enter your new password"
                :class="{ 'border-red-500': errors.newPassword }"
                @input="validatePassword"
              />
              <div class="absolute right-3 top-0 flex h-full items-center justify-center">
                <button
                  type="button"
                  @click="showNewPassword = !showNewPassword"
                  class=" hover:text-white"
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
                class="h-12 w-full flex-1 resize-none overflow-hidden rounded-lg border  bg-[#192b33] p-3 text-base font-normal leading-normal text-white placeholder: focus:border-blue-500 focus:outline-0 focus:ring-2 focus:ring-blue-500/20"
                placeholder="Confirm your new password"
                :class="{ 'border-red-500': errors.confirmPassword }"
                @input="validatePassword"
              />
              <div class="absolute right-3 top-0 flex h-full items-center justify-center">
                <button
                  type="button"
                  @click="showConfirmPassword = !showConfirmPassword"
                  class=" hover:text-white"
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
              :class="passwordRequirements.minLength ? 'text-green-400' : ''"
            >
              <span class="material-symbols-outlined mr-2 text-base">
                {{ passwordRequirements.minLength ? 'check_circle' : 'radio_button_unchecked' }}
              </span>
              <span>Minimum 8 characters</span>
            </li>
            <li
              class="flex items-center"
              :class="passwordRequirements.upperLower ? 'text-green-400' : ''"
            >
              <span class="material-symbols-outlined mr-2 text-base">
                {{ passwordRequirements.upperLower ? 'check_circle' : 'radio_button_unchecked' }}
              </span>
              <span>At least one uppercase & lowercase letter</span>
            </li>
            <li
              class="flex items-center"
              :class="passwordRequirements.number ? 'text-green-400' : ''"
            >
              <span class="material-symbols-outlined mr-2 text-base">
                {{ passwordRequirements.number ? 'check_circle' : 'radio_button_unchecked' }}
              </span>
              <span>At least one number</span>
            </li>
            <li
              class="flex items-center"
              :class="passwordRequirements.specialChar ? 'text-green-400' : ''"
            >
              <span class="material-symbols-outlined mr-2 text-base">
                {{ passwordRequirements.specialChar ? 'check_circle' : 'radio_button_unchecked' }}
              </span>
              <span>At least one special character (!@#$%)</span>
            </li>
          </ul>
        </div>

        <!-- Action Buttons -->
        <div class="space-y-3">
          <button
            @click="updatePassword"
            :disabled="!isFormValid || loading"
            class="flex h-12 w-full items-center justify-center rounded-lg bg-blue-500 px-6 text-base font-bold text-white transition-colors hover:bg-blue-600 disabled:cursor-not-allowed disabled:bg-blue-500/50"
          >
            <span v-if="loading" class="flex items-center gap-2">
              <div class="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
              {{ isResetFlow ? 'Updating...' : 'Changing...' }}
            </span>
            <span v-else>{{ isResetFlow ? 'Update Password' : 'Change Password' }}</span>
          </button>

          <!-- Botón cancelar para modo embed -->
          <button
            v-if="!isStandalone"
            @click="$emit('cancel')"
            :disabled="loading"
            class="flex h-12 w-full items-center justify-center rounded-lg border  px-6 text-base font-bold text-gray-300 transition-colors hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Cancel
          </button>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, reactive, computed, watch, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { useMagicToast } from '@/composables/useMagicToast'
import api from '@/services/api'

// Props
const props = defineProps({
  isStandalone: {
    type: Boolean,
    default: true,
  },
})

const emit = defineEmits(['success', 'cancel'])

const router = useRouter()
const authStore = useAuthStore()
const toast = useMagicToast()

// Estados reactivos
const form = reactive({
  currentPassword: '',
  newPassword: '',
  confirmPassword: '',
})

const errors = reactive({
  currentPassword: '',
  newPassword: '',
  confirmPassword: '',
})

const showCurrentPassword = ref(false)
const showNewPassword = ref(false)
const showConfirmPassword = ref(false)
const loading = ref(false)

// Computed properties
const isResetFlow = computed(() => {
  const requiresChange = localStorage.getItem('requiresPasswordChange')
  return !!requiresChange && requiresChange !== 'null'
})

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
  if (isResetFlow.value) {
    // Para flujo de recuperación
    return (
      form.newPassword &&
      form.confirmPassword &&
      isPasswordValid.value &&
      form.newPassword === form.confirmPassword
    )
  }

  // Para flujo normal desde dashboard
  return (
    form.currentPassword &&
    form.newPassword &&
    form.confirmPassword &&
    isPasswordValid.value &&
    form.newPassword === form.confirmPassword
  )
})

// Métodos
const goBack = () => {
  if (props.isStandalone) {
    router.back()
  } else {
    emit('cancel')
  }
}

const validatePassword = () => {
  errors.newPassword = ''
  errors.confirmPassword = ''

  if (form.newPassword && !isPasswordValid.value) {
    errors.newPassword = 'Password does not meet requirements'
  }

  if (form.confirmPassword && form.newPassword !== form.confirmPassword) {
    errors.confirmPassword = 'Passwords do not match'
  }
}

const updatePassword = async () => {
  if (!isFormValid.value) {
    toast.expelliarmus('Please fix the errors before submitting', {
      duration: 4000,
    })
    return
  }

  loading.value = true

  try {
    if (isResetFlow.value) {
      await handleResetPassword()
    } else {
      await handleRegularPasswordChange()
    }
  } catch (error) {
    console.error('Password update error:', error)
    handleUpdateError(error)
  } finally {
    loading.value = false
  }
}

const handleResetPassword = async () => {
  const userEmail = localStorage.getItem('verifiedEmail')
  const requiresChange = localStorage.getItem('requiresPasswordChange')

  console.log('=== RESET PASSWORD FLOW ===')
  console.log('📧 Email:', userEmail)
  console.log('🔐 Token:', requiresChange)

  if (!requiresChange || requiresChange === 'null' || !userEmail) {
    toast.expelliarmus('Please complete the verification process first', {
      title: '⚡ Verification Required',
      duration: 4000,
    })
    setTimeout(() => {
      router.push('/forgot-password')
    }, 2000)
    return
  }

  const resetData = {
    token: requiresChange,
    newPassword: form.newPassword,
    confirmNewPassword: form.confirmPassword,
  }

  console.log('📤 Sending reset data:', resetData)

  const response = await api.auth.resetPassword(resetData)
  console.log('✅ Password reset successful:', response.data)

  // Limpiar localStorage
  localStorage.removeItem('verifiedEmail')
  localStorage.removeItem('requiresPasswordChange')
  localStorage.removeItem('resetEmail')

  toast.lumos('Password updated successfully! Redirecting to login... ✨', {
    title: '🔐 Password Updated',
    duration: 4000,
  })

  if (props.isStandalone) {
    setTimeout(() => {
      router.push('/login')
    }, 2000)
  } else {
    emit('success')
    form.newPassword = ''
    form.confirmPassword = ''
  }
}

const handleRegularPasswordChange = async () => {
  console.log('=== REGULAR PASSWORD CHANGE ===')

  try {
    // 1. Obtener email del usuario
    const userEmail = localStorage.getItem('userEmail')
    if (!userEmail) {
      throw new Error('User email not found. Please log out and log in again.')
    }

    console.log('📧 User:', userEmail)

    // 2. Validar contraseña actual
    console.log('🔐 Validating current password...')
    await api.auth.login({
      email: userEmail,
      password: form.currentPassword,
    })

    console.log('✅ Current password correct')

    // 3. Cambiar contraseña usando el endpoint correcto
    const changeData = {
      currentPassword: form.currentPassword,
      newPassword: form.newPassword,
      confirmNewPassword: form.confirmPassword,
    }

    console.log('📤 Changing password via /api/Users/change-password...')

    // USAR FETCH DIRECTAMENTE CON EL ENDPOINT CORRECTO
    const response = await fetch(
      'https://service.voyager.andrescortes.dev/api/Users/change-password',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('authToken')}`,
        },
        body: JSON.stringify(changeData),
      },
    )

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.message || `HTTP error! status: ${response.status}`)
    }

    const result = await response.json()
    console.log('✅ Password changed successfully:', result)

    toast.lumos('Password changed successfully! 🎉', {
      title: '🔐 Success',
      duration: 4000,
    })

    // Limpiar formulario
    form.currentPassword = ''
    form.newPassword = ''
    form.confirmPassword = ''

    emit('success')
  } catch (error) {
    console.error('❌ Password change error:', error)

    // Manejo específico de errores
    if (error.response?.status === 401) {
      throw new Error('Current password is incorrect')
    } else if (error.response?.data?.message) {
      throw new Error(error.response.data.message)
    } else if (error.message?.includes('Network Error')) {
      throw new Error('Network error. Please check your connection and try again.')
    } else {
      throw new Error(error.message || 'Failed to change password. Please try again.')
    }
  }
}

const handleUpdateError = (error) => {
  let errorMessage = 'Failed to update password. Please try again.'

  if (error.response) {
    const apiError = error.response.data
    if (apiError.message) {
      errorMessage = apiError.message
    } else if (apiError.errors) {
      const firstError = Object.values(apiError.errors)[0]
      errorMessage = Array.isArray(firstError) ? firstError[0] : firstError
    }
  } else if (error.request) {
    errorMessage = 'Network error. Please check your connection and try again.'
  } else {
    errorMessage = error.message || 'Failed to update password. Please try again.'
  }

  toast.expelliarmus(errorMessage, {
    title: '⚡ Error',
    duration: 5000,
  })
}

const verifyResetFlow = () => {
  if (isResetFlow.value && props.isStandalone) {
    const userEmail = localStorage.getItem('verifiedEmail')
    const requiresChange = localStorage.getItem('requiresPasswordChange')

    console.log('🔍 Verifying reset flow:')
    console.log('  - Email:', userEmail)
    console.log('  - Token:', requiresChange)

    if (!requiresChange || requiresChange === 'null' || !userEmail) {
      console.log('❌ Invalid reset flow - redirecting')
      toast.expelliarmus('Invalid reset password flow. Redirecting...', {
        title: '⚡ Invalid Flow',
        duration: 3000,
      })
      setTimeout(() => {
        router.push('/forgot-password')
      }, 3000)
    }
  }
}

// Watchers
watch(() => form.newPassword, validatePassword)
watch(() => form.confirmPassword, validatePassword)

// Lifecycle hooks
onMounted(() => {
  if (props.isStandalone) {
    verifyResetFlow()
  }
})
</script>

<style>
.material-symbols-outlined {
  font-variation-settings:
    'FILL' 0,
    'wght' 400,
    'GRAD' 0,
    'opsz' 24;
}
</style>
