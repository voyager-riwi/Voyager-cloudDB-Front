<template>
  <div
    class="relative min-h-screen w-full bg-[#F4F7FA] dashboard font-sans text-gray-800 dark:text-gray-200"
  >
    <!-- Top App Bar -->
    <header
      class="sticky top-0 z-10 flex items-center justify-between border-b border-gray-200/10 bg-[#F4F7FA]/80 p-4 backdrop-blur-sm dark:bg-[#101c22]/80"
    >
      <div class="flex items-center gap-2">
        <span class="material-symbols-outlined text-[#4A90E2] text-3xl">cloud_queue</span>
        <h1 class="text-lg font-bold leading-tight tracking-tighter text-gray-900 dark:text-white">
          {{ appName }}
        </h1>
      </div>
      <div class="flex items-center gap-3">
        <!-- User Menu -->
        <div class="relative">
          <button
            @click="toggleUserMenu"
            class="flex h-10 w-10 cursor-pointer items-center justify-center overflow-hidden rounded-full bg-gray-200 text-gray-600 dark:bg-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
          >
            <span class="material-symbols-outlined">person</span>
          </button>

          <!-- User Dropdown Menu -->
          <div
            v-if="showUserMenu"
            class="absolute right-0 top-12 z-20 w-48 rounded-lg border border-gray-200 bg-white py-2 shadow-xl dark:border-gray-700 dark:bg-[#1a2732]"
          >
            <div class="px-4 py-2 text-sm text-gray-700 dark:text-gray-300">
              <p class="font-medium">{{ userData?.fullName || 'Usuario' }}</p>
              <p class="text-gray-500 dark:text-gray-400 text-xs">
                {{ userData?.email || 'example@gmail.com' }}
              </p>
            </div>

            <!--change password-->
            <button
              @click="showChangePasswordModal = true"
              class="flex w-full items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
            >
              <span class="material-symbols-outlined text-base">lock</span>
              Change Password
            </button>
            <div class="border-t border-gray-200 dark:border-gray-700"></div>
            <button
              @click="logout"
              class="flex w-full items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-gray-100 dark:text-red-400 dark:hover:bg-gray-700"
            >
              <span class="material-symbols-outlined text-base">logout</span>
              Cerrar Sesión
            </button>
          </div>
        </div>
      </div>
    </header>

    <main class="p-4 pb-24 sm:p-6">
      <div class="mx-auto max-w-4xl space-y-6 mt-[10vh]">
        <div v-if="loading" class="flex flex-col items-center justify-center py-12">
          <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-[#4A90E2] mb-4"></div>
          <p class="text-gray-500 dark:text-gray-400">Cargando bases de datos...</p>
        </div>

        <div
          v-else-if="error"
          class="rounded-xl border border-red-200 bg-red-50 p-6 text-center dark:border-red-800 dark:bg-red-900/20"
        >
          <span class="material-symbols-outlined text-red-500 text-4xl mb-3">error</span>
          <h3 class="text-lg font-semibold text-red-800 dark:text-red-200 mb-2">
            Error al cargar datos
          </h3>
          <p class="text-red-600 dark:text-red-300 mb-4">{{ error }}</p>
          <button
            @click="fetchDatabases"
            class="inline-flex items-center gap-2 rounded-lg bg-red-600 px-4 py-2 text-white hover:bg-red-700 transition-colors"
          >
            <span class="material-symbols-outlined text-base">refresh</span>
            Reintentar
          </button>
        </div>

        <!-- Content -->
        <div v-else>
          <!-- Subscription Summary Card -->
          <div
            class="flex flex-col items-start gap-4 rounded-xl border border-gray-200/50 bg-white p-5 dark:border-gray-700/50 dark:bg-[#1a2732] sm:flex-row sm:items-center sm:justify-between"
          >
            <div class="flex flex-col gap-1">
              <p class="text-base font-bold leading-tight text-gray-900 dark:text-white">
                Current Plan: {{ subscription.plan }}
              </p>
              <p class="text-sm font-normal leading-normal text-gray-500 dark:text-gray-400">
                {{ subscription.description }}
              </p>
            </div>
            <button
              @click="manageSubscription"
              class="flex h-9 w-full min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg bg-[#4A90E2]/10 px-4 text-sm font-medium leading-normal text-[#4A90E2] hover:bg-[#4A90E2]/20 dark:bg-[#4A90E2]/20 dark:hover:bg-[#4A90E2]/30 sm:w-auto transition-colors"
            >
              <span class="text-white">Manage Subscription</span>
            </button>
          </div>

          <!-- Database Quota Section -->
          <section>
            <h2
              class="px-1 pb-3 pt-2 text-xl font-bold leading-tight text-gray-900 dark:text-white"
            >
              Database Quota
            </h2>

            <!-- Limit Information Banner -->
            <div
              v-if="computedQuotas.some((q) => q.isLimitReached)"
              class="mb-4 bg-amber-500/20 border border-amber-500 text-amber-700 dark:text-amber-300 px-4 py-3 rounded-lg text-sm"
            >
              <div class="flex items-start gap-2">
                <div>
                  <p class="font-medium">⚠️ Database Limits Reached</p>
                  <p class="text-xs mt-1">
                    Some database engines have reached their limit. You can restore deactivated
                    databases or upgrade your plan.
                  </p>
                </div>
              </div>
            </div>

            <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <!-- Database Quota Cards -->
              <div
                v-for="quota in computedQuotas"
                :key="quota.type"
                class="flex flex-col gap-3 rounded-xl border border-gray-200/50 bg-white p-4 dark:border-gray-700/50 dark:bg-[#1a2732]"
              >
                <!-- Header with Status -->
                <div class="flex items-center justify-between gap-6">
                  <div class="flex items-center gap-2">
                    <p class="text-base font-medium leading-normal text-gray-900 dark:text-white">
                      {{ quota.type }}
                    </p>
                  </div>
                  <p class="text-sm font-normal leading-normal text-gray-500 dark:text-gray-400">
                    {{ quota.used }} of {{ quota.total }} used
                  </p>
                </div>

                <!-- Progress Bar -->
                <div class="h-2 w-full rounded-full bg-gray-200 dark:bg-gray-700">
                  <div
                    class="h-2 rounded-full transition-all duration-500"
                    :class="quota.color"
                    :style="{ width: `${quota.percentage}%` }"
                  ></div>
                </div>

                <!-- Status Information -->
                <div class="flex justify-between items-center">
                  <p class="text-sm font-normal leading-normal text-gray-500 dark:text-gray-400">
                    {{ quota.remaining }} remaining
                  </p>

                  <!-- Warning Message -->
                  <div
                    v-if="getLimitWarningForEngine(quota.engineId)"
                    class="text-xs text-amber-600 dark:text-amber-400"
                  >
                    {{ getLimitWarningForEngine(quota.engineId) }}
                  </div>
                  <!-- Limit Reached Message -->
                  <div
                    v-if="quota.isLimitReached"
                    class="text-xs text-red-600 dark:text-red-400 font-medium"
                  >
                    Limit reached
                  </div>
                </div>

                <!-- Additional Info -->
                <div
                  v-if="quota.isLimitReached"
                  class="mt-2 text-xs text-gray-500 dark:text-gray-400 border-t border-gray-200 dark:border-gray-700 pt-2"
                >
                  <p>Restore a deactivated database or upgrade your plan</p>
                </div>
              </div>
            </div>

            <!-- Plan Information -->
            <div class="mt-4 text-center">
              <p class="text-sm text-gray-500 dark:text-gray-400">
                Current plan:
                <span class="font-medium capitalize">{{ authStore.userPlan || 'free' }}</span> •
                Limit: {{ engineLimit }} databases per engine
              </p>
            </div>
          </section>

          <!-- Database Instance List -->
          <section>
            <div
              class="flex flex-col gap-3 px-1 pb-3 pt-2 sm:flex-row sm:items-center sm:justify-between"
            >
              <h2 class="text-xl font-bold leading-tight text-gray-900 dark:text-white">
                Your Databases
                <span class="text-sm font-normal text-gray-500 ml-2"
                  >({{ filteredDatabases.length }})</span
                >
              </h2>
              <div class="flex gap-3">
                <div class="relative w-full sm:max-w-xs">
                  <span
                    class="material-symbols-outlined pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                    >search</span
                  >
                  <input
                    v-model="searchQuery"
                    class="w-full rounded-lg border border-gray-200/50 bg-white py-2 pl-10 pr-4 text-sm focus:border-[#4A90E2] focus:ring-[#4A90E2] focus:outline-none dark:border-gray-700/50 dark:bg-[#1a2732] dark:text-gray-300 dark:placeholder-gray-500"
                    placeholder="Find a database..."
                    type="text"
                  />
                </div>
                <button
                  @click="refreshDatabases"
                  class="flex items-center justify-center rounded-lg border border-gray-200/50 bg-white p-2 hover:bg-gray-50 dark:border-gray-700/50 dark:bg-[#1a2732] dark:hover:bg-[#243642] transition-colors"
                  :class="{ 'animate-spin': refreshing }"
                >
                  <span class="material-symbols-outlined text-gray-600 dark:text-gray-400"
                    >refresh</span
                  >
                </button>
              </div>
            </div>

            <div v-if="filteredDatabases.length > 0" class="space-y-3">
              <!-- Database Instance Cards -->
              <div
                v-for="db in filteredDatabases"
                :key="db.id"
                @click="openDatabase(db)"
                class="group flex cursor-pointer items-center gap-4 rounded-xl border border-gray-200/50 bg-white p-4 transition-all hover:border-[#4A90E2]/50 hover:shadow-sm dark:border-gray-700/50 dark:bg-[#1a2732] dark:hover:border-[#4A90E2]/40"
              >
                <div
                  class="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-[#4A90E2]/10 dark:bg-[#4A90E2]/20"
                >
                  <img :alt="`${db.engine} logo`" :src="getDatabaseLogo(db.engine)" />
                </div>
                <div class="flex-grow min-w-0">
                  <div class="flex items-center gap-2">
                    <p class="font-semibold text-gray-900 dark:text-white truncate w-24">
                      {{ db.engine }}
                    </p>
                    <p class="font-semibold text-gray-900 dark:text-white truncate">
                      ID: {{ db.name }}
                    </p>

                    <span
                      v-if="db.status === 'Pending'"
                      class="inline-flex items-center gap-1 rounded-full bg-[#F5A623]/10 px-2 py-1 text-xs font-medium text-[#F5A623]"
                    >
                      <span class="h-1.5 w-1.5 rounded-full bg-[#F5A623] animate-pulse"></span>
                      {{ db.status }}
                    </span>
                  </div>
                  <div
                    class="flex flex-wrap items-center gap-2 text-sm text-gray-500 dark:text-gray-400"
                  >
                    <div class="flex items-center gap-1">
                      <div class="h-2 w-2 rounded-full" :class="getStatusColor(db.status)"></div>
                      <span>{{ db.status }}</span>
                    </div>
                    <span class="text-gray-300 dark:text-gray-600 hidden xs:inline">|</span>
                    <span class="hidden xs:inline">{{ db.region }} / {{ db.ram }}</span>
                    <span class="xs:hidden text-xs">{{ db.ram }}</span>
                  </div>
                </div>
                <span
                  class="material-symbols-outlined text-gray-400 flex-shrink-0 transition-transform group-hover:translate-x-0.5"
                  >chevron_right</span
                >
              </div>
            </div>

            <!-- Empty State -->
            <div
              v-else
              class="flex flex-col items-center justify-center rounded-xl border-2 border-dashed border-gray-300 bg-white p-12 text-center dark:border-gray-700 dark:bg-[#1a2732]"
            >
              <span class="material-symbols-outlined mb-4 text-5xl text-gray-400 dark:text-gray-500"
                >database</span
              >
              <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
                {{ searchQuery ? 'No databases found' : 'No databases yet' }}
              </h3>
              <p class="mt-1 text-sm text-gray-500 dark:text-gray-400">
                {{
                  searchQuery
                    ? 'Try a different search term.'
                    : 'Get started by creating your first database.'
                }}
              </p>
              <button
                v-if="!searchQuery"
                @click="showCreateModal = true"
                class="mt-4 flex h-10 items-center justify-center gap-2 rounded-lg bg-[#4A90E2] px-5 text-sm font-medium text-white shadow-sm transition-colors hover:bg-[#4A90E2]/90"
              >
                <span class="material-symbols-outlined text-base">add</span>
                <span>Create New Database</span>
              </button>
            </div>
          </section>

          <!-- Deactivated Databases Section -->
          <section v-if="deactivatedDatabases.length > 0" class="mt-8">
            <div class="flex flex-col gap-3 px-1 pb-3 pt-2">
              <h2
                class="text-xl font-bold leading-tight text-gray-900 dark:text-white flex items-center gap-2"
              >
                <span class="material-symbols-outlined text-amber-500">warning</span>
                Deactivated Databases
                <span class="text-sm font-normal text-gray-500 ml-2"
                  >({{ deactivatedDatabases.length }})</span
                >
              </h2>
              <p class="text-sm text-gray-600 dark:text-gray-400">
                These databases are scheduled for permanent deletion after 30 days. Restore them to
                reactivate with new credentials.
              </p>
            </div>

            <div class="space-y-3">
              <div
                v-for="db in deactivatedDatabases"
                :key="db.id"
                class="group flex items-center gap-4 rounded-xl border border-amber-200/50 bg-amber-50/30 p-4 dark:border-amber-700/30 dark:bg-amber-900/10"
              >
                <div
                  class="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-amber-500/10 dark:bg-amber-500/20 grayscale opacity-60"
                >
                  <img :alt="`${db.engine} logo`" :src="getDatabaseLogo(db.engine)" />
                </div>

                <div class="flex-grow min-w-0">
                  <div class="flex items-center gap-2">
                    <p class="font-semibold text-gray-900 dark:text-white truncate w-24">
                      {{ db.engine }}
                    </p>
                    <p class="font-semibold text-gray-700 dark:text-gray-300 truncate">
                      ID: {{ db.name }}
                    </p>
                    <span
                      class="inline-flex items-center gap-1 rounded-full bg-amber-500/20 px-2 py-1 text-xs font-medium text-amber-700 dark:text-amber-400"
                    >
                      <span class="h-1.5 w-1.5 rounded-full bg-amber-500"></span>
                      Deactivated
                    </span>
                  </div>
                  <div
                    class="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mt-1"
                  >
                    <span class="material-symbols-outlined text-xs">schedule</span>
                    <span>Grace period: 30 days remaining</span>
                  </div>
                </div>

                <button
                  @click="restoreDatabaseFromList(db)"
                  class="flex items-center justify-center gap-2 rounded-lg bg-green-500/20 px-4 py-2 text-sm font-medium text-green-600 hover:bg-green-500/30 transition-colors dark:text-green-400"
                >
                  <span class="material-symbols-outlined text-base">restore</span>
                  <span>Restore</span>
                </button>

                <button
                  @click="openDatabase(db)"
                  class="flex items-center justify-center rounded-lg p-2 hover:bg-gray-100 dark:hover:bg-gray-700/30 transition-colors"
                >
                  <span class="material-symbols-outlined text-gray-400">chevron_right</span>
                </button>
              </div>
            </div>
          </section>
        </div>
      </div>
    </main>

    <!-- Floating Action Button -->
    <button
      @click="showCreateModal = true"
      class="fixed bottom-6 right-6 flex h-14 w-14 items-center justify-center rounded-full bg-[#4A90E2] text-white shadow-lg transition-transform hover:scale-105 active:scale-95 z-10"
    >
      <span class="material-symbols-outlined text-3xl">add</span>
    </button>

    <!-- Botón de mute en la esquina inferior izquierda -->
    <button
      @click="toggleBackgroundMusic"
      class="music-control-btn"
      :class="{ muted: isMusicMuted }"
    >
      <svg v-if="isMusicMuted" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
        <path d="M3 9V15H7L12 20V4L7 9H3Z" />
        <path
          d="M16 9L21 14M21 9L16 14"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
        />
      </svg>
      <svg v-else width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
        <path d="M3 9V15H7L12 20V4L7 9H3Z" />
        <path
          d="M16 9C16.5 9.5 17 10.5 17 12C17 13.5 16.5 14.5 16 15"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
        />
        <path
          d="M19 6C20.5 7.5 21 10 21 12C21 14 20.5 16.5 19 18"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
        />
      </svg>
      <span class="music-label">{{ isMusicMuted ? 'Activar música' : 'Silenciar' }}</span>
    </button>

    <!-- Audio oculto para la música de fondo -->
    <audio ref="backgroundMusic" loop :muted="isMusicMuted">
      <source :src="backgroundMusicSrc" type="audio/mpeg" />
      Tu navegador no soporta el elemento audio.
    </audio>

    <!-- Modal de creación de base de datos -->
    <CreateDatabaseModal
      v-if="showCreateModal"
      @close="showCreateModal = false"
      @success="handleDatabaseCreated"
    />

    <!-- Backdrop for dropdown -->
    <div v-if="showUserMenu" class="fixed inset-0 z-0" @click="showUserMenu = false"></div>
  </div>

  <!-- Modal para cambiar contraseña -->
  <div
    v-if="showChangePasswordModal"
    class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
  >
    <div class="w-full max-w-md mx-4">
      <ChangePassword
        :is-standalone="false"
        @success="handlePasswordChangeSuccess"
        @cancel="showChangePasswordModal = false"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import api from '@/services/api'
import env from '@/config/env'
import CreateDatabaseModal from '@/components/databases/CreateDatabaseModal.vue'
import ChangePassword from '@/components/common/ChangePassword.vue'
import { DATABASE_ENGINES, getEngineNumericId } from '@/utils/constants/databaseEngines'
import { useMagicToast } from '@/composables/useMagicToast'
import { useDatabaseStore } from '@/stores/databases'
import { useAuthStore } from '@/stores/auth'

// Stores
const dbStore = useDatabaseStore()
const authStore = useAuthStore()
const toast = useMagicToast()
const router = useRouter()

// Estados de música de fondo
const backgroundMusic = ref(null)
const isMusicMuted = ref(false)
const backgroundMusicSrc = ref(new URL('@/assets/audio/background_music.mp3', import.meta.url).href)

// Estados UI
const showChangePasswordModal = ref(false)
const loading = ref(true)
const error = ref('')
const refreshing = ref(false)
const searchQuery = ref('')
const showUserMenu = ref(false)
const userData = ref(null)
const showCreateModal = ref(false)

// Perfil de usuario
const userProfile = ref(null)
const loadingProfile = ref(true)

// Datos desde environment variables
const appName = env.app.name

// Datos del plan
const subscription = computed(() => ({
  plan: userProfile.value?.currentPlanName || 'Free Plan',
  description: 'View and manage your subscription details.',
}))

// Fetch perfil del usuario
const fetchUserProfile = async () => {
  try {
    const response = await api.users.getProfile()
    userProfile.value = response.data || response
    authStore.userPlan = userProfile.value.currentPlanName
  } catch (err) {
    console.error('Error fetching user profile:', err)
  } finally {
    loadingProfile.value = false
  }
}

// Lista de bases de datos
const databases = ref([])

// Logos
const databaseLogos = {
  PostgreSQL: DATABASE_ENGINES[1]?.logo || '',
  MongoDB: DATABASE_ENGINES[2]?.logo || '',
  MySQL: DATABASE_ENGINES[0]?.logo || '',
  SQLServer: DATABASE_ENGINES[3]?.logo || '',
  Redis: DATABASE_ENGINES[4]?.logo || '',
  Cassandra: DATABASE_ENGINES[5]?.logo || '',
}

// Calcular cuotas según el plan real del backend
const computedQuotas = computed(() => {
  const limit = userProfile.value?.databaseLimitPerEngine || 0
  const dbs = databases.value || []

  if (!limit) return []

  const engines = [...new Set(dbs.map((db) => db.engine))]

  return engines.map((engine) => {
    const used = dbs.filter((db) => db.engine === engine).length
    const total = limit
    const percentage = Math.min((used / total) * 100, 100)
    const remaining = total - used

    return {
      engineId: engine,
      type: engine,
      used,
      total,
      remaining,
      percentage,
      color: percentage >= 90 ? 'bg-red-500' : percentage >= 70 ? 'bg-amber-500' : 'bg-green-500',
      isLimitReached: used >= total,
    }
  })
})

// Advertencias
const getLimitWarningForEngine = (engineId) => {
  const quota = computedQuotas.value.find((q) => q.engineId === engineId)
  if (quota.percentage > 70) return 'Almost at limit'
  return ''
}

// Filtrar bases activas
const filteredDatabases = computed(() => {
  if (!searchQuery.value)
    return databases.value.filter((db) => db.status !== 'Deleted' && db.status !== 'Stopped')

  const query = searchQuery.value.toLowerCase()
  return databases.value.filter((db) => {
    if (db.status === 'Deleted' || db.status === 'Stopped') return false
    const name = db.name || ''
    const type = db.type || ''
    const status = db.status || ''
    const region = db.region || ''
    return (
      name.toLowerCase().includes(query) ||
      type.toLowerCase().includes(query) ||
      status.toLowerCase().includes(query) ||
      region.toLowerCase().includes(query)
    )
  })
})

// Bases desactivadas
const deactivatedDatabases = computed(() =>
  databases.value.filter((db) => db.status === 'Deleted' || db.status === 'Stopped'),
)

// Cargar bases de datos
const fetchDatabases = async () => {
  try {
    loading.value = true
    error.value = ''
    const response = await api.databases.list()
    databases.value = response.data || response
  } catch (err) {
    error.value = err.message
    databases.value = []
  } finally {
    loading.value = false
    refreshing.value = false
  }
}

// Refrescar
const refreshDatabases = async () => {
  refreshing.value = true
  await fetchDatabases()
}

// Logos
const getDatabaseLogo = (type) => databaseLogos[type] || databaseLogos.PostgreSQL

const getStatusColor = (status) => {
  const colors = {
    Active: 'bg-[#50E3C2]',
    Pending: 'bg-[#F5A623]',
    Error: 'bg-red-500',
    Stopped: 'bg-gray-400',
  }
  return colors[status] || 'bg-gray-400'
}

// User menu
const toggleUserMenu = () => (showUserMenu.value = !showUserMenu.value)
const logout = () => {
  localStorage.removeItem('authToken')
  localStorage.removeItem('user')
  router.push('/login')
}

// Abrir detalles
const openDatabase = (db) => router.push(`/databases/${db.id}`)

// Restaurar DB
const restoreDatabaseFromList = async (db) => {
  loading.value = true
  try {
    await api.databases.restore(db.id)
    toast.lumos(`✨ Database "${db.name}" restored successfully! Credentials sent to your email.`, {
      title: '🔄 Database Restored',
      duration: 6000,
    })
    await fetchDatabases()
  } catch (error) {
    toast.expelliarmus(error.message || 'Failed to restore database.', {
      title: '⚡ Error',
      duration: 5000,
    })
  } finally {
    loading.value = false
  }
}

// Subscription
const manageSubscription = () => router.push('/Plans')

// Creación
const handleDatabaseCreated = () => {
  toast.spell(
    'Database created successfully! Your credentials will be sent to your email address. ',
    {
      title: '🪄 Success',
      duration: 4000,
    },
  )
  fetchDatabases()
}

// Cambio de contraseña
const handlePasswordChangeSuccess = () => {
  showChangePasswordModal.value = false
  toast.lumos('Password changed successfully! 🔐', {
    title: '✨ Success',
    duration: 4000,
  })
}

// Música
const toggleBackgroundMusic = async () => {
  isMusicMuted.value = !isMusicMuted.value
  if (backgroundMusic.value) {
    if (isMusicMuted.value) backgroundMusic.value.pause()
    else await backgroundMusic.value.play().catch(() => {})
  }
}
const startBackgroundMusic = async () => {
  if (backgroundMusic.value && !isMusicMuted.value) {
    backgroundMusic.value.volume = 0.07
    await backgroundMusic.value.play().catch(() => {})
  }
}

// Lifecycle
onMounted(() => {
  fetchUserProfile()
  fetchDatabases()
  startBackgroundMusic()
})
</script>

<style scoped>
.dashboard {
  background-image: url('@/assets/images/dashboard_bg.png');
  background-position: center;
  background-size: cover;
}
.music-control-btn {
  position: fixed;
  bottom: 20px;
  left: 20px;
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 16px;
  background: rgba(0, 0, 0, 0.7);
  color: white;
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 25px;
  cursor: pointer;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
  z-index: 1000;
  font-size: 14px;
  font-family: 'Source Sans Pro', sans-serif;
}

.music-control-btn:hover {
  background: rgba(0, 0, 0, 0.9);
  border-color: rgba(255, 255, 255, 0.5);
  transform: translateY(-2px);
}

.music-control-btn.muted {
  background: rgba(107, 114, 128, 0.7);
}

.music-control-btn svg {
  width: 20px;
  height: 20px;
  flex-shrink: 0;
}

.music-label {
  white-space: nowrap;
}

/* Ocultar el elemento audio */
audio {
  display: none;
}

/* Responsive */
@media (max-width: 768px) {
  .music-control-btn {
    bottom: 15px;
    left: 15px;
    padding: 8px 12px;
    font-size: 12px;
  }

  .music-control-btn svg {
    width: 18px;
    height: 18px;
  }
}
.material-symbols-outlined {
  font-family: 'Material Symbols Outlined';
  font-weight: normal;
  font-style: normal;
  font-size: 24px;
  line-height: 1;
  letter-spacing: normal;
  text-transform: none;
  display: inline-block;
  white-space: nowrap;
  word-wrap: normal;
  direction: ltr;
  -webkit-font-smoothing: antialiased;
}

/* Responsive breakpoint personalizado */
@media (max-width: 475px) {
  .xs\\:inline {
    display: inline !important;
  }
  .xs\\:hidden {
    display: none !important;
  }
}
</style>
