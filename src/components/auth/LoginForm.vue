<!--min-h-screen flex items-center justify-center p-4 font-display bg-background-light dark:bg-background-dark font-display -->
<template>
  <div
    class="min-h-screen flex items-center justify-center p-4 font-display bg-black dark:bg-background-dark font-display"
  >
    <div class="w-full max-w-md">
      <!-- Logo y título -->
      <div class="text-center mb-12">
        <!-- Logo -->
        <div class="flex justify-center mb-8">
          <div class="symbol">
            <div class="deathly"></div>
            <div class="hallows"></div>
          </div>
        </div>

        <!-- Título con elementos decorativos -->
        <div class="flex items-center justify-center gap-3 mb-4">
          <img src="@/assets/images/diamonds.svg" alt="" class="text-gray-500 w-5 h-5" />
          <h1 class="text-2xl text-white font-serif tracking-wide">Iniciar sesión</h1>
          <img src="@/assets/images/diamonds.svg" alt="" class="text-gray-500 w-5 h-5" />
        </div>
      </div>

      <!-- Formulario de login -->
      <form @submit.prevent="handleLogin" class="space-y-8">
        <!-- Mensaje de error -->
        <div
          v-if="error"
          class="bg-red-500/20 border border-red-500 text-white px-4 py-3 rounded text-sm"
        >
          ❌ {{ error }}
        </div>

        <!-- Mensaje de éxito -->
        <div
          v-if="success"
          class="bg-green-500/20 border border-green-500 text-white px-4 py-3 rounded text-sm"
        >
          ✅ {{ success }}
        </div>

        <!-- Campo Email -->
        <div class="space-y-3">
          <label class="block text-white text-sm font-medium tracking-wider uppercase">
            DIRECCIÓN DE CORREO ELECTRÓNICO
          </label>
          <input
            v-model="email"
            type="email"
            required
            placeholder="Ingresa tu correo electrónico"
            class="w-full bg-transparent border border-gray-600 text-white px-4 py-4 rounded-none focus:outline-none focus:border-gray-400 transition-colors placeholder-gray-500"
            :disabled="loading"
          />
        </div>

        <!-- Campo Contraseña -->
        <div class="space-y-3">
          <label class="block text-white text-sm font-medium tracking-wider uppercase">
            CONTRASEÑA
          </label>
          <div class="relative">
            <input
              v-model="password"
              :type="showPassword ? 'text' : 'password'"
              required
              placeholder="Ingresa tu contraseña"
              class="w-full bg-transparent border border-gray-600 text-white px-4 py-4 pr-12 rounded-none focus:outline-none focus:border-gray-400 transition-colors placeholder-gray-500"
              :disabled="loading"
            />
            <button
              type="button"
              @click="showPassword = !showPassword"
              class="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:text-gray-300 transition-colors"
              :disabled="loading"
            >
              <svg width="20px" height="20px" viewBox="0 0 32 32">
                <path
                  fill="#ffffff"
                  d="M10.25,2.97h1.5V0h-1.5V2.97Zm6.61,2.11l1.06,1.06,2.1-2.1-1.06-1.06-2.1,2.1Zm2.1,15.93l-2.1-2.1,1.06-1.06,2.1,2.1-1.06,1.06Zm-8.71,2.98h1.5v-2.97h-1.5v2.97ZM1.98,4.05l2.1,2.1,1.06-1.06L3.04,2.98l-1.06,1.06Zm1.06,16.97l-1.06-1.06,2.1-2.1,1.06,1.06-2.1,2.1Zm7.96-5.27c-.28,0-.54-.11-.74-.31l-2.7-2.7c-.2-.2-.31-.46-.31-.74s.11-.54,.31-.74l2.7-2.7c.39-.39,1.09-.4,1.48,0l2.7,2.7c.2,.2,.31,.46,.31,.74s-.11,.54-.31,.74l-2.71,2.71c-.19,.2-.46,.31-.74,.31Zm0-1.69l-2.06-2.06,2.06-2.06,2.06,2.06-2.06,2.06ZM.43,12.49c.2,.23,4.95,5.59,10.56,5.59s10.37-5.36,10.56-5.59l.43-.49-.43-.49c-.2-.23-4.96-5.59-10.56-5.59S.63,11.28,.43,11.51l-.43,.49,.43,.49Zm10.56,4.09c-3.99,0-7.69-3.31-8.97-4.58,1.28-1.28,4.96-4.58,8.97-4.58s7.69,3.31,8.96,4.58c-1.27,1.28-4.96,4.58-8.96,4.58Z"
                ></path>
              </svg>
            </button>
          </div>
        </div>

        <!-- Enlace de contraseña olvidada -->
        <div class="text-center">
          <a
            @click="$router.push('/reset')"
            class="text-white text-base underline hover:text-gray-300 transition-colors"
          >
            ¿Has olvidado tu contraseña?
          </a>
        </div>

        <!-- Botón de enviar -->
        <button
          type="submit"
          :disabled="loading"
          class="w-full bg-[#5b5fef] text-white font-bold text-base tracking-wider py-4 hover:bg-[#4a4ed8] transition-colors disabled:opacity-50 disabled:cursor-not-allowed uppercase flex items-center justify-center gap-2"
        >
          <span
            v-if="loading"
            class="animate-spin rounded-full h-4 w-4 border-b-2 border-white"
          ></span>
          {{ loading ? 'INICIANDO SESIÓN...' : 'INICIAR SESIÓN' }}
        </button>
      </form>

      <!-- Separador decorativo -->
      <div class="mt-12 mb-8">
        <div class="flex items-center justify-center gap-4">
          <div class="flex-1 h-px bg-gray-700"></div>
          <div class="w-2 h-2 bg-gray-600 rounded-full"></div>
          <div class="flex-1 h-px bg-gray-700"></div>
        </div>
      </div>

      <!-- Enlace de registro -->
      <div class="text-center">
        <p class="text-gray-400 text-base mb-4">¿No tienes una cuenta?</p>
        <button
          @click="$router.push('/register')"
          class="w-full bg-transparent border border-white rounded-full py-3 px-11 text-white text-sm font-black uppercase tracking-[1.63px] leading-[14px] text-center transition-all duration-100 ease-in hover:bg-white hover:text-black focus:outline-none relative box-border"
        >
          Regístrate aquí
        </button>
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
const password = ref('')
const loading = ref(false)
const error = ref('')

const handleLogin = async () => {
  loading.value = true
  error.value = ''

  try {
    const response = await api.auth.login({
      email: email.value,
      password: password.value,
    })

    // Guardar token y datos de usuario
    if (response.data?.token) {
      localStorage.setItem('authToken', response.data.token)
      localStorage.setItem('user', JSON.stringify(response.data))
    }

    // Redirigir al dashboard
    router.push('/dashboard')
  } catch (err) {
    error.value = err.message
  } finally {
    loading.value = false
  }
}
</script>
