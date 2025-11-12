<!-- components/AppNavbar.vue -->
<template>
  <nav class="navbar bg-[#1c343f]">
    <!-- Logo y marca -->
    <div class="nav-brand">
      <router-link to="/" class="logo">
        <div class="brand">
          <img class="brand_img" src="../../assets/images/PotterCloud_logo.png" alt="" />
        </div>
      </router-link>
    </div>

    <!-- Menú central - Desktop -->
    <div class="nav-center">
      <router-link to="/" class="nav-link">Inicio</router-link>
      <router-link to="/about" class="nav-link">Acerca de</router-link>
    </div>

    <!-- Menú de usuario -->
    <div class="nav-menu">
      <!-- Usuario NO autenticado - Desktop -->
      <div v-if="!isAuthenticated" class="auth-buttons desktop-only">
        <router-link to="/login" class="btn btn-outline">Iniciar Sesión</router-link>
        <router-link to="/register" class="btn btn-primary">Registrarse</router-link>
      </div>

      <!-- Usuario autenticado -->
      <div v-else class="user-section">
        <!-- Menú desktop -->
        <div class="user-menu desktop-only">
          <button class="user-toggle" @click="toggleUserMenu">
            <div class="user-avatar">
              {{ userInitial }}
            </div>
            <span class="user-name">{{ userName }}</span>
            <svg class="dropdown-arrow" width="12" height="12" viewBox="0 0 12 12">
              <path d="M3 4.5L6 7.5L9 4.5" stroke="currentColor" stroke-width="1.5" fill="none" />
            </svg>
          </button>

          <div v-if="showUserMenu" class="user-dropdown">
            <div class="user-info-dropdown">
              <div class="user-email">{{ userEmail }}</div>
              <div class="user-plan">{{ userPlan }}</div>
            </div>
            <router-link to="/dashboard" class="dropdown-item">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M2 4L8 1L14 4V12L8 15L2 12V4Z" stroke="currentColor" stroke-width="1.5" />
                <path d="M2 4L8 7L14 4" stroke="currentColor" stroke-width="1.5" />
                <path d="M8 7V15" stroke="currentColor" stroke-width="1.5" />
              </svg>
              Dashboard
            </router-link>
            <router-link to="/profile" class="dropdown-item">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <circle cx="8" cy="4" r="2.5" stroke="currentColor" stroke-width="1.5" />
                <path
                  d="M12.5 14.5C12.5 11.5 10.5 9.5 8 9.5C5.5 9.5 3.5 11.5 3.5 14.5"
                  stroke="currentColor"
                  stroke-width="1.5"
                />
              </svg>
              Mi Perfil
            </router-link>
            <router-link to="/plans" class="dropdown-item">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path
                  d="M8 1L14.5 5.5V10.5L8 15L1.5 10.5V5.5L8 1Z"
                  stroke="currentColor"
                  stroke-width="1.5"
                />
              </svg>
              Planes
            </router-link>
            <div class="dropdown-divider"></div>
            <button @click="handleLogout" class="dropdown-item logout">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path
                  d="M6 2H3C2.44772 2 2 2.44772 2 3V13C2 13.5523 2.44772 14 3 14H6"
                  stroke="currentColor"
                  stroke-width="1.5"
                />
                <path d="M10 11L13 8L10 5" stroke="currentColor" stroke-width="1.5" />
                <path d="M13 8H6" stroke="currentColor" stroke-width="1.5" />
              </svg>
              Cerrar Sesión
            </button>
          </div>
        </div>
      </div>

      <!-- Menú hamburguesa móvil - Siempre visible en mobile -->
      <button class="menu-toggle" @click="toggleMobileMenu" :class="{ active: showMobileMenu }">
        <span></span>
        <span></span>
        <span></span>
      </button>
    </div>

    <!-- Menú móvil desplegable -->
    <div v-if="showMobileMenu" class="mobile-menu">
      <div class="mobile-menu-content">
        <!-- Navegación principal -->
        <div class="mobile-nav-section">
          <h3 class="mobile-section-title">Navegación</h3>
          <router-link to="/" class="mobile-link" @click="closeMobileMenu">
            <svg class="mobile-link-icon" width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path
                d="M3 10L10 3L17 10V16H12V13H8V16H3V10Z"
                stroke="currentColor"
                stroke-width="1.5"
              />
            </svg>
            Inicio
          </router-link>
          <router-link to="/about" class="mobile-link" @click="closeMobileMenu">
            <svg class="mobile-link-icon" width="20" height="20" viewBox="0 0 20 20" fill="none">
              <circle cx="10" cy="10" r="8.5" stroke="currentColor" stroke-width="1.5" />
              <path d="M10 6V10.5" stroke="currentColor" stroke-width="1.5" />
              <circle cx="10" cy="13" r="0.5" fill="currentColor" stroke="currentColor" />
            </svg>
            Acerca de
          </router-link>
        </div>

        <!-- Sección de autenticación -->
        <div v-if="!isAuthenticated" class="mobile-auth-section">
          <h3 class="mobile-section-title">Cuenta</h3>
          <router-link to="/login" class="mobile-link" @click="closeMobileMenu">
            <svg class="mobile-link-icon" width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path
                d="M7 6V4C7 2.34315 8.34315 1 10 1C11.6569 1 13 2.34315 13 4V6"
                stroke="currentColor"
                stroke-width="1.5"
              />
              <rect
                x="3"
                y="6"
                width="14"
                height="13"
                rx="2"
                stroke="currentColor"
                stroke-width="1.5"
              />
            </svg>
            Iniciar Sesión
          </router-link>
          <router-link to="/register" class="mobile-link highlight" @click="closeMobileMenu">
            <svg class="mobile-link-icon" width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M10 1V19M1 10H19" stroke="currentColor" stroke-width="1.5" />
            </svg>
            Registrarse
          </router-link>
        </div>

        <!-- Sección de usuario autenticado -->
        <div v-else class="mobile-user-section">
          <div class="mobile-user-info">
            <div class="user-avatar large">{{ userInitial }}</div>
            <div class="user-details">
              <div class="user-name-mobile">{{ userName }}</div>
              <div class="user-email-mobile">{{ userEmail }}</div>
              <div class="user-plan-badge">{{ userPlan }}</div>
            </div>
          </div>

          <div class="mobile-nav-section">
            <h3 class="mobile-section-title">Mi Cuenta</h3>
            <router-link to="/dashboard" class="mobile-link" @click="closeMobileMenu">
              <svg class="mobile-link-icon" width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path
                  d="M3 6L10 1L17 6V16C17 17.1046 16.1046 18 15 18H5C3.89543 18 3 17.1046 3 16V6Z"
                  stroke="currentColor"
                  stroke-width="1.5"
                />
                <path d="M3 6L10 10L17 6" stroke="currentColor" stroke-width="1.5" />
                <path d="M10 10V18" stroke="currentColor" stroke-width="1.5" />
              </svg>
              Dashboard
            </router-link>
            <router-link to="/profile" class="mobile-link" @click="closeMobileMenu">
              <svg class="mobile-link-icon" width="20" height="20" viewBox="0 0 20 20" fill="none">
                <circle cx="10" cy="6" r="3" stroke="currentColor" stroke-width="1.5" />
                <path
                  d="M16 18C16 14.5 13.5 12 10 12C6.5 12 4 14.5 4 18"
                  stroke="currentColor"
                  stroke-width="1.5"
                />
              </svg>
              Mi Perfil
            </router-link>
            <router-link to="/plans" class="mobile-link" @click="closeMobileMenu">
              <svg class="mobile-link-icon" width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path
                  d="M10 1L18.5 7V14L10 20L1.5 14V7L10 1Z"
                  stroke="currentColor"
                  stroke-width="1.5"
                />
              </svg>
              Planes
            </router-link>
          </div>

          <div class="mobile-actions">
            <button @click="handleMobileLogout" class="mobile-logout-btn">
              <svg class="mobile-link-icon" width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path
                  d="M8 3H4C3.44772 3 3 3.44772 3 4V16C3 16.5523 3.44772 17 4 17H8"
                  stroke="currentColor"
                  stroke-width="1.5"
                />
                <path d="M13 15L17 10L13 5" stroke="currentColor" stroke-width="1.5" />
                <path d="M17 10H8" stroke="currentColor" stroke-width="1.5" />
              </svg>
              Cerrar Sesión
            </button>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
import { useAuthStore } from '@/stores/auth'
import { ref, computed, onMounted, onUnmounted } from 'vue'

export default {
  name: 'AppNavbar',
  setup() {
    const authStore = useAuthStore()
    const showUserMenu = ref(false)
    const showMobileMenu = ref(false)

    const userInitial = computed(() => {
      return authStore.userName?.charAt(0)?.toUpperCase() || 'U'
    })

    const userEmail = computed(() => authStore.userEmail)

    const closeMenu = (event) => {
      if (!event.target.closest('.user-menu')) {
        showUserMenu.value = false
      }
    }

    const toggleUserMenu = () => {
      showUserMenu.value = !showUserMenu.value
    }

    const toggleMobileMenu = () => {
      showMobileMenu.value = !showMobileMenu.value
    }

    const closeMobileMenu = () => {
      showMobileMenu.value = false
    }

    const handleLogout = () => {
      authStore.logout()
      showUserMenu.value = false
      showMobileMenu.value = false
    }

    const handleMobileLogout = () => {
      handleLogout()
      closeMobileMenu()
    }

    onMounted(() => {
      document.addEventListener('click', closeMenu)
    })

    onUnmounted(() => {
      document.removeEventListener('click', closeMenu)
    })

    return {
      isAuthenticated: authStore.isAuthenticated,
      userName: authStore.userName,
      userPlan: authStore.userPlan,
      userInitial,
      userEmail,
      showUserMenu,
      showMobileMenu,
      toggleUserMenu,
      toggleMobileMenu,
      closeMobileMenu,
      handleLogout,
      handleMobileLogout,
    }
  },
}
</script>

<style scoped>
/* Estilos base profesionales */
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  position: relative;
  min-height: 64px;
}

/* Logo y marca */
.brand_img {
  max-width: 50px;
}

/* Menú central */
.nav-center {
  display: flex;
  gap: 2rem;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
}

.nav-link {
  text-decoration: none;
  color: #e5e7eb;
  font-weight: 500;
  padding: 0.5rem 0;
  position: relative;
  transition: color 0.2s ease;
}

.nav-link:hover {
  color: #ffffff;
}

.nav-link.router-link-active {
  color: #60a5fa;
}

.nav-link.router-link-active::after {
  content: '';
  position: absolute;
  bottom: -8px;
  left: 0;
  right: 0;
  height: 2px;
  background: #60a5fa;
  border-radius: 1px;
}

/* Botones */
.auth-buttons {
  display: flex;
  gap: 0.75rem;
  align-items: center;
}

.btn {
  padding: 0.5rem 1rem;
  text-decoration: none;
  font-weight: 500;
  border-radius: 6px;
  transition: all 0.2s ease;
  font-size: 0.875rem;
}

.btn-outline {
  border: 1px solid #d1d5db;
  color: #374151;
  background: white;
}

.btn-outline:hover {
  border-color: #9ca3af;
  background: #f9fafb;
}

.btn-primary {
  background: #2563eb;
  color: white;
  border: 1px solid #2563eb;
}

.btn-primary:hover {
  background: #1d4ed8;
  border-color: #1d4ed8;
}

/* Sección usuario */
.user-section {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.user-toggle {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  background: none;
  border: 1px solid #e5e7eb;
  padding: 0.5rem 0.75rem;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease;
  color: #e5e7eb;
}

.user-toggle:hover {
  border-color: #d1d5db;
  background: rgba(255, 255, 255, 0.1);
}

.user-avatar {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: #2563eb;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  font-size: 0.875rem;
}

.user-avatar.large {
  width: 48px;
  height: 48px;
  font-size: 1.125rem;
}

.user-name {
  font-weight: 500;
  font-size: 0.875rem;
}

.dropdown-arrow {
  transition: transform 0.2s ease;
}

.user-toggle:hover .dropdown-arrow {
  transform: rotate(180deg);
}

/* Menú desplegable */
.user-dropdown {
  position: absolute;
  top: 100%;
  right: 0;
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
  min-width: 240px;
  z-index: 1000;
  margin-top: 0.5rem;
  overflow: hidden;
}

.user-info-dropdown {
  padding: 1rem;
  background: #f8fafc;
  border-bottom: 1px solid #e5e7eb;
}

.user-email {
  font-size: 0.875rem;
  color: #6b7280;
  margin-bottom: 0.25rem;
}

.user-plan {
  font-size: 0.75rem;
  color: #2563eb;
  font-weight: 500;
  text-transform: capitalize;
}

.dropdown-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  width: 100%;
  padding: 0.75rem 1rem;
  text-decoration: none;
  color: #374151;
  border: none;
  background: none;
  text-align: left;
  cursor: pointer;
  transition: background 0.2s ease;
  font-size: 0.875rem;
  border-bottom: 1px solid #f3f4f6;
}

.dropdown-item:hover {
  background: #f8fafc;
}

.dropdown-item.logout {
  color: #dc2626;
}

.dropdown-item svg {
  opacity: 0.7;
}

.dropdown-divider {
  height: 1px;
  background: #e5e7eb;
  margin: 0.25rem 0;
}

/* Menú hamburguesa móvil */
.menu-toggle {
  display: none;
  flex-direction: column;
  gap: 3px;
  background: none;
  border: 1px solid #e5e7eb;
  border-radius: 6px;
  cursor: pointer;
  padding: 0.5rem;
  transition: all 0.2s ease;
}

.menu-toggle:hover {
  border-color: #d1d5db;
  background: rgba(255, 255, 255, 0.1);
}

.menu-toggle span {
  width: 18px;
  height: 2px;
  background: #e5e7eb;
  transition: all 0.3s ease;
  border-radius: 1px;
}

.menu-toggle.active span:nth-child(1) {
  transform: rotate(45deg) translate(4px, 4px);
}

.menu-toggle.active span:nth-child(2) {
  opacity: 0;
}

.menu-toggle.active span:nth-child(3) {
  transform: rotate(-45deg) translate(4px, -4px);
}

/* Menú móvil desplegable */
.mobile-menu {
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background: white;
  border-top: 1px solid #e5e7eb;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  z-index: 999;
  max-height: 80vh;
  overflow-y: auto;
}

.mobile-menu-content {
  padding: 1rem;
}

.mobile-section-title {
  font-size: 0.75rem;
  font-weight: 600;
  color: #6b7280;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin: 1rem 0 0.5rem 0;
  padding: 0 1rem;
}

.mobile-nav-section {
  margin-bottom: 1rem;
}

.mobile-link {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem 1rem;
  text-decoration: none;
  color: #374151;
  font-weight: 500;
  border-radius: 6px;
  transition: all 0.2s ease;
  margin-bottom: 0.25rem;
}

.mobile-link:hover {
  background: #f3f4f6;
}

.mobile-link.router-link-active {
  color: #2563eb;
  background: #eff6ff;
}

.mobile-link.highlight {
  background: #2563eb;
  color: white;
}

.mobile-link.highlight:hover {
  background: #1d4ed8;
}

.mobile-link-icon {
  opacity: 0.7;
}

/* Información de usuario móvil */
.mobile-user-info {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  background: #f8fafc;
  border-radius: 8px;
  margin-bottom: 1rem;
}

.user-details {
  flex: 1;
}

.user-name-mobile {
  font-weight: 600;
  font-size: 0.875rem;
  color: #1f2937;
}

.user-email-mobile {
  font-size: 0.75rem;
  color: #6b7280;
  margin-bottom: 0.25rem;
}

.user-plan-badge {
  display: inline-block;
  padding: 0.2rem 0.5rem;
  background: #2563eb;
  color: white;
  border-radius: 12px;
  font-size: 0.7rem;
  font-weight: 500;
  text-transform: capitalize;
}

/* Botón de logout móvil */
.mobile-actions {
  margin-top: 1rem;
  padding-top: 1rem;
  border-top: 1px solid #e5e7eb;
}

.mobile-logout-btn {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  width: 100%;
  padding: 0.75rem 1rem;
  background: none;
  border: 1px solid #dc2626;
  border-radius: 6px;
  color: #dc2626;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
}

.mobile-logout-btn:hover {
  background: #dc2626;
  color: white;
}

/* Responsive */
@media (max-width: 768px) {
  .navbar {
    padding: 1rem;
  }

  .desktop-only {
    display: none !important;
  }

  .menu-toggle {
    display: flex;
  }

  .nav-center {
    display: none;
  }

  .auth-buttons {
    display: none;
  }
}

@media (min-width: 769px) {
  .mobile-menu {
    display: none;
  }
}

/* Estados de carga y hover mejorados */
.btn:active,
.dropdown-item:active,
.mobile-link:active {
  transform: scale(0.98);
}

/* Focus states para accesibilidad */
.btn:focus,
.user-toggle:focus,
.menu-toggle:focus,
.dropdown-item:focus,
.mobile-link:focus {
  outline: 2px solid #3b82f6;
  outline-offset: 2px;
}
</style>
