import { createRouter, createWebHistory } from 'vue-router'
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
import PaymentSuccess from '@/views/PaymentSuccess.vue'
import PaymentFailure from '@/views/PaymentFailure.vue'
import PaymentPending from '@/views/PaymentPending.vue'

/*
    {
      path: '/billing',
      name: 'billing',
      component: BillingView,
    },*/
/*
    {
      path: '/databases',
      name: 'databases',
      component: DatabasesView,
    },*/
/*
    {
      path: '/notfound',
      name: 'notfound',
      component: NotFoundView,
    },
    {
      path: '/plans',
      name: 'plans',
      component: PlansView,
    },
    {
      path: '/profile',
      name: 'profile',
      component: ProfileView,
    },
    {
      path: '/wehooks',
      name: 'webhooks',
      component: WebhooksView,
    },*/

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
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView,
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterView,
    },
    {
      path: '/change-password',
      name: 'ChangePassword',
      component: () => import('@/views/ChangePasswordView.vue'),
      meta: { requiresAuth: true },
    },
    {
      path: '/plans',
      name: 'plans',
      component: PlansView,
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
      path: '/payment-success',
      name: 'PaymentSuccess',
      component: PaymentSuccess,
    },
    {
      path: '/payment-failure',
      name: 'PaymentFailure',
      component: PaymentFailure,
    },
    {
      path: '/payment-pending',
      name: 'PaymentPending',
      component: PaymentPending,
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

export default router
