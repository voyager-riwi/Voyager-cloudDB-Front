<template>
  <div
    class="relative flex h-auto min-h-screen w-full flex-col font-display overflow-x-hidden"
    :style="backgroundStyle"
  >
    <!-- Overlay para mejorar legibilidad del texto -->
    <div class="absolute inset-0 bg-black/20 dark:bg-black/40 z-0"></div>

    <!-- Contenido principal con z-index superior -->
    <div class="relative z-10">
      <!-- TopAppBar -->
      <div
        class="flex items-center bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-sm p-4 pb-2 justify-between sticky top-0 z-20 border-b border-white/5"
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
            class="flex h-8 shrink-0 items-center justify-center gap-x-2 rounded-full px-4 backdrop-blur-sm"
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
          <div class="bg-white/90 dark:bg-[#111c22]/90 dark:md:bg-[#111c22]/95 backdrop-blur-sm rounded-xl shadow-sm">
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
          <div
            class="bg-white/90 dark:bg-[#111c22]/90 dark:md:bg-[#111c22]/95 backdrop-blur-sm rounded-xl shadow-sm p-4 space-y-4"
          >
            <!-- New Credentials Notice (cuando username indica que son nuevas credenciales) -->
            <div
              v-if="
                credentials.username &&
                credentials.username.includes('[New credentials sent to email]')
              "
              class="flex flex-col items-center justify-center gap-4 py-8 px-4 text-center rounded-lg bg-gradient-to-br from-green-500/10 to-blue-500/10 border-2 border-green-500/20"
            >
              <div class="relative">
                <span class="material-symbols-outlined text-green-500 text-6xl animate-pulse"
                  >mark_email_read</span
                >
                <span
                  class="material-symbols-outlined text-blue-500 text-3xl absolute -bottom-1 -right-1"
                  >check_circle</span
                >
              </div>
              <div class="max-w-md">
                <h3 class="text-green-600 dark:text-green-400 text-lg font-bold mb-2">
                  ✨ Database Restored Successfully!
                </h3>
                <p class="text-green-600/80 dark:text-green-400/80 text-sm mb-3">
                  Your database has been restored with <strong>brand new credentials</strong>.
                </p>
                <div class="bg-white/50 dark:bg-black/20 rounded-lg p-3 text-left space-y-2">
                  <div class="flex items-start gap-2">
                    <span class="material-symbols-outlined text-blue-500 text-sm mt-0.5">mail</span>
                    <p class="text-slate-700 dark:text-slate-300 text-xs">
                      Check your <strong>email inbox</strong> for the new username and password
                    </p>
                  </div>
                  <div class="flex items-start gap-2">
                    <span class="material-symbols-outlined text-amber-500 text-sm mt-0.5"
                      >lock</span
                    >
                    <p class="text-slate-700 dark:text-slate-300 text-xs">
                      Old credentials are no longer valid for security reasons
                    </p>
                  </div>
                  <div class="flex items-start gap-2">
                    <span class="material-symbols-outlined text-purple-500 text-sm mt-0.5"
                      >refresh</span
                    >
                    <p class="text-slate-700 dark:text-slate-300 text-xs">
                      Refresh this page after checking your email to see the connection details
                    </p>
                  </div>
                </div>
              </div>
              <button
                @click="fetchDatabaseDetails"
                class="mt-2 flex items-center gap-2 px-4 py-2 rounded-lg bg-green-500/20 text-green-600 dark:text-green-400 hover:bg-green-500/30 transition-colors font-medium text-sm"
              >
                <span class="material-symbols-outlined text-base">refresh</span>
                Refresh Details
              </button>
            </div>

            <!-- Security Warning (solo si hay credenciales disponibles) -->
            <div
              v-else-if="
                credentials.username &&
                !credentials.username.includes('[New credentials sent to email]')
              "
              class="flex items-start gap-3 p-3 rounded-lg bg-amber-500/10"
            >
              <span class="material-symbols-outlined text-amber-500 mt-0.5">warning</span>
              <p class="text-amber-700 dark:text-amber-400 text-sm">
                Handle credentials securely. The password can only be revealed once per session for
                security reasons.
              </p>
            </div>

            <!-- Empty State (cuando no hay credenciales) -->
            <div
              v-else-if="!credentials.username || credentials.username === ''"
              class="flex flex-col items-center justify-center gap-4 py-12 text-center"
            >
              <div class="relative">
                <div
                  class="absolute inset-0 bg-slate-400/20 dark:bg-slate-600/20 rounded-full blur-xl"
                ></div>
                <span
                  class="material-symbols-outlined text-slate-400 dark:text-slate-600 text-7xl relative"
                  >lock</span
                >
              </div>
              <div class="max-w-sm">
                <h3 class="text-slate-600 dark:text-slate-400 text-base font-semibold mb-2">
                  Credentials Not Available
                </h3>
                <p class="text-slate-500 dark:text-slate-500 text-sm mb-4">
                  The connection credentials for this database are not currently visible in this
                  interface.
                </p>
                <div class="bg-slate-100 dark:bg-slate-800/50 rounded-lg p-3 text-left">
                  <p class="text-slate-600 dark:text-slate-400 text-xs leading-relaxed">
                    💡 <strong>Tip:</strong> If you recently created or restored this database,
                    check your email for the credentials. They were sent for security purposes.
                  </p>
                </div>
              </div>
            </div>

            <!-- Credentials List (solo si hay credenciales válidas) -->
            <div
              v-if="
                credentials.username &&
                !credentials.username.includes('[New credentials sent to email]')
              "
              class="grid grid-cols-1 divide-y divide-slate-200 dark:divide-[#325567]"
            >
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

        <!-- Soft Delete Warning (solo si está eliminada) -->
        <section v-if="isDeleted" class="space-y-3">
          <div class="flex items-start gap-3 p-4 rounded-lg bg-red-500/10 border border-red-500/20">
            <span class="material-symbols-outlined text-red-500 mt-0.5">warning</span>
            <div class="flex-1">
              <p class="text-red-600 dark:text-red-400 text-sm font-semibold mb-1">
                ⚠️ Database Scheduled for Deletion
              </p>
              <p class="text-red-600/80 dark:text-red-400/80 text-sm">
                This database is marked for deletion. You have
                <strong>{{ daysRemaining }} days</strong> to restore it before permanent deletion.
              </p>
              <p class="text-red-600/70 dark:text-red-400/70 text-xs mt-2">
                Grace period: 30 days from deletion date
              </p>
            </div>
          </div>
        </section>

        <!-- Actions -->
        <section class="space-y-4 pt-4">
          <!-- Restore Button (solo si está eliminada) -->
          <button
            v-if="isDeleted"
            @click="restoreDatabase"
            :disabled="loading"
            class="w-full flex items-center justify-center gap-2 h-12 px-6 font-semibold rounded-lg bg-green-500/20 text-green-600 dark:bg-green-500/20 dark:text-green-400 hover:bg-green-500/30 transition-colors disabled:opacity-50 disabled:cursor-not-allowed backdrop-blur-sm"
          >
            <span class="material-symbols-outlined">restore</span>
            {{ loading ? 'Restoring...' : 'Restore Database' }}
          </button>

          <!-- Reset Password Button (solo si NO está eliminada) -->
          <button
            v-if="!isDeleted"
            @click="resetPassword"
            :disabled="loading"
            class="w-full flex items-center justify-center gap-2 h-12 px-6 font-semibold rounded-lg bg-[#1193d4]/20 text-[#1193d4] dark:bg-[#1193d4]/20 dark:text-[#1193d4] hover:bg-[#1193d4]/30 transition-colors disabled:opacity-50 disabled:cursor-not-allowed backdrop-blur-sm"
          >
            <span class="material-symbols-outlined">lock_reset</span>
            {{ loading ? 'Resetting...' : 'Reset Password' }}
          </button>

          <!-- Rotate Credentials Button (solo si NO está eliminada) -->
          <button
            v-if="!isDeleted"
            @click="rotateCredentials"
            :disabled="loading"
            class="w-full flex items-center justify-center gap-2 h-12 px-6 font-semibold rounded-lg bg-purple-500/20 text-purple-600 dark:bg-purple-500/20 dark:text-purple-400 hover:bg-purple-500/30 transition-colors disabled:opacity-50 disabled:cursor-not-allowed backdrop-blur-sm"
          >
            <span class="material-symbols-outlined">refresh</span>
            {{ loading ? 'Rotating...' : 'Rotate Credentials' }}
          </button>

          <!-- Delete Button (solo si NO está eliminada) -->
          <button
            v-if="!isDeleted"
            @click="deleteDatabase"
            :disabled="loading"
            class="w-full flex items-center justify-center gap-2 h-12 px-6 font-semibold rounded-lg bg-red-500/10 text-red-600 dark:bg-red-500/20 dark:text-red-400 hover:bg-red-500/20 dark:hover:bg-red-500/30 transition-colors disabled:opacity-50 disabled:cursor-not-allowed backdrop-blur-sm"
          >
            <span class="material-symbols-outlined">delete</span>
            {{ loading ? 'Deleting...' : 'Delete Database' }}
          </button>
        </section>
      </main>

      <div class="h-10"></div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useDatabaseStore } from '@/stores/databases'
import { useMagicToast } from '@/composables/useMagicToast'
import { useMagicModal } from '@/composables/useMagicModal'
import { GRACE_PERIOD_DAYS, DATABASE_STATUS } from '@/utils/constants/database'
import { DATABASE_ENGINES } from '@/utils/constants/databaseEngines'

const router = useRouter()
const route = useRoute()

// Stores y composables
const dbStore = useDatabaseStore()
const toast = useMagicToast()
const modal = useMagicModal()

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

// Computed property para encontrar el motor correspondiente
const currentEngine = computed(() => {
  if (!database.value.engine) return null
  return DATABASE_ENGINES.find(
    (engine) => engine.name.toLowerCase() === database.value.engine.toLowerCase(),
  )
})

// Computed property para el fondo dinámico
const backgroundStyle = computed(() => {
  const backgroundImage = currentEngine.value?.details_bg
    ? `url(${currentEngine.value.details_bg})`
    : 'linear-gradient(135deg, #0a1116 0%, #0a1116)'

  return {
    backgroundImage: backgroundImage,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundAttachment: 'fixed',
    backgroundColor: '#0a1116', // Fallback color
  }
})

// Computed properties para estado de eliminación
const isDeleted = computed(() => {
  return database.value.status === DATABASE_STATUS.DELETED || database.value.status === 'Deleted'
})

const daysRemaining = computed(() => {
  if (!database.value.deletedAt) return GRACE_PERIOD_DAYS

  const deletedDate = new Date(database.value.deletedAt)
  const now = new Date()
  const daysPassed = Math.floor((now - deletedDate) / (1000 * 60 * 60 * 24))
  const remaining = GRACE_PERIOD_DAYS - daysPassed

  return Math.max(0, remaining)
})

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
    toast.lumos('Copied to clipboard! ✨', {
      duration: 2000,
    })
  } catch (err) {
    toast.error('Failed to copy to clipboard', {
      duration: 3000,
    })
  }
}

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })
}

const deleteDatabase = async () => {
  const databaseId = route.params.id

  // Confirmación mágica de eliminación con advertencia de soft delete
  const confirmed = await modal.obliviate(
    `Are you sure you want to delete "${database.value.name}"?`,
    {
      confirmText: 'Delete Database',
      cancelText: 'Keep Active',
      message: `⚠️ Soft Delete: You'll have ${GRACE_PERIOD_DAYS} days to restore this database before permanent deletion.`,
    },
  )

  if (!confirmed) return

  loading.value = true
  try {
    // Llamar al store de Pinia
    await dbStore.deleteDatabase(databaseId)

    toast.spell(`Database deleted. ${GRACE_PERIOD_DAYS}-day grace period started. 🌙`, {
      title: '🗑️ Soft Delete',
      duration: 5000,
    })

    // Actualizar vista local
    database.value.status = DATABASE_STATUS.DELETED
    database.value.deletedAt = new Date().toISOString()
  } catch (error) {
    toast.expelliarmus(error.message || 'Failed to delete database. Please try again.', {
      duration: 4000,
    })
  } finally {
    loading.value = false
  }
}

const resetPassword = async () => {
  const databaseId = route.params.id
  if (loading.value) return

  // Confirmación mágica
  const confirmed = await modal.alohomora('Reset database password?', {
    confirmText: 'Reset Password',
    cancelText: 'Cancel',
    message:
      '🔐 A new password will be generated and sent to your email. The old password will no longer work.',
  })

  if (!confirmed) return

  loading.value = true

  try {
    // Llamar al store de Pinia
    await dbStore.resetPassword(databaseId)

    toast.lumos('Password reset successfully! Check your email for the new password. 📧', {
      title: '🔐 Password Reset',
      duration: 6000,
    })

    // Ocultar password actual por seguridad
    showPassword.value = false
    credentials.value.password = '••••••••••••••••'
  } catch (error) {
    toast.expelliarmus(error.message || 'Failed to reset password. Please try again.', {
      title: '⚡ Error',
      duration: 5000,
    })
  } finally {
    loading.value = false
  }
}

const restoreDatabase = async () => {
  const databaseId = route.params.id
  if (loading.value) return

  // Verificar si aún está en período de gracia
  if (daysRemaining.value <= 0) {
    toast.avadaKedavra('Grace period expired. Cannot restore database.', {
      duration: 5000,
    })
    return
  }

  // Confirmación mágica de restauración
  const confirmed = await modal.expectoPatronum(`Restore "${database.value.name}"?`, {
    confirmText: 'Restore Database',
    cancelText: 'Cancel',
    message: `✨ The database will be restored with a new password (sent to your email). ${daysRemaining.value} days remaining in grace period.`,
  })

  if (!confirmed) return

  loading.value = true

  try {
    // Llamar al store de Pinia
    await dbStore.restoreDatabase(databaseId)

    toast.expectoPatronum(
      'Database restored successfully! Check your email for the new password. 🎉',
      {
        title: '✨ Restoration Complete',
        duration: 6000,
      },
    )

    // Actualizar vista local
    database.value.status = DATABASE_STATUS.RUNNING
    database.value.deletedAt = null
    showPassword.value = false

    // IMPORTANTE: Limpiar credenciales antiguas porque ya no son válidas
    // Las nuevas credenciales fueron enviadas por email
    credentials.value = {
      host: '',
      port: 0,
      username: '[New credentials sent to email]',
      databaseName: '',
      password: '',
      connectionString: '',
    }

    // Recargar detalles desde el backend para obtener los nuevos datos
    await fetchDatabaseDetails()
  } catch (error) {
    if (error.message && error.message.includes('grace period expired')) {
      toast.avadaKedavra('Cannot restore: Grace period expired (more than 30 days).', {
        duration: 5000,
      })
    } else {
      toast.expelliarmus(error.message || 'Failed to restore database. Please try again.', {
        title: '⚡ Error',
        duration: 5000,
      })
    }
  } finally {
    loading.value = false
  }
}

// Mantener compatibilidad con código anterior (rotateCredentials ahora usa resetPassword)
const rotateCredentials = async () => {
  await resetPassword()
}

// Cargar datos de la base de datos
const fetchDatabaseDetails = async () => {
  const databaseId = route.params.id
  if (!databaseId) return

  try {
    // Usar el store de Pinia
    const dbData = await dbStore.fetchDatabaseById(databaseId)

    // Combinar datos existentes con los nuevos, agregando campos por defecto
    database.value = {
      ...database.value,
      ...dbData,
      region: dbData.region || 'us-east-1',
      version: dbData.version || dbData.engine,
      plan: dbData.plan || 'Free Plan',
      ram: dbData.ram || '1GB',
      status: dbData.status,
      deletedAt: dbData.deletedAt || null,
    }

    // Actualizar credenciales
    // El backend puede retornar "host: localhost" incorrectamente,
    // así que extraemos el host real del connectionString o usamos fallback
    let realHost = dbData.host

    // Si viene "localhost", usar IP quemada como fallback
    if (realHost === 'localhost' || realHost === '127.0.0.1') {
      realHost = '91.98.42.248'
    }

    // Intentar extraer del connectionString como backup
    if (dbData.connectionString) {
      const hostMatch = dbData.connectionString.match(/Host=([^;]+)/)
      if (hostMatch && hostMatch[1] && hostMatch[1] !== 'localhost') {
        realHost = hostMatch[1]
      }
    }

    // Si las credenciales actuales tienen el mensaje de "sent to email", mantenerlo
    const keepEmailMessage = credentials.value.username?.includes('[New credentials sent to email]')

    if (keepEmailMessage) {
      // Mantener el mensaje de nuevas credenciales por email
      // No actualizar las credenciales para que se siga mostrando el mensaje
    } else {
      // Actualizar normalmente con los datos del backend
      credentials.value = {
        host: realHost,
        port: dbData.port,
        username: dbData.username,
        databaseName: dbData.name,
        password: '••••••••••••••••',
        connectionString: dbData.connectionString,
      }
    }
  } catch (error) {
    toast.expelliarmus('Failed to load database details', {
      duration: 4000,
    })
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
</style>
