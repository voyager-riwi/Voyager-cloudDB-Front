import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/auth' // Asegúrate de importar tu store
import HomeView from '../views/HomeView.vue'
import DashboardView from '@/views/DashboardView.vue'
import LoginView from '../views/LoginView.vue'
import RegisterView from '../views/RegisterView.vue'
import NotFoundView from '@/views/NotFoundView.vue'
import ProfileView from '@/views/ProfileView.vue'
import WebhooksView from '@/views/WebhooksView.vue'
import ResetPasswordView from '@/views/ResetPasswordView.vue'
import AboutView from '@/views/AboutView.vue'
import RecoveryView from '@/views/RecoveryView.vue'
import PlansView from '@/views/PlansView.vue'
import MarketPayment from '@/views/MarketPayment.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/about',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/reset',
      name: 'reset',
      component: ResetPasswordView,
    },
    {
      path: '/recovery',
      name: 'recovery',
      component: RecoveryView,
    },
    {
      path: '/',
      name: 'about',
      component: AboutView,
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: DashboardView,
      meta: { requiresAuth: true }, // ✅ Agregar esta meta
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView,
      meta: { requiresGuest: true }, // ✅ Solo para no logueados
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterView,
      meta: { requiresGuest: true }, // ✅ Solo para no logueados
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
      component: PlansView,
      meta: { requiresAuth: true },
    },
    {
      path: '/payment/:planId',
      name: 'MarketPayment',
      component: MarketPayment,
      meta: { requiresAuth: true },
    },
    {
      path: '/profile',
      name: 'profile',
      component: ProfileView,
      meta: { requiresAuth: true },
    },
    {
      path: '/webhooks',
      name: 'webhooks',
      component: WebhooksView,
      meta: { requiresAuth: true },
    },
  ],
})

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore()

  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    // Guardar la ruta que intentaba acceder
    next({
      path: '/login',
      query: { redirect: to.fullPath },
    })
    return
  }

  if (to.meta.requiresGuest && authStore.isAuthenticated) {
    next('/dashboard')
    return
  }

  next()
})

export default router
