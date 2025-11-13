<template>
  <div
    class="relative flex min-h-screen w-full flex-col bg-background-light dark:bg-background-dark"
  >
    <!-- Header -->
    <div
      class="flex items-center border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-[#192b33] dark:md:bg-[#192b33]/95 p-4"
    >
      <h1 class="text-slate-900 dark:text-white text-xl font-bold flex-1">My Profile</h1>
    </div>

    <!-- Main Content -->
    <main class="flex-1 px-4 py-6 max-w-6xl mx-auto w-full">
      <!-- Loading State -->
      <div v-if="loading" class="flex items-center justify-center py-12">
        <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>

      <!-- Content -->
      <div v-else class="space-y-6">
        <!-- User Info Card -->
        <div
          class="bg-white dark:bg-[#192b33] dark:md:bg-[#192b33]/95 rounded-xl p-6 border border-gray-200 dark:border-gray-700"
        >
          <div class="flex items-center gap-4">
            <div class="flex h-16 w-16 items-center justify-center rounded-full bg-primary/20">
              <span class="material-symbols-outlined text-3xl text-primary">person</span>
            </div>
            <div class="flex-1">
              <h2 class="text-2xl font-bold text-slate-900 dark:text-white">
                {{ user.firstName }} {{ user.lastName }}
              </h2>
              <p class="text-slate-600 dark:text-slate-400 mt-1">{{ user.email }}</p>
              <p class="text-slate-500 dark:text-slate-500 text-sm mt-2">
                Member since {{ formatDate(user.memberSince) }}
              </p>
            </div>
          </div>
        </div>

        <!-- Current Plan Card -->
        <div
          class="bg-white dark:bg-[#192b33] dark:md:bg-[#192b33]/95 rounded-xl p-6 border border-gray-200 dark:border-gray-700"
        >
          <div class="flex items-center justify-between mb-6">
            <div>
              <h3 class="text-xl font-bold text-slate-900 dark:text-white">Current Plan</h3>
              <p class="text-slate-600 dark:text-slate-400 text-sm mt-1">
                Manage your subscription and database limits
              </p>
            </div>
            <button
              @click="goToPlans"
              class="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
            >
              <span class="material-symbols-outlined">upgrade</span>
              <span>Change Plan</span>
            </button>
          </div>

          <!-- Plan Badge -->
          <div
            class="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6"
            :class="planBadgeClass"
          >
            <span class="material-symbols-outlined">workspace_premium</span>
            <span class="font-bold">{{ currentPlanName }}</span>
          </div>

          <!-- Database Limits by Engine -->
          <div class="space-y-4">
            <h4 class="text-lg font-semibold text-slate-900 dark:text-white mb-4">
              Database Limits by Engine
            </h4>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div
                v-for="engine in engineStats"
                :key="engine.id"
                class="bg-slate-50 dark:bg-[#0f1a21] rounded-lg p-4 border border-slate-200 dark:border-gray-700"
              >
                <div class="flex items-center justify-between mb-3">
                  <div class="flex items-center gap-3">
                    <div
                      class="w-10 h-10 rounded-lg flex items-center justify-center"
                      :style="{ backgroundColor: engine.color + '20' }"
                    >
                      <span class="text-2xl">{{ engine.icon }}</span>
                    </div>
                    <div>
                      <p class="font-semibold text-slate-900 dark:text-white">{{ engine.name }}</p>
                      <p class="text-xs text-slate-500 dark:text-slate-400">{{ engine.type }}</p>
                    </div>
                  </div>
                  <div class="text-right">
                    <p
                      class="text-2xl font-bold"
                      :class="
                        engine.used >= engine.limit
                          ? 'text-red-500'
                          : 'text-slate-900 dark:text-white'
                      "
                    >
                      {{ engine.used }}
                    </p>
                    <p class="text-xs text-slate-500 dark:text-slate-400">of {{ engine.limit }}</p>
                  </div>
                </div>

                <!-- Progress Bar -->
                <div class="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2">
                  <div
                    class="h-2 rounded-full transition-all duration-300"
                    :style="{
                      width: `${(engine.used / engine.limit) * 100}%`,
                      backgroundColor: engine.used >= engine.limit ? '#ef4444' : engine.color,
                    }"
                  ></div>
                </div>

                <!-- Status Text -->
                <p
                  class="text-xs mt-2"
                  :class="
                    engine.used >= engine.limit
                      ? 'text-red-500 font-medium'
                      : 'text-slate-500 dark:text-slate-400'
                  "
                >
                  {{
                    engine.used >= engine.limit
                      ? '⚠️ Limit reached'
                      : `${engine.limit - engine.used} available`
                  }}
                </p>
              </div>
            </div>
          </div>

          <!-- Plan Benefits -->
          <div class="mt-6 pt-6 border-t border-slate-200 dark:border-gray-700">
            <h4 class="text-lg font-semibold text-slate-900 dark:text-white mb-4">Plan Benefits</h4>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div
                v-for="benefit in planBenefits"
                :key="benefit"
                class="flex items-center gap-2 text-slate-700 dark:text-slate-300"
              >
                <span class="material-symbols-outlined text-green-500">check_circle</span>
                <span class="text-sm">{{ benefit }}</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Account Actions -->
        <div
          class="bg-white dark:bg-[#192b33] dark:md:bg-[#192b33]/95 rounded-xl p-6 border border-gray-200 dark:border-gray-700"
        >
          <h3 class="text-xl font-bold text-slate-900 dark:text-white mb-4">Account Actions</h3>
          <div class="space-y-3">
            <button
              @click="changePassword"
              class="w-full flex items-center justify-between px-4 py-3 rounded-lg border border-slate-300 dark:border-gray-600 hover:bg-slate-50 dark:hover:bg-[#0f1c24] transition-colors"
            >
              <div class="flex items-center gap-3">
                <span class="material-symbols-outlined text-slate-600 dark:text-slate-400"
                  >lock</span
                >
                <span class="text-slate-900 dark:text-white font-medium">Change Password</span>
              </div>
              <span class="material-symbols-outlined text-slate-400">chevron_right</span>
            </button>

            <button
              @click="logout"
              class="w-full flex items-center justify-between px-4 py-3 rounded-lg border border-red-300 dark:border-red-900 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors text-red-600 dark:text-red-400"
            >
              <div class="flex items-center gap-3">
                <span class="material-symbols-outlined">logout</span>
                <span class="font-medium">Sign Out</span>
              </div>
              <span class="material-symbols-outlined">chevron_right</span>
            </button>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { usePlanStore } from '@/stores/plans'
import { useDatabaseStore } from '@/stores/databases'
import { useMagicToast } from '@/composables/useMagicToast'
import { useMagicModal } from '@/composables/useMagicModal'
import {
  ENGINE_TYPES,
  PLAN_TYPES,
  getEngineName,
  getPlanName,
  getPlanLimit,
  getEngineColors,
  getEngineIcon,
} from '@/utils/constants/database'

const router = useRouter()
const authStore = useAuthStore()
const plansStore = usePlanStore()
const dbStore = useDatabaseStore()
const toast = useMagicToast()
const modal = useMagicModal()

const loading = ref(true)

// User data
const user = computed(() => ({
  firstName: authStore.user?.firstName || 'User',
  lastName: authStore.user?.lastName || '',
  email: authStore.user?.email || 'user@example.com',
  memberSince: authStore.user?.memberSince || new Date().toISOString(),
}))

// Current plan info
const currentPlanName = computed(() => {
  if (!plansStore.currentUserPlan) return 'Free Plan'
  return getPlanName(plansStore.currentUserPlan.planType)
})

const planBadgeClass = computed(() => {
  const planType = plansStore.currentUserPlan?.planType || PLAN_TYPES.FREE
  switch (planType) {
    case PLAN_TYPES.FREE:
      return 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300'
    case PLAN_TYPES.INTERMEDIATE:
      return 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300'
    case PLAN_TYPES.ADVANCED:
      return 'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300'
    default:
      return 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300'
  }
})

// Engine statistics
const engineStats = computed(() => {
  const planType = plansStore.currentUserPlan?.planType || PLAN_TYPES.FREE
  const limit = getPlanLimit(planType)

  return Object.values(ENGINE_TYPES).map((engineId) => {
    const name = getEngineName(engineId)
    const used = dbStore.countByEngine[engineId] || 0
    const colors = getEngineColors(engineId)
    const icon = getEngineIcon(engineId)

    return {
      id: engineId,
      name,
      type: name.includes('SQL') ? 'SQL Database' : 'NoSQL Database',
      used,
      limit,
      color: colors.primary,
      icon,
    }
  })
})

// Plan benefits
const planBenefits = computed(() => {
  const planType = plansStore.currentUserPlan?.planType || PLAN_TYPES.FREE
  const limit = getPlanLimit(planType)
  const totalDatabases = limit * 4 // 4 motores

  const benefits = [
    `${limit} databases per engine type`,
    `Up to ${totalDatabases} total databases`,
    'Automatic backups',
    'SSL/TLS encryption',
  ]

  if (planType === PLAN_TYPES.INTERMEDIATE) {
    benefits.push('Priority support', 'Advanced monitoring')
  } else if (planType === PLAN_TYPES.ADVANCED) {
    benefits.push(
      '24/7 Premium support',
      'Advanced monitoring',
      'Custom configurations',
      'Dedicated resources',
    )
  }

  return benefits
})

// Methods
const formatDate = (dateString) => {
  if (!dateString) return 'N/A'
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

const goToPlans = () => {
  router.push('/plans')
}

const changePassword = () => {
  router.push('/change-password')
}

const logout = async () => {
  const confirmed = await modal.obliviate('Are you sure you want to sign out?', {
    confirmText: 'Sign Out',
    cancelText: 'Stay',
    message: 'You will need to log in again to access your account.',
  })

  if (!confirmed) return

  try {
    await authStore.logout()
    toast.spell('You have been signed out successfully. See you soon! 👋', {
      title: '👋 Goodbye',
      duration: 3000,
    })
    router.push('/login')
  } catch (error) {
    console.error('❌ Logout error:', error)
    toast.expelliarmus('Failed to sign out. Please try again.', {
      duration: 4000,
    })
  }
}

// Lifecycle
onMounted(async () => {
  try {
    // Cargar datos de planes y bases de datos
    await Promise.all([plansStore.fetchPlans(), dbStore.fetchDatabases()])
  } catch (error) {
    console.error('❌ Error loading profile data:', error)
    toast.expelliarmus('Failed to load profile data', {
      duration: 4000,
    })
  } finally {
    loading.value = false
  }
})
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
