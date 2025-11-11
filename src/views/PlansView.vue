<template>
  <div
    class="relative flex min-h-screen w-full flex-col bg-background-light dark:bg-background-dark"
  >
    <!-- Header -->
    <div
      class="flex items-center border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-[#192b33] p-4"
    >
      <button
        @click="goBack"
        class="mr-4 p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
      >
        <span class="material-symbols-outlined text-slate-600 dark:text-slate-400">arrow_back</span>
      </button>
      <h1 class="text-slate-900 dark:text-white text-xl font-bold flex-1">Choose Your Plan</h1>
    </div>

    <!-- Main Content -->
    <main class="flex-1 px-4 py-8 max-w-7xl mx-auto w-full">
      <!-- Loading State -->
      <div v-if="loading" class="flex items-center justify-center py-12">
        <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>

      <!-- Content -->
      <div v-else class="space-y-8">
        <!-- Current Plan Banner -->
        <div
          v-if="userPlan"
          class="bg-gradient-to-r from-purple-500/10 to-blue-500/10 dark:from-purple-900/20 dark:to-blue-900/20 rounded-xl p-6 border border-purple-200 dark:border-purple-800"
        >
          <div class="flex items-center gap-3">
            <span class="material-symbols-outlined text-3xl text-purple-600 dark:text-purple-400"
              >workspace_premium</span
            >
            <div>
              <p class="text-slate-600 dark:text-slate-400 text-sm">Your Current Plan</p>
              <h3 class="text-xl font-bold text-slate-900 dark:text-white">
                {{ getPlanName(userPlan.planType) }}
              </h3>
            </div>
          </div>
        </div>

        <!-- Header Text -->
        <div class="text-center mb-8">
          <h2 class="text-3xl font-bold text-slate-900 dark:text-white mb-3">
            Upgrade Your Database Power ⚡
          </h2>
          <p class="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            Choose the perfect plan for your needs. All plans include automatic backups, SSL/TLS
            encryption, and 24/7 uptime monitoring.
          </p>
        </div>

        <!-- Plans Grid -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <!-- FREE PLAN -->
          <div
            class="relative bg-white dark:bg-[#192b33] rounded-2xl border-2 p-6 transition-all duration-300"
            :class="
              userPlan?.planType === PLAN_TYPES.FREE
                ? 'border-blue-500 shadow-lg shadow-blue-500/20'
                : 'border-slate-200 dark:border-gray-700 hover:border-slate-300 dark:hover:border-gray-600'
            "
          >
            <div
              v-if="userPlan?.planType === PLAN_TYPES.FREE"
              class="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-blue-500 text-white text-sm font-bold rounded-full"
            >
              Current Plan
            </div>
            <div class="text-center mb-6">
              <div
                class="inline-flex items-center justify-center w-16 h-16 rounded-full bg-slate-100 dark:bg-slate-800 mb-4"
              >
                <span class="text-3xl">🎓</span>
              </div>
              <h3 class="text-2xl font-bold text-slate-900 dark:text-white mb-2">Free Plan</h3>
              <div class="flex items-baseline justify-center gap-1">
                <span class="text-4xl font-bold text-slate-900 dark:text-white">$0</span>
                <span class="text-slate-600 dark:text-slate-400">/month</span>
              </div>
              <p class="text-sm text-slate-500 dark:text-slate-400 mt-2">
                Perfect for getting started
              </p>
            </div>
            <ul class="space-y-3 mb-6">
              <li class="flex items-start gap-3">
                <span class="material-symbols-outlined text-green-500 mt-0.5">check_circle</span>
                <span class="text-slate-700 dark:text-slate-300 text-sm"
                  ><strong>2 databases</strong> per engine</span
                >
              </li>
              <li class="flex items-start gap-3">
                <span class="material-symbols-outlined text-green-500 mt-0.5">check_circle</span>
                <span class="text-slate-700 dark:text-slate-300 text-sm"
                  >Up to <strong>8 total databases</strong></span
                >
              </li>
              <li class="flex items-start gap-3">
                <span class="material-symbols-outlined text-green-500 mt-0.5">check_circle</span>
                <span class="text-slate-700 dark:text-slate-300 text-sm">Automatic backups</span>
              </li>
              <li class="flex items-start gap-3">
                <span class="material-symbols-outlined text-green-500 mt-0.5">check_circle</span>
                <span class="text-slate-700 dark:text-slate-300 text-sm">SSL/TLS encryption</span>
              </li>
              <li class="flex items-start gap-3">
                <span class="material-symbols-outlined text-green-500 mt-0.5">check_circle</span>
                <span class="text-slate-700 dark:text-slate-300 text-sm">Community support</span>
              </li>
            </ul>
            <button
              v-if="userPlan?.planType === PLAN_TYPES.FREE"
              disabled
              class="w-full py-3 px-4 bg-slate-200 dark:bg-slate-700 text-slate-500 dark:text-slate-400 rounded-lg font-semibold cursor-not-allowed"
            >
              Current Plan
            </button>
            <button
              v-else-if="userPlan?.planType > PLAN_TYPES.FREE"
              @click="handleDowngrade(PLAN_TYPES.FREE)"
              class="w-full py-3 px-4 bg-slate-500 hover:bg-slate-600 text-white rounded-lg font-semibold transition-colors"
            >
              Downgrade to Free
            </button>
          </div>

          <!-- INTERMEDIATE PLAN -->
          <div
            class="relative bg-white dark:bg-[#192b33] rounded-2xl border-2 p-6 transition-all duration-300 transform md:scale-105"
            :class="
              userPlan?.planType === PLAN_TYPES.INTERMEDIATE
                ? 'border-purple-500 shadow-2xl shadow-purple-500/30'
                : 'border-purple-300 dark:border-purple-700 hover:border-purple-400 dark:hover:border-purple-600 shadow-xl'
            "
          >
            <div
              v-if="userPlan?.planType !== PLAN_TYPES.INTERMEDIATE"
              class="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-gradient-to-r from-purple-600 to-blue-600 text-white text-sm font-bold rounded-full"
            >
              ⭐ Most Popular
            </div>
            <div
              v-if="userPlan?.planType === PLAN_TYPES.INTERMEDIATE"
              class="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-purple-500 text-white text-sm font-bold rounded-full"
            >
              Current Plan
            </div>
            <div class="text-center mb-6">
              <div
                class="inline-flex items-center justify-center w-16 h-16 rounded-full bg-purple-100 dark:bg-purple-900/30 mb-4"
              >
                <span class="text-3xl">🚀</span>
              </div>
              <h3 class="text-2xl font-bold text-slate-900 dark:text-white mb-2">
                Intermediate Plan
              </h3>
              <div class="flex items-baseline justify-center gap-1">
                <span class="text-4xl font-bold text-purple-600 dark:text-purple-400">{{
                  formatPrice(getPlanPrice(PLAN_TYPES.INTERMEDIATE))
                }}</span>
                <span class="text-slate-600 dark:text-slate-400">/month</span>
              </div>
              <p class="text-sm text-slate-500 dark:text-slate-400 mt-2">
                For growing applications
              </p>
            </div>
            <ul class="space-y-3 mb-6">
              <li class="flex items-start gap-3">
                <span class="material-symbols-outlined text-green-500 mt-0.5">check_circle</span>
                <span class="text-slate-700 dark:text-slate-300 text-sm"
                  ><strong>5 databases</strong> per engine</span
                >
              </li>
              <li class="flex items-start gap-3">
                <span class="material-symbols-outlined text-green-500 mt-0.5">check_circle</span>
                <span class="text-slate-700 dark:text-slate-300 text-sm"
                  >Up to <strong>20 total databases</strong></span
                >
              </li>
              <li class="flex items-start gap-3">
                <span class="material-symbols-outlined text-green-500 mt-0.5">check_circle</span>
                <span class="text-slate-700 dark:text-slate-300 text-sm">Automatic backups</span>
              </li>
              <li class="flex items-start gap-3">
                <span class="material-symbols-outlined text-green-500 mt-0.5">check_circle</span>
                <span class="text-slate-700 dark:text-slate-300 text-sm">SSL/TLS encryption</span>
              </li>
              <li class="flex items-start gap-3">
                <span class="material-symbols-outlined text-green-500 mt-0.5">check_circle</span>
                <span class="text-slate-700 dark:text-slate-300 text-sm"
                  ><strong>Priority support</strong></span
                >
              </li>
              <li class="flex items-start gap-3">
                <span class="material-symbols-outlined text-green-500 mt-0.5">check_circle</span>
                <span class="text-slate-700 dark:text-slate-300 text-sm"
                  ><strong>Advanced monitoring</strong></span
                >
              </li>
            </ul>
            <button
              v-if="userPlan?.planType === PLAN_TYPES.INTERMEDIATE"
              disabled
              class="w-full py-3 px-4 bg-purple-200 dark:bg-purple-900/50 text-purple-700 dark:text-purple-300 rounded-lg font-semibold cursor-not-allowed"
            >
              Current Plan
            </button>
            <button
              v-else-if="!userPlan || userPlan?.planType < PLAN_TYPES.INTERMEDIATE"
              @click="handleUpgrade(PLAN_TYPES.INTERMEDIATE)"
              :disabled="processingPayment"
              class="w-full py-3 px-4 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white rounded-lg font-semibold transition-all shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span v-if="processingPayment">Processing...</span>
              <span v-else>Upgrade Now 🚀</span>
            </button>
            <button
              v-else
              @click="handleDowngrade(PLAN_TYPES.INTERMEDIATE)"
              class="w-full py-3 px-4 bg-slate-500 hover:bg-slate-600 text-white rounded-lg font-semibold transition-colors"
            >
              Downgrade to Intermediate
            </button>
          </div>

          <!-- ADVANCED PLAN -->
          <div
            class="relative bg-white dark:bg-[#192b33] rounded-2xl border-2 p-6 transition-all duration-300"
            :class="
              userPlan?.planType === PLAN_TYPES.ADVANCED
                ? 'border-yellow-500 shadow-lg shadow-yellow-500/20'
                : 'border-slate-200 dark:border-gray-700 hover:border-slate-300 dark:hover:border-gray-600'
            "
          >
            <div
              v-if="userPlan?.planType === PLAN_TYPES.ADVANCED"
              class="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-yellow-500 text-slate-900 text-sm font-bold rounded-full"
            >
              Current Plan
            </div>
            <div class="text-center mb-6">
              <div
                class="inline-flex items-center justify-center w-16 h-16 rounded-full bg-yellow-100 dark:bg-yellow-900/30 mb-4"
              >
                <span class="text-3xl">👑</span>
              </div>
              <h3 class="text-2xl font-bold text-slate-900 dark:text-white mb-2">Advanced Plan</h3>
              <div class="flex items-baseline justify-center gap-1">
                <span class="text-4xl font-bold text-yellow-600 dark:text-yellow-400">{{
                  formatPrice(getPlanPrice(PLAN_TYPES.ADVANCED))
                }}</span>
                <span class="text-slate-600 dark:text-slate-400">/month</span>
              </div>
              <p class="text-sm text-slate-500 dark:text-slate-400 mt-2">
                For enterprise applications
              </p>
            </div>
            <ul class="space-y-3 mb-6">
              <li class="flex items-start gap-3">
                <span class="material-symbols-outlined text-green-500 mt-0.5">check_circle</span>
                <span class="text-slate-700 dark:text-slate-300 text-sm"
                  ><strong>10 databases</strong> per engine</span
                >
              </li>
              <li class="flex items-start gap-3">
                <span class="material-symbols-outlined text-green-500 mt-0.5">check_circle</span>
                <span class="text-slate-700 dark:text-slate-300 text-sm"
                  >Up to <strong>40 total databases</strong></span
                >
              </li>
              <li class="flex items-start gap-3">
                <span class="material-symbols-outlined text-green-500 mt-0.5">check_circle</span>
                <span class="text-slate-700 dark:text-slate-300 text-sm">Automatic backups</span>
              </li>
              <li class="flex items-start gap-3">
                <span class="material-symbols-outlined text-green-500 mt-0.5">check_circle</span>
                <span class="text-slate-700 dark:text-slate-300 text-sm">SSL/TLS encryption</span>
              </li>
              <li class="flex items-start gap-3">
                <span class="material-symbols-outlined text-green-500 mt-0.5">check_circle</span>
                <span class="text-slate-700 dark:text-slate-300 text-sm"
                  ><strong>24/7 Premium support</strong></span
                >
              </li>
              <li class="flex items-start gap-3">
                <span class="material-symbols-outlined text-green-500 mt-0.5">check_circle</span>
                <span class="text-slate-700 dark:text-slate-300 text-sm"
                  ><strong>Advanced monitoring</strong></span
                >
              </li>
              <li class="flex items-start gap-3">
                <span class="material-symbols-outlined text-green-500 mt-0.5">check_circle</span>
                <span class="text-slate-700 dark:text-slate-300 text-sm"
                  ><strong>Custom configurations</strong></span
                >
              </li>
              <li class="flex items-start gap-3">
                <span class="material-symbols-outlined text-green-500 mt-0.5">check_circle</span>
                <span class="text-slate-700 dark:text-slate-300 text-sm"
                  ><strong>Dedicated resources</strong></span
                >
              </li>
            </ul>
            <button
              v-if="userPlan?.planType === PLAN_TYPES.ADVANCED"
              disabled
              class="w-full py-3 px-4 bg-yellow-200 dark:bg-yellow-900/50 text-yellow-700 dark:text-yellow-300 rounded-lg font-semibold cursor-not-allowed"
            >
              Current Plan
            </button>
            <button
              v-else
              @click="handleUpgrade(PLAN_TYPES.ADVANCED)"
              :disabled="processingPayment"
              class="w-full py-3 px-4 bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-slate-900 rounded-lg font-semibold transition-all shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span v-if="processingPayment">Processing...</span>
              <span v-else>Upgrade Now 👑</span>
            </button>
          </div>
        </div>

        <!-- FAQ Section -->
        <div
          class="mt-12 bg-white dark:bg-[#192b33] rounded-xl p-6 border border-gray-200 dark:border-gray-700"
        >
          <h3 class="text-xl font-bold text-slate-900 dark:text-white mb-4">
            Frequently Asked Questions
          </h3>
          <div class="space-y-4">
            <div>
              <h4 class="font-semibold text-slate-900 dark:text-white mb-2">
                ¿Puedo cambiar de plan en cualquier momento?
              </h4>
              <p class="text-slate-600 dark:text-slate-400 text-sm">
                Sí, puedes actualizar o degradar tu plan en cualquier momento. Los cambios se
                aplican inmediatamente.
              </p>
            </div>
            <div>
              <h4 class="font-semibold text-slate-900 dark:text-white mb-2">
                ¿Qué sucede con mis bases de datos si bajo de plan?
              </h4>
              <p class="text-slate-600 dark:text-slate-400 text-sm">
                Tus bases de datos existentes permanecerán intactas, pero no podrás crear nuevas
                hasta que estés dentro del límite de tu nuevo plan.
              </p>
            </div>
            <div>
              <h4 class="font-semibold text-slate-900 dark:text-white mb-2">
                ¿Cómo funciona el pago?
              </h4>
              <p class="text-slate-600 dark:text-slate-400 text-sm">
                Los pagos se procesan de forma segura a través de MercadoPago. Puedes pagar con
                tarjeta de crédito, débito o PSE.
              </p>
            </div>
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
import { useMagicToast } from '@/composables/useMagicToast'
import { useMagicModal } from '@/composables/useMagicModal'
import paymentService from '@/services/paymentService'
import { PLAN_TYPES, getPlanName, getPlanPrice, formatPrice } from '@/utils/constants/database'

const router = useRouter()
const authStore = useAuthStore()
const planStore = usePlanStore()
const toast = useMagicToast()
const modal = useMagicModal()

const loading = ref(true)
const processingPayment = ref(false)

const userPlan = computed(() => authStore.user?.userPlan)

const goBack = () => {
  router.push('/profile')
}

const handleUpgrade = async (targetPlanType) => {
  const targetPlan = planStore.findPlanByType(targetPlanType)

  if (!targetPlan) {
    toast.expelliarmus('Plan not found. Please try again.', {
      duration: 4000,
    })
    return
  }

  const planName = getPlanName(targetPlanType)
  const planPrice = formatPrice(getPlanPrice(targetPlanType))

  const confirmed = await modal.alohomora(`Upgrade to ${planName}?`, {
    confirmText: 'Proceed to Payment',
    cancelText: 'Cancel',
    message: `You will be redirected to MercadoPago to complete the payment of ${planPrice}/month. Your plan will be activated immediately after successful payment.`,
  })

  if (!confirmed) return

  processingPayment.value = true

  try {
    const result = await paymentService.createPaymentPreference(targetPlan.id)

    if (result.success && result.initPoint) {
      toast.lumos('Redirecting to MercadoPago... 🔐', {
        title: '✨ Processing Payment',
        duration: 2000,
      })

      setTimeout(() => {
        paymentService.redirectToPayment(result.initPoint)
      }, 1000)
    } else {
      throw new Error('Failed to create payment preference')
    }
  } catch (error) {
    console.error('❌ Error creating payment:', error)
    toast.avadaKedavra(error.message || 'Failed to process payment. Please try again.', {
      duration: 5000,
    })
    processingPayment.value = false
  }
}

const handleDowngrade = async (targetPlanType) => {
  const planName = getPlanName(targetPlanType)

  const confirmed = await modal.obliviate(`Downgrade to ${planName}?`, {
    confirmText: 'Confirm Downgrade',
    cancelText: 'Keep Current Plan',
    message:
      targetPlanType === PLAN_TYPES.FREE
        ? "You will lose access to premium features, but your existing databases will remain safe. You won't be able to create new databases if you exceed the Free plan limits."
        : 'Your existing databases will remain safe, but you will have reduced limits for creating new databases.',
  })

  if (!confirmed) return

  toast.spell('Downgrades are not yet implemented. Contact support for assistance.', {
    title: '🔧 Coming Soon',
    duration: 4000,
  })
}

onMounted(async () => {
  try {
    await planStore.fetchPlans()
  } catch (error) {
    console.error('❌ Error loading plans:', error)
    toast.expelliarmus('Failed to load plans', {
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
