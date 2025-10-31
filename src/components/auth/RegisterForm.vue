<template>
  <div
    class="relative flex h-auto min-h-screen w-full flex-col overflow-x-hidden bg-background-light dark:bg-background-dark font-display"
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
              <LoadingSpinner />
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

<script>
import { ref, computed, watch } from 'vue'
import { useRouter } from 'vue-router'
import LoadingSpinner from '@/components/common/LoadingSpinner.vue'

export default {
  name: 'RegisterForm',
  components: {
    LoadingSpinner,
  },
  setup() {
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
    const showSuccess = ref(false)
    const error = ref('')
    const success = ref('')

    const passwordMismatch = computed(() => {
      return (
        form.value.password &&
        form.value.confirmPassword &&
        form.value.password !== form.value.confirmPassword
      )
    })

    // Watch for password changes to clear mismatch error
    watch([() => form.value.password, () => form.value.confirmPassword], () => {
      if (form.value.password === form.value.confirmPassword) {
        error.value = ''
      }
    })

    const togglePasswordVisibility = () => {
      showPassword.value = !showPassword.value
    }

    const toggleConfirmPasswordVisibility = () => {
      showConfirmPassword.value = !showConfirmPassword.value
    }

    const handleSubmit = async () => {
      if (passwordMismatch.value) {
        error.value = 'Passwords do not match'
        return
      }

      if (!form.value.agreeToTerms) {
        error.value = 'Please agree to the terms and conditions'
        return
      }

      // Reset messages
      error.value = ''
      success.value = ''
      isSubmitting.value = true

      try {
        console.log('Sending registration data:', {
          firstName: form.value.firstName,
          lastName: form.value.lastName,
          email: form.value.email,
          password: '***', // Don't log actual password
        })

        const response = await fetch('https://service.voyager.andrescortes.dev/api/Auth/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
          body: JSON.stringify({
            firstName: form.value.firstName.trim(),
            lastName: form.value.lastName.trim(),
            email: form.value.email.trim(),
            password: form.value.password,
          }),
        })

        console.log('Response status:', response.status)

        const data = await response.json()
        console.log('Response data:', data)

        if (!response.ok) {
          // Handle different types of errors
          if (response.status === 400) {
            throw new Error(data.message || 'Invalid data. Please check your information.')
          } else if (response.status === 409) {
            throw new Error('An account with this email already exists.')
          } else if (response.status === 500) {
            throw new Error('Server error. Please try again later.')
          } else {
            const errorMessage = data.message || data.error || 'Registration failed'
            throw new Error(errorMessage)
          }
        }

        // Registration successful
        success.value = 'Account created successfully! Please check your email for verification.'

        // Show success overlay
        showSuccess.value = true

        // Store user data if provided
        if (data.user) {
          localStorage.setItem('user', JSON.stringify(data.user))
        }
      } catch (err) {
        error.value = err.message
        console.error('Registration error:', err)
      } finally {
        isSubmitting.value = false
      }
    }

    const goBack = () => {
      router.back()
    }

    const navigateToLogin = () => {
      router.push('/login')
    }

    const navigateToTerms = () => {
      // Navigate to terms page or open modal
      router.push('/terms')
    }

    const navigateToPrivacy = () => {
      // Navigate to privacy policy page or open modal
      router.push('/privacy')
    }

    return {
      form,
      showPassword,
      showConfirmPassword,
      isSubmitting,
      showSuccess,
      error,
      success,
      passwordMismatch,
      togglePasswordVisibility,
      toggleConfirmPasswordVisibility,
      handleSubmit,
      goBack,
      navigateToLogin,
      navigateToTerms,
      navigateToPrivacy,
    }
  },
}
</script>

<style scoped>
/* Estilos específicos del componente si son necesarios */
</style>
