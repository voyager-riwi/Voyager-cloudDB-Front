import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/about',
      name: 'home',
      component: () => import('@/views/HomeView.vue'),
    },
    {
      path: '/reset',
      name: 'reset',
      component: () => import('@/views/ResetPasswordView.vue'),
    },
    {
      path: '/recovery',
      name: 'recovery',
      component: () => import('@/views/RecoveryView.vue'),
    },
    {
      path: '/',
      name: 'about',
      component: () => import('@/views/AboutView.vue'),
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: () => import('@/views/DashboardView.vue'),
      meta: { requiresAuth: true },
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/LoginView.vue'),
      meta: { requiresGuest: true },
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('@/views/RegisterView.vue'),
      meta: { requiresGuest: true },
    },
    {
      path: '/change-password',
      name: 'ChangePassword',
      component: () => import('@/views/ChangePasswordView.vue'),
      meta: { requiresAuth: true },
    },
    {
      path: '/databases/:id',
      name: 'DatabaseDetails',
      component: () => import('@/views/DatabaseDetailsView.vue'),
      meta: { requiresAuth: true },
    },
    {
      path: '/plans',
      name: 'plans',
      component: () => import('@/views/PlansView.vue'),
      meta: { requiresAuth: true },
    },
    {
      path: '/payment/:planId',
      name: 'MarketPayment',
      component: () => import('@/views/MarketPayment.vue'),
      meta: { requiresAuth: true },
    },
    {
      path: '/payment-success',
      name: 'PaymentSuccess',
      component: () => import('@/views/PaymentSuccess.vue'),
    },
    {
      path: '/payment-failure',
      name: 'PaymentFailure',
      component: () => import('@/views/PaymentFailure.vue'),
    },
    {
      path: '/payment-pending',
      name: 'PaymentPending',
      component: () => import('@/views/PaymentPending.vue'),
    },
    {
      path: '/profile',
      name: 'profile',
      component: () => import('@/views/ProfileView.vue'),
      meta: { requiresAuth: true },
    },
    {
      path: '/webhooks',
      name: 'webhooks',
      component: () => import('@/views/WebhooksView.vue'),
      meta: { requiresAuth: true },
    },
    // Ruta para 404 - debe ir al final
    {
      path: '/:pathMatch(.*)*',
      name: 'NotFound',
      component: () => import('@/views/NotFoundView.vue'),
    },
  ],
})

// Navigation guard
router.beforeEach((to, from, next) => {
  const authStore = useAuthStore()

  console.log('🛡️ Router guard - Checking route:', to.name)
  console.log('🛡️ Auth state:', {
    isAuthenticated: authStore.isAuthenticated,
    hasToken: !!authStore.token,
    hasUser: !!authStore.user,
  })

  // Si la ruta requiere autenticación y el usuario no está autenticado
  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    console.log('❌ Access denied - Redirecting to login')
    next({
      path: '/login',
      query: { redirect: to.fullPath },
    })
    return
  }

  // Si la ruta es solo para invitados y el usuario está autenticado
  if (to.meta.requiresGuest && authStore.isAuthenticated) {
    console.log('✅ User is authenticated - Redirecting to dashboard')
    next('/dashboard')
    return
  }

  console.log('✅ Access granted - Proceeding to route')
  next()
})

export default router
