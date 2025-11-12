<template>
  <div
    class="relative min-h-screen w-full bg-[#F4F7FA] dashboard font-sans text-gray-800 dark:text-gray-200"
  >
    <header
      class="sticky top-0 z-10 flex items-center justify-between border-b border-gray-200/10 bg-[#F4F7FA]/80 p-4 backdrop-blur-sm dark:bg-[#101c22]/80"
    >
      <div class="flex items-center gap-2">
        <span class="material-symbols-outlined text-[#4A90E2] text-3xl">cloud_queue</span>
        <h1 class="text-lg font-bold leading-tight tracking-tighter text-gray-900 dark:text-white">
          {{ appName }}
        </h1>
      </div>
      <button
        @click="goBack"
        class="flex h-10 w-10 cursor-pointer items-center justify-center overflow-hidden rounded-full bg-gray-200 text-gray-600 dark:bg-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
      >
        <span class="material-symbols-outlined">arrow_back</span>
      </button>
    </header>

    <main class="p-4 pb-24 sm:p-6">
      <div class="mx-auto max-w-6xl space-y-8 mt-16 md:mt-20">
        <div class="text-center">
          <h2 class="text-3xl font-extrabold text-gray-900 dark:text-white sm:text-4xl">
            Elige el Plan Perfecto
          </h2>
          <p class="mt-4 text-lg text-gray-500 dark:text-gray-400">
            Escala tus bases de datos con el plan que mejor se adapte a tus necesidades.
          </p>
        </div>

        <div v-if="loading" class="flex flex-col items-center justify-center py-20">
          <div class="animate-spin rounded-full h-12 border-b-2 border-[#4A90E2] mb-4"></div>
          <p class="text-gray-500 dark:text-gray-400">Cargando planes disponibles...</p>
        </div>

        <div
          v-else-if="error"
          class="rounded-xl border border-red-200 bg-red-50 p-6 text-center dark:border-red-800 dark:bg-red-900/20"
        >
          <span class="material-symbols-outlined text-red-500 text-4xl mb-3">error</span>
          <h3 class="text-lg font-semibold text-red-800 dark:text-red-200 mb-2">
            Error al cargar planes
          </h3>
          <p class="text-red-600 dark:text-red-300 mb-4">{{ error }}</p>
          <button
            @click="fetchPlans"
            class="inline-flex items-center gap-2 rounded-lg bg-red-600 px-4 py-2 text-white hover:bg-red-700 transition-colors"
          >
            <span class="material-symbols-outlined text-base">refresh</span>
            Reintentar
          </button>
        </div>

        <div v-else class="grid grid-cols-1 gap-6 md:grid-cols-3 xl:gap-8">
          <div
            v-for="plan in plans"
            :key="plan.id"
            class="flex flex-col rounded-xl border-2 p-5 shadow-xl transition-all duration-300"
            :class="getPlanCardClasses(plan.planType)"
          >
            <div class="mb-5">
              <span
                class="inline-block rounded-full px-2.5 py-0.5 text-xs font-semibold uppercase"
                :class="getBadgeClasses(plan.planType)"
              >
                {{ plan.planType }}
              </span>
              <h3
                class="mt-1.5 text-2xl font-bold leading-none"
                :class="{ 'text-[#4A90E2] dark:text-[#4A90E2]': plan.planType === 'Intermediate' }"
              >
                {{ plan.name }}
              </h3>
            </div>

            <div class="mb-6">
              <span class="text-4xl font-extrabold tracking-tight">
                {{ formatCurrency(plan.price) }}
              </span>
              <span class="text-lg font-medium text-gray-500 dark:text-gray-400">/mes</span>
              <p
                v-if="plan.planType === 'Free'"
                class="text-sm text-gray-500 dark:text-gray-400 mt-1.5"
              >
                Ideal para empezar y probar la plataforma.
              </p>
            </div>

            <ul class="mb-8 flex-grow space-y-2.5">
              <li class="flex items-center gap-2.5">
                <span
                  class="material-symbols-outlined text-base"
                  :class="getFeatureIconColor(plan.planType)"
                >
                  <template v-if="plan.databaseLimitPerEngine > 0">database</template>
                  <template v-else>close</template>
                </span>
                <span class="text-gray-700 dark:text-gray-300 text-sm">
                  <template v-if="plan.databaseLimitPerEngine === 1"
                    >1 Base de Datos por Motor</template
                  >
                  <template v-else-if="plan.databaseLimitPerEngine > 1"
                    >{{ plan.databaseLimitPerEngine }} Bases de Datos por Motor</template
                  >
                  <template v-else>Acceso limitado a Bases de Datos</template>
                </span>
              </li>

              <li class="flex items-center gap-2.5">
                <span
                  class="material-symbols-outlined text-base"
                  :class="getFeatureIconColor(plan.planType)"
                >
                  {{ plan.planType !== 'Free' ? 'check' : 'close' }}
                </span>
                <span class="text-gray-700 dark:text-gray-300 text-sm">
                  {{ plan.planType !== 'Free' ? 'Soporte Prioritario' : 'Soporte Estándar' }}
                </span>
              </li>
              <li class="flex items-center gap-2.5">
                <span
                  class="material-symbols-outlined text-base"
                  :class="getFeatureIconColor(plan.planType)"
                >
                  {{ plan.planType === 'Advanced' ? 'speed' : 'bolt' }}
                </span>
                <span class="text-gray-700 dark:text-gray-300 text-sm">
                  {{
                    plan.planType === 'Advanced' ? 'Alta Disponibilidad' : 'Disponibilidad Estándar'
                  }}
                </span>
              </li>
            </ul>

            <button
              @click="selectPlan(plan)"
              :disabled="plan.planType === 'Intermediate'"
              class="mt-auto h-11 w-full rounded-lg text-sm font-semibold shadow-md transition-all duration-200"
              :class="getButtonClasses(plan.planType)"
            >
              <template v-if="plan.planType === 'Intermediate'"> Plan Actual </template>
              <template v-else> Elegir {{ plan.name }} </template>
            </button>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import api from '@/services/api'
import env from '@/config/env'

const router = useRouter()
const appName = env.app.name
const plans = ref([])
const loading = ref(true)
const error = ref('')

const currentPlanType = ref('Intermediate')

const fetchPlans = async () => {
  loading.value = true
  error.value = ''
  try {
    const response = await api.plans.list()
    plans.value = response.data || response

    const order = { Free: 1, Intermediate: 2, Advanced: 3 }
    plans.value.sort((a, b) => (order[a.planType] || 4) - (order[b.planType] || 4))
  } catch (err) {
    console.error('Error fetching plans:', err)
    error.value = 'No se pudieron cargar los planes. Inténtalo de nuevo más tarde.'
  } finally {
    loading.value = false
  }
}

const formatCurrency = (price) => {
  if (price === 0) return 'Gratis'
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price)
}

const getPlanCardClasses = (planType) => {
  const base = 'bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800 hover:shadow-xl'
  if (planType === currentPlanType.value) {
    return `${base} border-[#4A90E2] dark:border-[#4A90E2]/80 shadow-2xl scale-[1.01] transform` // Reducida la escala
  }
  return base
}

const getBadgeClasses = (planType) => {
  if (planType === 'Free') return 'bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-300'
  if (planType === 'Intermediate')
    return 'bg-[#4A90E2]/20 text-[#4A90E2] dark:bg-[#4A90E2]/30 font-bold'
  if (planType === 'Advanced') return 'bg-green-500/20 text-green-500 dark:bg-green-700/30'
  return ''
}

const getButtonClasses = (planType) => {
  if (planType === currentPlanType.value) {
    return 'bg-gray-400 text-white cursor-not-allowed opacity-80'
  }
  if (planType === 'Free') {
    return 'bg-gray-100 text-gray-700 border border-gray-300 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600 dark:hover:bg-gray-600'
  }
  if (planType === 'Advanced') {
    return 'bg-green-500 text-white hover:bg-green-600'
  }
  return 'bg-[#4A90E2] text-white hover:bg-[#4A90E2]/90'
}

const getFeatureIconColor = (planType) => {
  if (planType === 'Free') return 'text-gray-400 dark:text-gray-500'
  if (planType === 'Intermediate') return 'text-[#4A90E2]'
  if (planType === 'Advanced') return 'text-green-500'
  return 'text-gray-400'
}

const selectPlan = (plan) => {
  if (plan.planType === currentPlanType.value) {
    alert(`Ya tienes el plan ${plan.name} activo.`)
    return
  }

  console.log(`Seleccionado plan: ${plan.name} (${plan.id})`)
  alert(`Iniciando proceso de actualización al plan ${plan.name}.`)
}

const goBack = () => {
  router.back()
}

onMounted(() => {
  fetchPlans()
})
</script>

<style scoped>
/* Estilos adicionales si fueran necesarios */
.material-symbols-outlined {
  font-size: 18px; /* Ajuste para iconos de características */
}

.dashboard {
  /* Reutiliza el fondo de tu dashboard */
  background-image: url('@/assets/images/dashboard_bg.png');
  background-position: center;
  background-size: cover;
}
</style>
