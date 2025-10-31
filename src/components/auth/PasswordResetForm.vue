<template>
  <div class="forgot-password-page">
    <div
      class="relative flex min-h-screen w-full flex-col items-center justify-center bg-background-light dark:bg-background-dark p-4 group/design-root"
      style="font-family: 'Inter', sans-serif"
    >
      <div class="w-full max-w-md space-y-8">
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
                class="form-input h-12 w-full flex-1 rounded-lg border border-slate-300 bg-white p-3.5 pr-10 text-base text-slate-900 placeholder:text-slate-400 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 dark:border-slate-700 dark:bg-slate-900 dark:text-white dark:placeholder:text-slate-500"
                id="email"
                placeholder="Enter your registered email"
                type="email"
                v-model="email"
              />
              <span
                class="material-symbols-outlined absolute right-3 text-slate-400 dark:text-slate-500"
                style="font-size: 24px"
                >mail</span
              >
            </div>
          </div>
          <button
            class="flex h-12 w-full cursor-pointer items-center justify-center overflow-hidden rounded-lg bg-primary px-5 text-base font-bold text-white transition-colors hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 dark:focus:ring-offset-background-dark"
            @click="sendRecoveryEmail"
          >
            <span class="truncate">Send Recovery Email</span>
          </button>
        </div>
        <div class="text-center">
          <a
            class="inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 dark:focus:ring-offset-background-dark rounded-md"
            href="#"
            @click.prevent="goBack"
          >
            <span class="material-symbols-outlined" style="font-size: 20px">arrow_back</span>
            Back to Sign In
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ForgotPassword',
  data() {
    return {
      email: '',
    }
  },
  methods: {
    sendRecoveryEmail() {
      // Aquí iría la lógica para enviar el correo de recuperación
      console.log('Enviando correo de recuperación a:', this.email)
      // Ejemplo: this.$store.dispatch('auth/sendPasswordResetEmail', this.email);
    },
    goBack() {
      // Aquí iría la lógica para volver a la página de inicio de sesión
      console.log('Volviendo a la página de inicio de sesión')
      router.push('/login')
    },
  },
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined');

body {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  min-height: max(884px, 100dvh);
}
</style>
