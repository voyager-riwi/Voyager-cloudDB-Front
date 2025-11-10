<template>
  <div class="bg-[#101c22] relative flex min-h-screen w-full flex-col font-display text-white">
    <!-- Top App Bar -->
    <header class="flex items-center p-4">
      <button @click="goBack" class="flex size-10 items-center justify-center text-white">
        <span class="material-symbols-outlined text-2xl">arrow_back</span>
      </button>
      <h1 class="flex-1 text-center text-lg font-bold text-white">Verify Your Identity</h1>
      <div class="size-10"></div>
    </header>

    <main class="flex flex-1 flex-col items-center justify-center px-4 pb-8 pt-4">
      <div class="w-full max-w-md">
        <!-- Headline Text -->
        <h2 class="text-center text-3xl font-bold tracking-tight text-white">Check Your Email</h2>

        <!-- Body Text -->
        <p class="mt-2 text-center text-base text-gray-300">
          We've sent a 6-digit verification code to
          <span class="font-semibold text-blue-300">{{ userEmail }}</span>
        </p>

        <!-- Success Message Area -->
        <div class="mt-4 flex h-6 items-center justify-center">
          <!-- Las notificaciones mágicas reemplazan este mensaje -->
        </div>

        <!-- Confirmation Code Input -->
        <div class="mt-6">
          <fieldset class="flex justify-center gap-2 sm:gap-4">
            <input
              v-for="(digit, index) in verificationCode"
              :key="index"
              v-model="verificationCode[index]"
              ref="codeInputs"
              @input="handleInput(index, $event)"
              @keydown="handleKeydown(index, $event)"
              @paste="handlePaste($event)"
              class="h-14 w-12 rounded border border-gray-600 bg-[#192b33] text-center text-2xl font-semibold text-white [appearance:textfield] focus:border-blue-500 focus:ring-blue-500"
              maxlength="1"
              type="text"
              inputmode="numeric"
              pattern="[0-9]*"
              :disabled="loading"
            />
          </fieldset>
        </div>

        <!-- Error Message Area -->
        <div class="mt-4 flex h-6 items-center justify-center">
          <p v-if="error" class="text-sm text-red-400">{{ error }}</p>
        </div>

        <!-- Primary CTA Button -->
        <div class="mt-6">
          <button
            @click="verifyCode"
            :disabled="!isCodeComplete || loading"
            class="h-12 w-full rounded-lg bg-blue-500 text-base font-bold text-white transition-colors hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-[#101c22] disabled:cursor-not-allowed disabled:bg-blue-500/50"
          >
            <span v-if="loading" class="flex items-center justify-center gap-2">
              <div class="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
              Verifying...
            </span>
            <span v-else>Verify Code</span>
          </button>
        </div>

        <!-- Meta Text / Secondary Action -->
        <div class="mt-6 text-center">
          <p class="text-sm text-gray-400">
            Didn't receive a code?
            <a
              @click="resendCode"
              :disabled="loading"
              class="font-semibold text-blue-400 hover:text-blue-300 hover:underline cursor-pointer disabled:text-gray-500 disabled:cursor-not-allowed"
            >
              Resend
            </a>
          </p>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, computed, nextTick, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useMagicToast } from '@/composables/useMagicToast'
import api from '@/services/api'

const router = useRouter()
const toast = useMagicToast()

// Estados reactivos
const verificationCode = ref(['', '', '', '', '', ''])
const codeInputs = ref([])
const loading = ref(false)
const error = ref('')

// Obtener el email del localStorage
const userEmail = ref(localStorage.getItem('resetEmail') || '')

// Computed
const isCodeComplete = computed(() => {
  return verificationCode.value.every((digit) => digit !== '')
})

const fullCode = computed(() => {
  return verificationCode.value.join('')
})

// Métodos
const goBack = () => {
  router.back()
}

const handleInput = (index, event) => {
  const value = event.target.value

  // Solo permitir números
  if (!/^\d*$/.test(value)) {
    verificationCode.value[index] = ''
    return
  }

  // Si se ingresó un dígito, mover foco al siguiente
  if (value && index < 5) {
    nextTick(() => {
      codeInputs.value[index + 1]?.focus()
    })
  }

  // Verificar si el código está completo
  if (isCodeComplete.value) {
    // Auto-verificar cuando el código esté completo
    verifyCode()
  }
}

const handleKeydown = (index, event) => {
  // Manejar tecla Backspace
  if (event.key === 'Backspace' && !verificationCode.value[index] && index > 0) {
    nextTick(() => {
      codeInputs.value[index - 1]?.focus()
    })
  }

  // Manejar tecla ArrowLeft
  if (event.key === 'ArrowLeft' && index > 0) {
    event.preventDefault()
    codeInputs.value[index - 1]?.focus()
  }

  // Manejar tecla ArrowRight
  if (event.key === 'ArrowRight' && index < 5) {
    event.preventDefault()
    codeInputs.value[index + 1]?.focus()
  }
}

const handlePaste = (event) => {
  event.preventDefault()
  const pasteData = event.clipboardData?.getData('text') || ''
  const numbers = pasteData.replace(/\D/g, '').slice(0, 6)

  numbers.split('').forEach((char, index) => {
    if (index < 6) {
      verificationCode.value[index] = char
    }
  })

  // Mover foco al último campo llenado
  const lastFilledIndex = Math.min(numbers.length, 5)
  nextTick(() => {
    codeInputs.value[lastFilledIndex]?.focus()
  })
}

const verifyCode = async () => {
  if (!isCodeComplete.value) {
    error.value = 'Please enter the complete verification code'
    return
  }

  loading.value = true
  error.value = ''

  try {
    const emailFromStorage = localStorage.getItem('resetEmail')
    const verificationToken = fullCode.value

    console.log('=== VERIFY CODE ===')
    console.log('📧 Email:', emailFromStorage)
    console.log('🔐 Code:', verificationToken)

    if (!emailFromStorage) {
      error.value = 'No email found. Please start over.'
      return
    }

    // Guardar los datos para ChangePassword
    localStorage.setItem('requiresPasswordChange', verificationToken)
    localStorage.setItem('verifiedEmail', emailFromStorage)

    console.log('💾 Saved for change-password:')
    console.log('  - Token:', verificationToken)
    console.log('  - Email:', emailFromStorage)

    console.log('✅ Code accepted, redirecting to change password...')

    toast.lumos('Verification successful! Please set your new password. 🔐', {
      title: '✅ Code Verified',
      duration: 3000,
    })

    setTimeout(() => {
      router.push('/change-password')
    }, 1500)
  } catch (err) {
    console.error('❌ Verification error:', err)
    error.value = 'Invalid verification code. Please try again.'

    toast.expelliarmus('Invalid verification code. Please try again.', {
      title: '⚡ Verification Failed',
      duration: 4000,
    })

    resetCode()
  } finally {
    loading.value = false
  }
}

const resendCode = async () => {
  loading.value = true
  error.value = ''

  try {
    const emailFromStorage = localStorage.getItem('resetEmail')
    console.log('📧 Email from localStorage:', emailFromStorage)

    if (!emailFromStorage) {
      error.value = 'No email found. Please start the process again.'
      toast.expelliarmus('No email found. Please start the process again.', {
        duration: 4000,
      })
      return
    }

    console.log('🔄 Resending verification code to:', emailFromStorage)

    await api.auth.forgotPassword({
      email: emailFromStorage,
    })

    console.log('✅ Resend successful')

    toast.lumos('Verification code has been resent to your email! 📧', {
      title: '✉️ Code Resent',
      duration: 5000,
    })

    resetCode()
  } catch (err) {
    console.error('❌ Resend Error:', err)

    let errorMessage = 'Failed to resend code. Please try again.'

    if (err.response?.status === 429) {
      errorMessage = 'Too many resend attempts. Please try again later.'
    } else if (err.response?.status === 404) {
      errorMessage = 'Email address not found.'
    } else if (err.response?.data?.message) {
      errorMessage = err.response.data.message
    } else if (err.code === 'ERR_NETWORK') {
      errorMessage = 'Network error. Please check your connection and try again.'
    }

    error.value = errorMessage

    toast.expelliarmus(errorMessage, {
      title: '⚡ Resend Failed',
      duration: 5000,
    })
  } finally {
    loading.value = false
  }
}

const resetCode = () => {
  verificationCode.value = ['', '', '', '', '', '']
  nextTick(() => {
    codeInputs.value[0]?.focus()
  })
}

// Lifecycle
onMounted(() => {
  const emailFromStorage = localStorage.getItem('resetEmail')
  console.log('🔍 On mounted - Email from storage:', emailFromStorage)

  if (!emailFromStorage) {
    error.value = 'No email found. Please start the password reset process again.'
    toast.expelliarmus('No email found. Please start the password reset process again.', {
      title: '⚡ Missing Email',
      duration: 5000,
    })
    return
  }

  // Actualizar el ref para mostrar el email correcto
  userEmail.value = emailFromStorage

  // Enfocar el primer input
  nextTick(() => {
    codeInputs.value[0]?.focus()
  })

  console.log('✅ Recovery form ready for email:', emailFromStorage)
})
</script>
