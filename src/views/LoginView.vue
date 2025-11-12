<template>
  <LoginForm />
</template>

<script>
import LoginForm from '@/components/auth/LoginForm.vue'
import { useRoute, useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

export default {
  name: 'LoginView',
  components: {
    LoginForm,
  },
  setup() {
    const route = useRoute()
    const router = useRouter()
    const authStore = useAuthStore()

    const handleLogin = async (credentials) => {
      try {
        await authStore.login(credentials)

        // Redirigir a la ruta intentada o al dashboard por defecto
        const redirectPath = route.query.redirect || '/dashboard'
        router.push(redirectPath)
      } catch (error) {
        console.error('Error en login:', error)
        // El error ya está manejado en el store, pero puedes agregar lógica adicional aquí
      }
    }

    return {
      handleLogin,
    }
  },
}
</script>
