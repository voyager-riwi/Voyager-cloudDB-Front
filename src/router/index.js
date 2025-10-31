import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import BillingView from '../views/BillingView.vue'
import DashboardView from '@/views/DashboardView.vue'
import DatabasesView from '../views/DatabasesView.vue'
import LoginView from '../views/LoginView.vue'
import RegisterView from '../views/RegisterView.vue'
import NotFoundView from '@/views/NotFoundView.vue'
import PlansView from '@/views/PlansView.vue'
import ProfileView from '@/views/ProfileView.vue'
import WebhooksView from '@/views/WebhooksView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue'),
    } /*
    {
      path: '/billing',
      name: 'billing',
      component: BillingView,
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: DashboardView,
    },
    {
      path: '/databases',
      name: 'databases',
      component: DatabasesView,
    },*/,
    {
      path: '/login',
      name: 'login',
      component: LoginView,
    } /*
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
    },*/,
    ,
    {
      path: '/register',
      name: 'register',
      component: RegisterView,
    },
  ],
})

export default router
