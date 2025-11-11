<template>
  <div
    class="relative flex h-auto min-h-screen w-full flex-col overflow-x-hidden bg-black dark:bg-background-dark font-display"
  >
    <!-- Top App Bar -->
    <div class="flex items-center p-4 pb-2 bg-background-light dark:bg-background-dark">
      <button
        class="text-slate-800 dark:text-white flex size-12 shrink-0 items-center justify-start hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
        @click="goBack"
      >
        <span class="material-symbols-outlined">arrow_back</span>
      </button>
      <h2
        class="text-slate-900 dark:text-white text-lg font-bold leading-tight tracking-[-0.015em] flex-1 text-center pr-12"
      >
        Create Account
      </h2>
    </div>

    <main class="flex-1 px-4 py-6 flex flex-col">
      <!-- Headline -->
      <h1
        class="text-slate-900 dark:text-white tracking-tight text-[32px] font-bold leading-tight text-left pb-1"
      >
        Get Started with CrudCloudDb
      </h1>

      <!-- Body Text -->
      <p class="text-slate-600 dark:text-slate-400 text-base font-normal leading-normal pb-6">
        Manage your cloud databases with ease.
      </p>

      <!-- Error Message -->
      <div
        v-if="error"
        class="bg-red-500/20 border border-red-500 text-red-700 dark:text-red-300 px-4 py-3 rounded mb-4 text-sm"
      >
        {{ error }}
      </div>

      <!-- Success Message -->
      <div
        v-if="success"
        class="bg-green-500/20 border border-green-500 text-green-700 dark:text-green-300 px-4 py-3 rounded mb-4 text-sm"
      >
        {{ success }}
      </div>

      <!-- Form -->
      <form @submit.prevent="handleSubmit" class="flex flex-col gap-4">
        <!-- First Name Field -->
        <label class="flex flex-col min-w-40 flex-1">
          <p class="text-slate-800 dark:text-white text-base font-medium leading-normal pb-2">
            First Name
          </p>
          <input
            v-model="form.firstName"
            autocomplete="given-name"
            class="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-slate-900 dark:text-white focus:outline-0 focus:ring-2 focus:ring-primary/50 border border-slate-300 dark:border-[#325567] bg-white dark:bg-[#192b33] focus:border-primary dark:focus:border-primary h-14 placeholder:text-slate-400 dark:placeholder:text-[#92b7c9] p-[15px] text-base font-normal leading-normal"
            placeholder="Enter your first name"
            type="text"
            required
            :disabled="isSubmitting"
          />
        </label>

        <!-- Last Name Field -->
        <label class="flex flex-col min-w-40 flex-1">
          <p class="text-slate-800 dark:text-white text-base font-medium leading-normal pb-2">
            Last Name
          </p>
          <input
            v-model="form.lastName"
            autocomplete="family-name"
            class="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-slate-900 dark:text-white focus:outline-0 focus:ring-2 focus:ring-primary/50 border border-slate-300 dark:border-[#325567] bg-white dark:bg-[#192b33] focus:border-primary dark:focus:border-primary h-14 placeholder:text-slate-400 dark:placeholder:text-[#92b7c9] p-[15px] text-base font-normal leading-normal"
            placeholder="Enter your last name"
            type="text"
            required
            :disabled="isSubmitting"
          />
        </label>

        <!-- Email Field -->
        <label class="flex flex-col min-w-40 flex-1">
          <p class="text-slate-800 dark:text-white text-base font-medium leading-normal pb-2">
            Email Address
          </p>
          <input
            v-model="form.email"
            autocomplete="email"
            class="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-slate-900 dark:text-white focus:outline-0 focus:ring-2 focus:ring-primary/50 border border-slate-300 dark:border-[#325567] bg-white dark:bg-[#192b33] focus:border-primary dark:focus:border-primary h-14 placeholder:text-slate-400 dark:placeholder:text-[#92b7c9] p-[15px] text-base font-normal leading-normal"
            placeholder="Enter your email"
            type="email"
            required
            :disabled="isSubmitting"
          />
        </label>

        <!-- Password Field -->
        <label class="flex flex-col min-w-40 flex-1">
          <p class="text-slate-800 dark:text-white text-base font-medium leading-normal pb-2">
            Password
          </p>
          <div class="flex w-full flex-1 items-stretch">
            <input
              v-model="form.password"
              :type="showPassword ? 'text' : 'password'"
              autocomplete="new-password"
              class="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-l-lg text-slate-900 dark:text-white focus:outline-0 focus:ring-2 focus:ring-primary/50 border border-slate-300 dark:border-[#325567] bg-white dark:bg-[#192b33] focus:border-primary dark:focus:border-primary h-14 placeholder:text-slate-400 dark:placeholder:text-[#92b7c9] p-[15px] border-r-0 text-base font-normal leading-normal"
              placeholder="8+ characters, one uppercase, one number"
              required
              :disabled="isSubmitting"
            />
            <button
              type="button"
              class="text-slate-500 dark:text-[#92b7c9] flex border border-slate-300 dark:border-[#325567] bg-white dark:bg-[#192b33] items-center justify-center pr-[15px] rounded-r-lg border-l-0 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
              @click="togglePasswordVisibility"
              :disabled="isSubmitting"
            >
              <span class="material-symbols-outlined cursor-pointer">
                {{ showPassword ? 'visibility_off' : 'visibility' }}
              </span>
            </button>
          </div>
        </label>

        <!-- Confirm Password Field -->
        <label class="flex flex-col min-w-40 flex-1">
          <p class="text-slate-800 dark:text-white text-base font-medium leading-normal pb-2">
            Confirm Password
          </p>
          <div class="flex w-full flex-1 items-stretch">
            <input
              v-model="form.confirmPassword"
              :type="showConfirmPassword ? 'text' : 'password'"
              autocomplete="new-password"
              class="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-l-lg text-slate-900 dark:text-white focus:outline-0 focus:ring-2 focus:ring-primary/50 border border-slate-300 dark:border-[#325567] bg-white dark:bg-[#192b33] focus:border-primary dark:focus:border-primary h-14 placeholder:text-slate-400 dark:placeholder:text-[#92b7c9] p-[15px] border-r-0 text-base font-normal leading-normal"
              placeholder="Re-enter your password"
              required
              :disabled="isSubmitting"
            />
            <button
              type="button"
              class="text-slate-500 dark:text-[#92b7c9] flex border border-slate-300 dark:border-[#325567] bg-white dark:bg-[#192b33] items-center justify-center pr-[15px] rounded-r-lg border-l-0 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
              @click="toggleConfirmPasswordVisibility"
              :disabled="isSubmitting"
            >
              <span class="material-symbols-outlined cursor-pointer">
                {{ showConfirmPassword ? 'visibility_off' : 'visibility' }}
              </span>
            </button>
          </div>
          <p v-if="passwordMismatch" class="text-red-500 text-sm mt-2">Passwords do not match</p>
        </label>

        <!-- Terms and Conditions Checkbox -->
        <div class="flex items-start gap-3 py-4">
          <input
            v-model="form.agreeToTerms"
            class="form-checkbox mt-1 h-5 w-5 rounded border-slate-400 dark:border-slate-500 bg-transparent text-primary focus:ring-primary focus:ring-offset-background-light dark:focus:ring-offset-background-dark"
            id="terms"
            type="checkbox"
            required
            :disabled="isSubmitting"
          />
          <label class="text-slate-600 dark:text-slate-400 text-sm" for="terms">
            I agree to the
            <a
              class="font-semibold text-primary hover:underline cursor-pointer"
              @click="navigateToTerms"
            >
              Terms & Conditions
            </a>
            and
            <a
              class="font-semibold text-primary hover:underline cursor-pointer"
              @click="navigateToPrivacy"
            >
              Privacy Policy </a
            >.
          </label>
        </div>

        <!-- Spacer -->
        <div class="flex-grow"></div>

        <!-- Action Button -->
        <div class="py-4">
          <button
            type="submit"
            :disabled="isSubmitting || passwordMismatch || !form.agreeToTerms"
            class="flex w-full items-center justify-center rounded-lg bg-primary h-14 text-white text-base font-bold leading-normal transition-all hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span v-if="isSubmitting" class="flex items-center gap-2">
              <!-- LoadingSpinner component removed since it's not defined -->
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
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              Creating Account...
            </span>
            <span v-else>Create Account</span>
          </button>
        </div>
      </form>

      <!-- Footer Link -->
      <p
        class="text-center text-slate-600 dark:text-slate-400 text-base font-normal leading-normal pb-4"
      >
        Already have an account?
        <a class="font-bold text-primary hover:underline cursor-pointer" @click="navigateToLogin">
          Log In
        </a>
      </p>
    </main>

    <!-- Success Message Overlay -->
    <div
      v-if="showSuccess"
      class="absolute inset-0 z-10 flex flex-col items-center justify-center bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-sm p-4 text-center"
    >
      <div class="flex items-center justify-center size-20 rounded-full bg-green-500/20 mb-6">
        <span class="material-symbols-outlined text-4xl text-green-500">mark_email_read</span>
      </div>
      <h2 class="text-2xl font-bold text-slate-900 dark:text-white mb-2">Check Your Email</h2>
      <p class="text-slate-600 dark:text-slate-400 max-w-sm mb-6">
        We've sent a verification link to your email address. Please click the link to activate your
        account.
      </p>
      <button
        class="flex items-center justify-center rounded-lg bg-primary h-12 px-6 text-white text-base font-bold leading-normal transition-opacity hover:opacity-90"
        @click="navigateToLogin"
      >
        Continue to Login
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import api from '@/services/api'

const router = useRouter()

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
  // Validación de contraseñas
  if (form.value.password !== form.value.confirmPassword) {
    error.value = 'Passwords do not match'
    return
  }

  if (!form.value.agreeToTerms) {
    error.value = 'You must agree to the terms and conditions'
    return
  }

  isSubmitting.value = true
  error.value = ''

  try {
    const registerData = {
      firstName: form.value.firstName,
      lastName: form.value.lastName,
      email: form.value.email,
      password: form.value.password,
    }

    console.log('Sending registration data:', registerData)

    const response = await api.auth.register(registerData)

    console.log('Registration response:', response)

    // Mostrar mensaje de éxito
    success.value = 'Account created successfully! Please check your email for verification.'
    showSuccess.value = true

    setTimeout(() => {
      router.push('/login?registered=true')
    }, 3000)
  } catch (err) {
    console.error('Registration error:', err)
    error.value =
      err.response?.data?.message || err.message || 'Registration failed. Please try again.'
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

const goBack = () => {
  router.back()
}

const navigateToLogin = () => {
  router.push('/login')
}

const navigateToTerms = () => {
  // Implementar navegación a términos y condiciones
  console.log('Navigate to terms and conditions')
}

const navigateToPrivacy = () => {
  // Implementar navegación a política de privacidad
  console.log('Navigate to privacy policy')
}
</script>
