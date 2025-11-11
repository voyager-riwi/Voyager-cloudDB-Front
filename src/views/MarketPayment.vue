<template>
  <div class="min-h-screen bg-background-light dark:bg-background-dark font-display">
    <!-- TopAppBar -->
    <header
      class="flex items-center bg-background-light dark:bg-background-dark p-4 pb-2 justify-between sticky top-0 z-10 border-b border-white/10"
    >
      <button
        class="text-text-primary-light dark:text-text-primary-dark flex size-10 shrink-0 items-center justify-center rounded-full hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
        @click="$router.back()"
      >
        <span class="material-symbols-outlined text-2xl">arrow_back</span>
      </button>
      <h1
        class="text-text-primary-light dark:text-text-primary-dark text-lg font-bold leading-tight tracking-[-0.015em] flex-1 text-center"
      >
        My Subscription
      </h1>
      <div class="w-10"></div>
      <!-- Spacer -->
    </header>

    <main class="flex-grow p-4">
      <!-- Plan Summary Card -->
      <section
        class="flex flex-col items-stretch justify-start rounded-xl bg-card-light dark:bg-card-dark shadow-sm"
      >
        <div class="flex w-full min-w-72 grow flex-col items-stretch justify-center gap-2 p-6">
          <div class="flex items-start justify-between">
            <div>
              <p
                class="text-text-primary-light dark:text-text-primary-dark text-xl font-bold leading-tight tracking-[-0.015em]"
              >
                {{ subscription.planName }}
              </p>
              <p
                class="text-text-secondary-light dark:text-text-secondary-dark text-base font-normal leading-normal mt-1"
              >
                {{ subscription.price }}/month
              </p>
            </div>
            <div
              class="flex h-8 shrink-0 items-center justify-center gap-x-2 rounded-full bg-success/10 dark:bg-success/20 px-3 py-1"
            >
              <span class="material-symbols-outlined text-success text-base">check_circle</span>
              <p class="text-success text-sm font-medium leading-normal">
                {{ subscription.status }}
              </p>
            </div>
          </div>
        </div>
      </section>

      <!-- Billing Details Section -->
      <section class="mt-8">
        <h2
          class="text-text-primary-light dark:text-text-primary-dark text-lg font-bold leading-tight tracking-[-0.015em] px-2 pb-2"
        >
          Billing Details
        </h2>
        <div class="bg-card-light dark:bg-card-dark rounded-xl shadow-sm p-4">
          <div
            class="flex justify-between gap-x-6 py-3 border-b border-black/5 dark:border-white/10"
          >
            <p
              class="text-text-secondary-light dark:text-text-secondary-dark text-sm font-normal leading-normal"
            >
              Next Billing Date
            </p>
            <p
              class="text-text-primary-light dark:text-text-primary-dark text-sm font-medium leading-normal text-right"
            >
              {{ subscription.nextBillingDate }}
            </p>
          </div>
          <div class="flex justify-between items-center gap-x-6 py-3">
            <p
              class="text-text-secondary-light dark:text-text-secondary-dark text-sm font-normal leading-normal"
            >
              Payment Method
            </p>
            <div class="flex items-center gap-2">
              <img class="w-6 h-6" :alt="paymentMethod.logoAlt" :src="paymentMethod.logo" />
              <p
                class="text-text-primary-light dark:text-text-primary-dark text-sm font-medium leading-normal text-right"
              >
                {{ paymentMethod.description }}
              </p>
            </div>
          </div>
        </div>
      </section>

      <!-- Action Buttons Section -->
      <section class="mt-8 space-y-4">
        <button
          class="flex h-12 w-full items-center justify-center gap-x-2 rounded-lg bg-primary px-6 text-base font-bold text-white shadow-sm transition-colors hover:bg-primary/90"
          @click="updatePayment"
        >
          <span>Update Payment on Mercado Pago</span>
          <span class="material-symbols-outlined text-xl">open_in_new</span>
        </button>
        <button
          class="flex h-12 w-full items-center justify-center rounded-lg bg-transparent text-primary border border-primary/50 hover:bg-primary/10 transition-colors"
          @click="viewBillingHistory"
        >
          <span class="text-base font-bold">View Billing History</span>
        </button>
      </section>

      <footer class="mt-8 text-center">
        <button
          class="text-danger text-sm font-medium leading-normal hover:underline"
          @click="showCancelModal = true"
        >
          Cancel Subscription
        </button>
        <p class="text-text-secondary-light dark:text-text-secondary-dark text-xs mt-6 px-4">
          Your subscription is securely managed by Mercado Pago. You will be redirected to their
          secure portal to manage your payment details.
        </p>
      </footer>
    </main>

    <!-- Confirmation Modal -->
    <div
      v-if="showCancelModal"
      class="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
      @click.self="showCancelModal = false"
    >
      <div class="w-full max-w-sm rounded-xl bg-card-light dark:bg-card-dark p-6 shadow-xl">
        <h3 class="text-lg font-bold text-text-primary-light dark:text-text-primary-dark">
          Cancel Subscription
        </h3>
        <p class="mt-2 text-sm text-text-secondary-light dark:text-text-secondary-dark">
          Are you sure you want to cancel your {{ subscription.planName }} plan? This action cannot
          be undone.
        </p>
        <div class="mt-6 flex justify-end gap-4">
          <button
            class="rounded-lg px-4 py-2 text-sm font-bold text-text-secondary-light dark:text-text-secondary-dark hover:bg-black/5 dark:hover:bg-white/10"
            @click="showCancelModal = false"
          >
            Go Back
          </button>
          <button
            class="rounded-lg bg-danger px-4 py-2 text-sm font-bold text-white hover:bg-danger/90"
            @click="cancelSubscription"
          >
            Confirm Cancellation
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const showCancelModal = ref(false)

// Datos de la suscripción
const subscription = reactive({
  planName: 'Developer Tier',
  price: '$29',
  status: 'Active',
  nextBillingDate: 'Dec 25, 2024',
})

// Datos del método de pago
const paymentMethod = reactive({
  logo: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCYFHGNxHPbRVxkMW9Fx-KP39MwTapU9dJJED6aUjyvojw7YnQr7VWfSXflpJlQ1Dgkr8CmZPc7WAoWL_lEGIxFelTzhkpPrKGq1hkApQeTAHkDrTOequ1sPIgA0T-NkGj_JqvxvP9yq60S_r7DOgmeclxlHNwhgGFB33LZVQJCw22xtcSmW4JVplp502zOq34Vj_9pJF6Dpk9yvIS0WQbuwoNr7tyuSdZr6erVgpm8BnqleqRIHG8LCczYyAKUdeq-yw7ZjGffMog',
  logoAlt: 'Mercado Pago logo',
  description: 'Visa **** 4242',
})

// Métodos
const updatePayment = () => {
  // Lógica para actualizar el pago
  console.log('Redirecting to Mercado Pago...')
  // window.location.href = 'https://mercadopago.com/update-payment'
}

const viewBillingHistory = () => {
  // Lógica para ver historial de facturación
  console.log('Viewing billing history...')
  // router.push('/billing-history')
}

const cancelSubscription = () => {
  // Lógica para cancelar suscripción
  console.log('Cancelling subscription...')
  showCancelModal.value = false
  // Aquí iría la llamada a la API para cancelar
}
</script>

<style scoped>
/* Los estilos están manejados por Tailwind CSS */
</style>
