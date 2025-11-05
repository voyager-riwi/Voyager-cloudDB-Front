<template>
  <div
    class="relative flex h-auto min-h-screen w-full flex-col bg-background-light dark:bg-background-dark font-display overflow-x-hidden"
  >
    <!-- TopAppBar -->
    <div
      class="flex items-center bg-background-light dark:bg-background-dark p-4 pb-2 justify-between sticky top-0 z-10 border-b border-white/5"
    >
      <button
        @click="goBack"
        class="text-slate-800 dark:text-white flex size-12 shrink-0 items-center justify-center hover:bg-white/10 rounded-full transition-colors"
      >
        <span class="material-symbols-outlined text-2xl">arrow_back</span>
      </button>
      <h1
        class="text-slate-900 dark:text-white text-lg font-bold leading-tight tracking-[-0.015em] flex-1 text-center"
      >
        {{ database.name }}
      </h1>
      <div class="flex size-12 shrink-0 items-center"></div>
    </div>

    <main class="p-4 space-y-8">
      <!-- Status Chip -->
      <div class="flex">
        <div
          class="flex h-8 shrink-0 items-center justify-center gap-x-2 rounded-full px-4"
          :class="statusClasses"
        >
          <span class="material-symbols-outlined text-base" :class="statusIconClasses">{{
            statusIcon
          }}</span>
          <p class="text-sm font-medium leading-normal" :class="statusTextClasses">
            {{ database.status }}
          </p>
        </div>
      </div>

      <!-- Database Details Card -->
      <section>
        <h2
          class="text-slate-900 dark:text-white tracking-light text-[28px] font-bold leading-tight text-left pb-3"
        >
          Database Details
        </h2>
        <div class="bg-white dark:bg-[#111c22] rounded-xl shadow-sm">
          <div class="p-4 grid grid-cols-[35%_1fr] md:grid-cols-[20%_1fr] gap-x-6">
            <div
              class="col-span-2 grid grid-cols-subgrid border-t border-slate-200 dark:border-t-[#325567] py-5"
            >
              <p class="text-slate-500 dark:text-[#92b7c9] text-sm font-normal leading-normal">
                Region
              </p>
              <p class="text-slate-900 dark:text-white text-sm font-normal leading-normal">
                {{ database.region }}
              </p>
            </div>
            <div
              class="col-span-2 grid grid-cols-subgrid border-t border-slate-200 dark:border-t-[#325567] py-5"
            >
              <p class="text-slate-500 dark:text-[#92b7c9] text-sm font-normal leading-normal">
                Motor & Version
              </p>
              <p class="text-slate-900 dark:text-white text-sm font-normal leading-normal">
                {{ database.engine }} {{ database.version }}
              </p>
            </div>
            <div
              class="col-span-2 grid grid-cols-subgrid border-t border-slate-200 dark:border-t-[#325567] py-5"
            >
              <p class="text-slate-500 dark:text-[#92b7c9] text-sm font-normal leading-normal">
                Plan
              </p>
              <p class="text-slate-900 dark:text-white text-sm font-normal leading-normal">
                {{ database.plan }}
              </p>
            </div>
            <div
              class="col-span-2 grid grid-cols-subgrid border-t border-slate-200 dark:border-t-[#325567] py-5"
            >
              <p class="text-slate-500 dark:text-[#92b7c9] text-sm font-normal leading-normal">
                Creation Date
              </p>
              <p class="text-slate-900 dark:text-white text-sm font-normal leading-normal">
                {{ formatDate(database.createdAt) }}
              </p>
            </div>
          </div>
        </div>
      </section>

      <!-- Connection Credentials Card -->
      <section>
        <h2
          class="text-slate-900 dark:text-white tracking-light text-[28px] font-bold leading-tight text-left pb-3"
        >
          Connection Credentials
        </h2>
        <div class="bg-white dark:bg-[#111c22] rounded-xl shadow-sm p-4 space-y-4">
          <!-- Security Warning -->
          <div class="flex items-start gap-3 p-3 rounded-lg bg-amber-500/10">
            <span class="material-symbols-outlined text-amber-500 mt-0.5">warning</span>
            <p class="text-amber-700 dark:text-amber-400 text-sm">
              Handle credentials securely. The password can only be revealed once per session for
              security reasons.
            </p>
          </div>

          <!-- Credentials List -->
          <div class="grid grid-cols-1 divide-y divide-slate-200 dark:divide-[#325567]">
            <!-- Host -->
            <div class="flex justify-between items-center py-4">
              <span class="text-slate-500 dark:text-[#92b7c9] text-sm">Host</span>
              <div class="flex items-center gap-2">
                <p class="text-slate-900 dark:text-white text-sm font-mono">
                  {{ credentials.host }}
                </p>
                <button
                  @click="copyToClipboard(credentials.host)"
                  class="text-slate-500 dark:text-[#92b7c9] hover:text-primary transition-colors"
                >
                  <span class="material-symbols-outlined text-base">content_copy</span>
                </button>
              </div>
            </div>

            <!-- Port -->
            <div class="flex justify-between items-center py-4">
              <span class="text-slate-500 dark:text-[#92b7c9] text-sm">Port</span>
              <div class="flex items-center gap-2">
                <p class="text-slate-900 dark:text-white text-sm font-mono">
                  {{ credentials.port }}
                </p>
                <button
                  @click="copyToClipboard(credentials.port.toString())"
                  class="text-slate-500 dark:text-[#92b7c9] hover:text-primary transition-colors"
                >
                  <span class="material-symbols-outlined text-base">content_copy</span>
                </button>
              </div>
            </div>

            <!-- Username -->
            <div class="flex justify-between items-center py-4">
              <span class="text-slate-500 dark:text-[#92b7c9] text-sm">Username</span>
              <div class="flex items-center gap-2">
                <p class="text-slate-900 dark:text-white text-sm font-mono">
                  {{ credentials.username }}
                </p>
                <button
                  @click="copyToClipboard(credentials.username)"
                  class="text-slate-500 dark:text-[#92b7c9] hover:text-primary transition-colors"
                >
                  <span class="material-symbols-outlined text-base">content_copy</span>
                </button>
              </div>
            </div>

            <!-- Database Name -->
            <div class="flex justify-between items-center py-4">
              <span class="text-slate-500 dark:text-[#92b7c9] text-sm">DB Name</span>
              <div class="flex items-center gap-2">
                <p class="text-slate-900 dark:text-white text-sm font-mono">
                  {{ credentials.databaseName }}
                </p>
                <button
                  @click="copyToClipboard(credentials.databaseName)"
                  class="text-slate-500 dark:text-[#92b7c9] hover:text-primary transition-colors"
                >
                  <span class="material-symbols-outlined text-base">content_copy</span>
                </button>
              </div>
            </div>

            <!-- Password -->
            <div class="flex justify-between items-center py-4">
              <span class="text-slate-500 dark:text-[#92b7c9] text-sm">Password</span>
              <div class="flex items-center gap-2">
                <p class="text-slate-900 dark:text-white text-sm font-mono tracking-widest">
                  {{ showPassword ? credentials.password : '••••••••••••••••' }}
                </p>
                <button
                  @click="togglePasswordVisibility"
                  class="flex items-center gap-2 text-sm font-medium transition-colors"
                  :class="showPassword ? 'text-amber-500' : 'text-primary'"
                >
                  <span class="material-symbols-outlined text-base">
                    {{ showPassword ? 'visibility_off' : 'visibility' }}
                  </span>
                  {{ showPassword ? 'Hide' : 'Reveal' }}
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Actions -->
      <section class="space-y-4 pt-4">
        <button
          @click="rotateCredentials"
          class="w-full flex items-center justify-center gap-2 h-12 px-6 font-semibold rounded-lg bg-[#1193d4]/20 text-[#1193d4] dark:bg-[#1193d4]/20 dark:text-[#1193d4] hover:bg-[#1193d4]/30 transition-colors"
        >
          <span class="material-symbols-outlined">refresh</span>
          Rotate Credentials
        </button>

        <button
          @click="deleteDatabase"
          class="w-full flex items-center justify-center gap-2 h-12 px-6 font-semibold rounded-lg bg-red-500/10 text-red-600 dark:bg-red-500/20 dark:text-red-400 hover:bg-red-500/20 dark:hover:bg-red-500/30 transition-colors"
        >
          <span class="material-symbols-outlined">delete</span>
          Delete Database
        </button>
      </section>
    </main>

    <div class="h-10"></div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import api from '@/services/api'

const router = useRouter()
const route = useRoute()

// Estados reactivos
const database = ref({
  id: '',
  name: '',
  status: '',
  region: '',
  engine: '',
  version: '',
  plan: '',
  createdAt: '',
  ram: '',
})

const credentials = ref({
  host: '',
  port: 5432,
  username: '',
  databaseName: '',
  password: '',
})

const showPassword = ref(false)
const loading = ref(false)

// Computed properties para estilos dinámicos
const statusClasses = computed(() => {
  const status = database.value.status?.toLowerCase()
  switch (status) {
    case 'active':
      return 'bg-green-500/20 dark:bg-[#233c48]'
    case 'pending':
      return 'bg-amber-500/20 dark:bg-amber-500/20'
    case 'error':
      return 'bg-red-500/20 dark:bg-red-500/20'
    default:
      return 'bg-gray-500/20 dark:bg-gray-500/20'
  }
})

const statusIconClasses = computed(() => {
  const status = database.value.status?.toLowerCase()
  switch (status) {
    case 'active':
      return 'text-green-500 dark:text-white'
    case 'pending':
      return 'text-amber-500 dark:text-amber-400'
    case 'error':
      return 'text-red-500 dark:text-red-400'
    default:
      return 'text-gray-500 dark:text-gray-400'
  }
})

const statusTextClasses = computed(() => {
  const status = database.value.status?.toLowerCase()
  switch (status) {
    case 'active':
      return 'text-green-700 dark:text-white'
    case 'pending':
      return 'text-amber-700 dark:text-amber-400'
    case 'error':
      return 'text-red-700 dark:text-red-400'
    default:
      return 'text-gray-700 dark:text-gray-400'
  }
})

const statusIcon = computed(() => {
  const status = database.value.status?.toLowerCase()
  switch (status) {
    case 'active':
      return 'check_circle'
    case 'pending':
      return 'schedule'
    case 'error':
      return 'error'
    default:
      return 'help'
  }
})

// Métodos
const goBack = () => {
  router.back()
}

const togglePasswordVisibility = () => {
  showPassword.value = !showPassword.value
}

const copyToClipboard = async (text) => {
  try {
    await navigator.clipboard.writeText(text)
    // Aquí podrías agregar un toast de éxito
    console.log('Copied to clipboard:', text)
  } catch (err) {
    console.error('Failed to copy:', err)
  }
}

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })
}

const rotateCredentials = async () => {
  if (loading.value) return

  // Confirmación antes de rotar credenciales
  if (
    !confirm(
      'Are you sure you want to rotate the credentials? This will generate a new password and the old one will no longer work.',
    )
  ) {
    return
  }

  loading.value = true

  try {
    console.log('🔄 Rotating credentials for database:', database.value.id)

    // Llamar al endpoint correcto según tu configuración
    const response = await api.databases.resetPassword(database.value.id)
    console.log('✅ API Response:', response.data)

    // Manejar diferentes estructuras de respuesta
    let newPassword = ''

    if (response.data.newPassword) {
      newPassword = response.data.newPassword
    } else if (response.data.password) {
      newPassword = response.data.password
    } else if (response.data.data?.password) {
      newPassword = response.data.data.password
    } else {
      console.warn('⚠️ No password found in response:', response.data)
      throw new Error('No new password received from server')
    }

    // Actualizar credenciales
    credentials.value.password = newPassword
    showPassword.value = false // Ocultar por seguridad

    console.log('✅ Credentials rotated successfully')
  } catch (error) {
    console.error('❌ Failed to rotate credentials:', error)
    handleRotateError(error)
  } finally {
    loading.value = false
  }
}

// Agrega esta función si no existe
const showToast = (type, message, duration = 4000) => {
  // Puedes implementar tu sistema de toasts aquí
  // Por ahora usaremos console.log y alert temporalmente
  console.log(`📢 ${type.toUpperCase()}: ${message}`)

  // Temporal: usar alert para demostración
  // En producción, reemplaza con tu sistema de toasts
  if (type === 'error') {
    alert(`❌ ${message}`)
  } else {
    alert(`✅ ${message}`)
  }
}

const handleRotateError = (error) => {
  let errorMessage = 'Failed to rotate credentials. Please try again.'

  if (error.response) {
    // Error de la API
    const status = error.response.status
    const apiError = error.response.data

    switch (status) {
      case 400:
        errorMessage = apiError.message || 'Invalid request.'
        break
      case 401:
        errorMessage = 'Session expired. Please log in again.'
        break
      case 403:
        errorMessage = 'You do not have permission to rotate credentials for this database.'
        break
      case 404:
        errorMessage = 'Database not found.'
        break
      case 429:
        errorMessage = 'Too many requests. Please try again later.'
        break
      case 500:
        errorMessage = 'Server error. Please try again later.'
        break
      default:
        errorMessage = apiError.message || `Error: ${status}`
    }
  } else if (error.request) {
    // Error de red
    errorMessage = 'Network error. Please check your connection and try again.'
  } else {
    // Otro error
    errorMessage = error.message || 'An unexpected error occurred.'
  }

  showToast('error', errorMessage)
}

const deleteDatabase = async () => {
  if (!confirm('Are you sure you want to delete this database? This action cannot be undone.')) {
    return
  }

  loading.value = true
  try {
    // Llamar a la API para eliminar la base de datos
    await api.databases.delete(database.value.id)
    console.log('Database deleted successfully')

    // Redirigir al dashboard
    router.push('/dashboard')
  } catch (error) {
    console.error('Failed to delete database:', error)
  } finally {
    loading.value = false
  }
}

// Cargar datos de la base de datos
const fetchDatabaseDetails = async () => {
  const databaseId = route.params.id
  if (!databaseId) return

  try {
    const response = await api.databases.get(databaseId)

    // Combinar datos existentes con los nuevos, agregando campos por defecto
    database.value = {
      ...database.value,
      ...response.data,
      region: 'us-east-1',
      version: response.engine,
      plan: '',
      ram: '1GB',
      status: response.status,
    }

    // Actualizar credenciales
    credentials.value = {
      host: response.host,
      port: response.port,
      username: response.username,
      databaseName: response.name,
      password: '••••••••••••••••',
      connectionString: response.connectionString,
    }
  } catch (error) {
    console.error('Failed to fetch database details:', error)
  }
}
// Lifecycle
onMounted(() => {
  fetchDatabaseDetails()
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
}
</style>
