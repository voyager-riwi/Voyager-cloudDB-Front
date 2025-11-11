<template>
  <div class="fixed inset-0 z-50 overflow-y-auto">
    <!-- Overlay de fondo -->
    <div class="fixed inset-0 bg-opacity-50 transition-opacity" @click="closeModal"></div>

    <!-- Contenido del modal -->
    <div
      class="modal relative min-h-screen flex items-center justify-center p-4 bg-white/10 backdrop-blur-md"
    >
      <div
        class="relative bg-[#192b33] dark:bg-background-dark rounded-xl w-full max-w-2xl max-h-[90vh] overflow-hidden"
      >
        <!-- Header -->
        <div class="flex items-center p-4 border-b border-slate-200 dark:border-slate-700">
          <button
            @click="closeModal"
            class="text-slate-800 dark:text-white flex size-10 shrink-0 items-center justify-center hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
          >
            <span class="material-symbols-outlined text-xl">close</span>
          </button>
          <h2 class="text-slate-900 dark:text-white text-lg font-bold flex-1 text-center">
            Create New Database
          </h2>
          <div class="w-10"></div>
          <!-- Espacio para balancear -->
        </div>

        <!-- Contenido scrollable -->
        <div class="overflow-y-auto max-h-[calc(90vh-120px)]">
          <!-- Loading State -->
          <div v-if="loading" class="flex items-center justify-center py-8">
            <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>

          <!-- Error Message -->
          <div
            v-if="error"
            class="mx-4 my-2 bg-red-500/20 border border-red-500 text-red-700 dark:text-red-300 px-4 py-3 rounded text-sm"
          >
            ❌ {{ error }}
          </div>

          <!-- Success Message -->
          <div
            v-if="success"
            class="mx-4 my-2 bg-green-500/20 border border-green-500 text-green-700 dark:text-green-300 px-4 py-3 rounded text-sm"
          >
            ✅ {{ success }}
          </div>

          <!-- Section 1: Choose Database Engine -->
          <div class="px-4">
            <h3
              class="text-slate-900 dark:text-white text-lg font-bold leading-tight tracking-[-0.015em] pb-2 pt-4"
            >
              Choose Database Engine
            </h3>
            <div class="grid grid-cols-[repeat(auto-fit,minmax(158px,1fr))] gap-3 pt-2">
              <div
                v-for="engine in databaseEngines"
                :key="engine.id"
                @click="selectEngine(engine)"
                class="flex flex-col gap-3 pb-3 cursor-pointer rounded-xl p-2 transition-all border-2"
                :class="
                  form.engine === engine.id
                    ? 'border-primary bg-primary/10 dark:bg-primary/20'
                    : 'border-transparent hover:border-primary/50 bg-white dark:bg-[#192b33]'
                "
              >
                <div
                  class="w-full bg-center bg-no-repeat aspect-square bg-cover rounded-lg"
                  :style="`background-image: url('${engine.logo}')`"
                ></div>
                <div>
                  <p class="text-slate-900 dark:text-white text-base font-medium leading-normal">
                    {{ engine.name }}
                  </p>
                  <p class="text-slate-500 dark:text-[#92b7c9] text-sm font-normal leading-normal">
                    {{ engine.type }}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <!-- Section 2: Configure Instance -->
          <div class="px-4">
            <h3
              class="text-slate-900 dark:text-white text-lg font-bold leading-tight tracking-[-0.015em] pb-2 pt-4"
            >
              Configure Your Instance
            </h3>
            <div class="flex flex-col gap-4 py-3">
              <label class="flex flex-col w-full">
                <p class="text-slate-800 dark:text-white text-base font-medium leading-normal pb-2">
                  Instance Name
                </p>
                <input
                  v-model="form.name"
                  class="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-slate-900 dark:text-white focus:outline-0 focus:ring-2 focus:ring-primary border border-slate-300 dark:border-[#325567] bg-white dark:bg-[#192b33] focus:border-primary h-14 placeholder:text-slate-400 dark:placeholder:text-[#92b7c9] p-[15px] text-base font-normal leading-normal"
                  placeholder="Enter a name for your instance"
                  :disabled="loading"
                />
              </label>
              <label class="flex flex-col w-full">
                <p class="text-slate-800 dark:text-white text-base font-medium leading-normal pb-2">
                  Select Region
                </p>
                <select
                  v-model="form.region"
                  class="form-select w-full appearance-none rounded-lg border border-slate-300 dark:border-[#325567] bg-white dark:bg-[#192b33] px-4 py-3 text-slate-900 dark:text-white h-14 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary"
                  :disabled="loading"
                >
                  <option v-for="region in regions" :key="region.id" :value="region.id">
                    {{ region.name }}
                  </option>
                </select>
              </label>
            </div>
          </div>

          <!-- Section 3: Select Plan -->
          <div class="px-4 mb-30">
            <h3
              class="text-slate-900 dark:text-white text-lg font-bold leading-tight tracking-[-0.015em] pb-2 pt-4"
            >
              Select a Plan
            </h3>
            <div class="flex flex-col gap-3 py-3">
              <div
                v-for="plan in plans"
                :key="plan.id"
                @click="selectPlan(plan)"
                class="flex cursor-pointer items-center justify-between rounded-lg border p-4 transition-all"
                :class="
                  form.plan === plan.id
                    ? 'border-2 border-primary bg-primary/10 dark:bg-primary/20'
                    : 'border-slate-300 dark:border-[#325567] bg-white dark:bg-[#192b33] hover:border-primary/50'
                "
              >
                <div>
                  <p
                    :class="
                      form.plan === plan.id
                        ? 'font-medium text-primary'
                        : 'font-medium text-slate-900 dark:text-white'
                    "
                  >
                    {{ plan.name }}
                  </p>
                  <p class="text-sm text-slate-500 dark:text-slate-400">
                    {{ plan.specs }}
                  </p>
                </div>
                <div
                  class="flex h-5 w-5 items-center justify-center rounded-full border-2"
                  :class="
                    form.plan === plan.id
                      ? 'border-primary bg-primary'
                      : 'border-slate-400 dark:border-slate-500'
                  "
                >
                  <span
                    v-if="form.plan === plan.id"
                    class="material-symbols-outlined text-sm text-white"
                  >
                    check
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Footer fijo -->
        <div
          class="sticky bottom-0 p-4 bg-background-light dark:bg-background-dark border-t border-slate-200 dark:border-slate-700"
        >
          <button
            @click="createDatabase"
            :disabled="!isFormValid || loading"
            class="cursor-pointer flex w-full items-center justify-center rounded-lg bg-blue-50 h-12 text-black text-base font-bold transition-all disabled:opacity-50 disabled:cursor-not-allowed hover:bg-primary/90"
          >
            <span v-if="loading" class="flex items-center gap-2">
              <div class="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
              Creating...
            </span>
            <span v-else>Create Database</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, reactive } from 'vue'
import api from '@/services/api'
import { DATABASE_ENGINES } from '@/utils/constants/databaseEngines'

// Define los emits
const emit = defineEmits(['close', 'success'])

// Estados
const loading = ref(false)
const error = ref('')
const success = ref('')

// Datos del formulario
const form = reactive({
  engine: '',
  name: '',
  region: '',
  plan: '',
})

// Usar los engines desde las constantes
const databaseEngines = ref(DATABASE_ENGINES)

const regions = ref([
  { id: 'us-east-1', name: 'US-East-1 (N. Virginia)' },
  { id: 'us-west-2', name: 'US-West-2 (Oregon)' },
  { id: 'eu-west-1', name: 'EU-West-1 (Ireland)' },
  { id: 'ap-northeast-1', name: 'AP-Northeast-1 (Tokyo)' },
])

const plans = ref([
  {
    id: 'development',
    name: 'Development',
    specs: '1 vCPU, 2GB RAM, 25GB SSD',
    cpu: 1,
    ram: 2,
    storage: 25,
  },
  {
    id: 'production',
    name: 'Production',
    specs: '4 vCPU, 16GB RAM, 100GB SSD',
    cpu: 4,
    ram: 16,
    storage: 100,
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    specs: '8 vCPU, 32GB RAM, 500GB SSD',
    cpu: 8,
    ram: 32,
    storage: 500,
  },
])

// Computed
const isFormValid = computed(() => {
  return form.engine && form.name && form.region && form.plan
})

// Obtener el motor seleccionado para mostrar información adicional
const selectedEngineInfo = computed(() => {
  return databaseEngines.value.find((engine) => engine.id === form.engine)
})

// Métodos
const selectEngine = (engine) => {
  form.engine = engine.id
}

const selectPlan = (plan) => {
  form.plan = plan.id
}

const closeModal = () => {
  emit('close')
}

const createDatabase = async () => {
  if (!isFormValid.value) {
    error.value = 'Please fill all required fields'
    return
  }

  loading.value = true
  error.value = ''
  success.value = ''

  try {
    // Obtener los detalles del plan seleccionado
    const selectedPlan = plans.value.find((p) => p.id === form.plan)
    const selectedEngine = databaseEngines.value.find((e) => e.id === form.engine)

    const databaseData = {
      engine: form.engine,
      engine_name: selectedEngine?.name,
      engine_type: selectedEngine?.type,
      name: form.name,
      region: form.region,
      plan: form.plan,
      cpu: selectedPlan?.cpu,
      ram: selectedPlan?.ram,
      storage: selectedPlan?.storage,
      port: selectedEngine?.defaultPort || 5432, // Usar puerto por defecto del engine
    }

    console.log('Database data collected:', databaseData)

    // Llamar a la API para crear la base de datos
    console.log('Creating database with data:', databaseData)
    const response = await api.databases.create(databaseData)

    success.value = `Database ${form.name} created successfully with ${selectedEngine?.name}!`

    // Emitir el evento de éxito con los datos completos
    emit('success', {
      id: response.data?.id || Date.now(), // ID temporal si la API no devuelve uno
      name: form.name,
      engine: form.engine,
      engine_name: selectedEngine?.name,
      engine_type: selectedEngine?.type,
      region: form.region,
      plan: form.plan,
      status: 'creating',
      created_at: new Date().toISOString(),
    })

    // Cerrar el modal después de 2 segundos
    setTimeout(() => {
      closeModal()
    }, 2000)
  } catch (err) {
    error.value = err.response?.data?.message || 'Error creating database. Please try again.'
    console.error('Error creating database:', err)
  } finally {
    loading.value = false
  }
}

// Manejar error de imagen del logo
const handleImageError = (event) => {
  const target = event.target
  target.src =
    'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjYwIiBoZWlnaHQ9IjYwIiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik0zMCAxOEMyMy4zNzMgMTggMTggMjMuMzczIDE4IDMwQzE4IDM2LjYyNyAyMy4zNzMgNDIgMzAgNDJDMzYuNjI3IDQyIDQyIDM2LjYyNyA0MiAzMEM0MiAyMy4zNzMgMzYuNjI3IDE4IDMwIDE4Wk0zMy41IDMzLjc1SDI2LjVWMjYuMjVIMzMuNVYzMy43NVpNMzAgMTVDMzMuODY2IDM0IDM0IDMzLjg2NiAzNCAzMEMzNCAyNi4xMzQgMzEuODY2IDI0IDI4IDI0QzI0LjEzNCAyNCAyMiAyNi4xMzQgMjIgMzBDMjIgMzMuODY2IDI0LjEzNCAzNiAyOCAzNkMzMS44NjYgMzYgMzQgMzMuODY2IDM0IDMwQzM0IDI2LjEzNCAzMS44NjYgMjQgMjggMjRaIiBmaWxsPSIjOEM5NkFCIi8+Cjwvc3ZnPgo='
}

// Inicializar valores por defecto
form.region = regions.value[0].id
form.plan = plans.value[1].id // Production por defecto

// Si quieres seleccionar un engine por defecto, puedes hacerlo así:
// form.engine = databaseEngines.value[0].id // MySQL por defecto
</script>

<style scoped>
.modal {
  background-image: url('../../assets/images/dashboard_profile_bg.jpg');
}
.material-symbols-outlined {
  font-variation-settings:
    'FILL' 0,
    'wght' 400,
    'GRAD' 0,
    'opsz' 24;
}

.form-select {
  background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%2392b7c9' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e");
  background-position: right 0.5rem center;
  background-repeat: no-repeat;
  background-size: 1.5em 1.5em;
  padding-right: 2.5rem;
  -webkit-print-color-adjust: exact;
  color-adjust: exact;
  print-color-adjust: exact;
}
</style>
