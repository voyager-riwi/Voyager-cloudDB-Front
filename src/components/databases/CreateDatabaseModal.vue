<template>
  <div class="fixed inset-0 z-50 overflow-y-auto">
    <!-- Overlay de fondo -->
    <div class="fixed inset-0 bg-black/50 transition-opacity" @click="closeModal"></div>

    <!-- Contenido del modal -->
    <div class="relative min-h-screen flex items-center justify-center p-4">
      <div
        class="relative bg-white dark:bg-[#192b33] rounded-xl w-full max-w-2xl shadow-2xl overflow-hidden"
      >
        <!-- Header -->
        <div class="flex items-center p-6 border-b border-slate-200 dark:border-slate-700">
          <button
            @click="closeModal"
            class="text-slate-800 dark:text-white flex size-10 shrink-0 items-center justify-center hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
          >
            <span class="material-symbols-outlined text-xl">close</span>
          </button>
          <h2 class="text-slate-900 dark:text-white text-xl font-bold flex-1 text-center">
            🚀 Create New Database
          </h2>
          <div class="w-10"></div>
        </div>

        <!-- Contenido -->
        <div class="p-6">
          <!-- Loading State -->
          <div v-if="loading" class="flex flex-col items-center justify-center py-12">
            <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mb-4"></div>
            <p class="text-slate-600 dark:text-slate-400">Creating your database...</p>
          </div>

          <div v-else>
            <!-- Limit Warning -->
            <div
              v-if="limitWarning"
              class="mb-4 bg-amber-500/20 border border-amber-500 text-amber-700 dark:text-amber-300 px-4 py-3 rounded-lg text-sm flex items-start gap-2"
            >
              <span class="material-symbols-outlined text-lg">warning</span>
              <span>{{ limitWarning }}</span>
            </div>

            <!-- Limit Exceeded Error -->
            <div
              v-if="selectedEngine && !canCreateDatabase"
              class="mb-4 bg-red-500/20 border border-red-500 text-red-700 dark:text-red-300 px-4 py-3 rounded-lg text-sm flex items-start gap-2"
            >
              <span class="material-symbols-outlined text-lg">block</span>
              <div>
                <p class="font-medium">🚫 Database Limit Reached</p>
                <p class="text-xs mt-1">
                  You've created {{ engineLimit }}/{{ engineLimit }}
                  {{ getEngineName(getEngineNumericId(selectedEngine)) }} databases (active +
                  deactivated). <strong>Restore a deactivated one</strong> or wait 30 days for
                  permanent deletion to free a slot.
                </p>
              </div>
            </div>

            <!-- Section: Choose Database Engine -->
            <div>
              <h3
                class="text-slate-900 dark:text-white text-lg font-bold mb-4 flex items-center gap-2"
              >
                <span class="material-symbols-outlined">dns</span>
                Choose Database Engine
              </h3>
              <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div
                  v-for="engine in databaseEngines"
                  :key="engine.id"
                  @click="selectEngine(engine.id)"
                  class="relative flex flex-col items-center gap-3 p-4 cursor-pointer rounded-xl transition-all border-2"
                  :class="
                    selectedEngine === engine.id
                      ? 'border-primary bg-primary/10 dark:bg-primary/20 scale-105'
                      : 'border-slate-200 dark:border-slate-700 hover:border-primary/50 bg-white dark:bg-[#1a2832]'
                  "
                >
                  <!-- Logo -->
                  <div
                    class="w-16 h-16 bg-center bg-no-repeat bg-cover rounded-lg"
                    :style="`background-image: url('${engine.logo}')`"
                  ></div>

                  <!-- Name & Type -->
                  <div class="text-center">
                    <p
                      class="text-sm font-bold"
                      :class="
                        selectedEngine === engine.id
                          ? 'text-primary'
                          : 'text-slate-900 dark:text-white'
                      "
                    >
                      {{ engine.name }}
                    </p>
                    <p class="text-xs text-slate-500 dark:text-slate-400">
                      {{ engine.type }}
                    </p>
                  </div>

                  <!-- Usage Counter -->
                  <div
                    class="text-xs font-medium px-2 py-1 rounded-full"
                    :class="
                      (dbStore.countByEngine[getEngineNumericId(engine.id)] || 0) >= engineLimit
                        ? 'bg-red-500/20 text-red-600 dark:text-red-400'
                        : 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-400'
                    "
                  >
                    {{ dbStore.countByEngine[getEngineNumericId(engine.id)] || 0 }} /
                    {{ engineLimit }}
                  </div>

                  <!-- Checkmark -->
                  <div
                    v-if="selectedEngine === engine.id"
                    class="absolute top-2 right-2 w-6 h-6 bg-primary rounded-full flex items-center justify-center"
                  >
                    <span class="material-symbols-outlined text-sm text-white">check</span>
                  </div>
                </div>
              </div>
            </div>

            <!-- Info Note -->
            <div
              class="mt-6 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4"
            >
              <div class="flex items-start gap-3">
                <span class="material-symbols-outlined text-blue-600 dark:text-blue-400">info</span>
                <div class="text-sm text-blue-800 dark:text-blue-300">
                  <p class="font-medium mb-1">Auto-Configuration</p>
                  <p>
                    Your database will be created automatically with optimized settings. Connection
                    details will be sent to your email.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Footer -->
        <div
          class="p-6 bg-slate-50 dark:bg-[#1a2832] border-t border-slate-200 dark:border-slate-700"
        >
          <button
            @click="createDatabase"
            :disabled="!selectedEngine || loading || !canCreateDatabase"
            class="w-full flex items-center justify-center gap-2 rounded-lg bg-primary hover:bg-primary/90 h-12 text-white text-base font-bold transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span v-if="loading" class="flex items-center gap-2">
              <div class="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
              Creating Database...
            </span>
            <span v-else-if="!canCreateDatabase" class="flex items-center gap-2">
              <span class="material-symbols-outlined text-lg">block</span>
              Limit Reached - Upgrade Plan
            </span>
            <span v-else-if="!selectedEngine" class="flex items-center gap-2">
              <span class="material-symbols-outlined text-lg">arrow_upward</span>
              Select a Database Engine
            </span>
            <span v-else class="flex items-center gap-2">
              <span class="material-symbols-outlined text-lg">rocket_launch</span>
              Create Database
            </span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useDatabaseStore } from '@/stores/databases'
import { useAuthStore } from '@/stores/auth'
import { useMagicToast } from '@/composables/useMagicToast'
import { DATABASE_ENGINES, getEngineNumericId } from '@/utils/constants/databaseEngines'
import { getEngineName } from '@/utils/constants/database'
import api from '@/services/api'

// Emits
const emit = defineEmits(['close', 'success'])

// Stores
const dbStore = useDatabaseStore()
const authStore = useAuthStore()
const toast = useMagicToast()

// Estados
const loading = ref(false)
const selectedEngine = ref(null)
const userProfile = ref(null)
const loadingProfile = ref(true)

// Engines disponibles
const databaseEngines = DATABASE_ENGINES

// Cargar perfil y bases al montar
onMounted(async () => {
  try {
    await fetchUserProfile()
    await dbStore.fetchDatabases()
    console.log('✅ Perfil y bases de datos cargados correctamente')
  } catch (err) {
    console.error('❌ Error al cargar datos:', err)
  }
})

// Cargar perfil desde API
const fetchUserProfile = async () => {
  try {
    const response = await api.users.getProfile()
    userProfile.value = response.data || response
    authStore.userPlan = userProfile.value?.currentPlanName || 'Free'
  } catch (err) {
    console.error('❌ Error al obtener perfil:', err)
  } finally {
    loadingProfile.value = false
  }
}

// Límite del plan actual según backend
const engineLimit = computed(() => userProfile.value?.databaseLimitPerEngine || 0)

// Advertencia si está cerca del límite
const limitWarning = computed(() => {
  if (!selectedEngine.value || !engineLimit.value) return null
  const numericId = getEngineNumericId(selectedEngine.value)
  const currentCount = dbStore.countByEngine[numericId] || 0
  const limit = engineLimit.value

  if (currentCount === limit - 1) {
    return `⚠️ Last slot! Creating this will reach ${currentCount + 1}/${limit} ${getEngineName(
      numericId,
    )} databases.`
  }
  return null
})

// Verifica si puede crear base de datos
const canCreateDatabase = computed(() => {
  if (!selectedEngine.value || !engineLimit.value) return false
  const numericId = getEngineNumericId(selectedEngine.value)
  const currentCount = dbStore.countByEngine[numericId] || 0
  return currentCount < engineLimit.value
})

// Seleccionar motor
const selectEngine = (engineId) => {
  selectedEngine.value = engineId
}

// Cerrar modal
const closeModal = () => {
  if (!loading.value) emit('close')
}

// Crear base de datos
const createDatabase = async () => {
  if (!selectedEngine.value || !canCreateDatabase.value) return

  const numericEngineId = getEngineNumericId(selectedEngine.value)
  const currentCount = dbStore.countByEngine[numericEngineId] || 0
  const limit = engineLimit.value

  if (currentCount >= limit) {
    const engineName = getEngineName(numericEngineId)
    const planName = authStore.userPlan || 'Free'

    toast.avadaKedavra(
      `🚫 Has alcanzado el límite de bases de datos ${engineName} (${currentCount}/${limit}).\n\n` +
        `Tu plan **${planName}** permite hasta ${limit} bases de datos por motor.\n` +
        `✨ Restaura una desactivada, espera 30 días para liberar espacio o actualiza tu plan.`,
      { title: `Limit Reached - ${engineName}`, duration: 9000 },
    )
    return
  }

  loading.value = true
  try {
    const newDatabase = await dbStore.createDatabase(numericEngineId)
    toast.lumos(
      `¡Base de datos ${getEngineName(numericEngineId)} creada exitosamente! 🎉\nRecibirás las credenciales por correo.`,
      { title: '✨ Database Created', duration: 6000 },
    )
    emit('success', newDatabase)
    closeModal()
  } catch (err) {
    console.error('❌ Error creating database:', err)
    let message = err.message || 'Error al crear la base de datos.'
    if (message.includes('limit') || message.includes('maximum')) {
      message = `🚫 Límite alcanzado para ${getEngineName(
        numericEngineId,
      )}. Espera o actualiza tu plan.`
    }
    toast.expelliarmus(message, { title: '⚡ Error', duration: 8000 })
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.material-symbols-outlined {
  font-variation-settings:
    'FILL' 0,
    'wght' 400,
    'GRAD' 0,
    'opsz' 24;
}
</style>
