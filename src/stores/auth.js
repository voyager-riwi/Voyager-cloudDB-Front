import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import apiService from '@/services/api'
import { useRouter } from 'vue-router'

export const useAuthStore = defineStore('auth', () => {
  // ==================== STATE ====================
  const user = ref(null)
  const token = ref(null)
  const loading = ref(false)
  const error = ref(null)
  const router = useRouter()

  // ==================== INITIALIZATION ====================

  /**
   * Recuperar estado de autenticación desde sessionStorage
   */
  const initializeAuth = () => {
    const savedToken = sessionStorage.getItem('authToken')
    const savedUser = sessionStorage.getItem('user')

    if (savedToken && savedUser) {
      token.value = savedToken
      user.value = JSON.parse(savedUser)
      console.log('🔄 Auth initialized from sessionStorage:', {
        hasToken: !!token.value,
        user: user.value,
      })
    } else {
      console.log('🔐 No saved auth found in sessionStorage')
    }
  }

  // ==================== GETTERS (COMPUTED) ====================

  /**
   * Verifica si el usuario está autenticado
   */
  const isAuthenticated = computed(() => {
    const hasToken = !!token.value
    const hasUser = !!user.value
    console.log('🔍 Auth check - Token:', hasToken, 'User:', hasUser)
    return hasToken && hasUser
  })

  /**
   * Email del usuario actual
   */
  const userEmail = computed(() => user.value?.email || '')

  /**
   * Nombre del usuario actual
   */
  const userName = computed(() => user.value?.name || user.value?.email?.split('@')[0] || '')

  /**
   * Plan actual del usuario
   */
  const userPlan = computed(() => user.value?.planType || 'free')

  /**
   * ID del usuario actual
   */
  const userId = computed(() => user.value?.id || null)

  // ==================== ACTIONS ====================

  /**
   * Login de usuario
   * @param {Object} credentials - { email, password }
   */
  const login = async (credentials) => {
    loading.value = true
    error.value = null

    try {
      const response = await apiService.auth.login(credentials)

      console.log('📦 Backend response:', response)
      console.log('📦 Response structure:', Object.keys(response))

      // El backend envuelve la respuesta en { succeeded, message, data, errors }
      const data = response.data || response
      console.log('📦 Extracted data:', data)
      console.log('📦 Token from data:', data.token)

      token.value = data.token
      user.value = {
        id: data.userId,
        email: data.email,
        name: data.fullName,
        planType: data.planType || 'free',
      }

      console.log('📦 token.value:', token.value)
      console.log('📦 user.value:', user.value)

      // Guardar en sessionStorage
      sessionStorage.setItem('authToken', token.value)
      sessionStorage.setItem('user', JSON.stringify(user.value))

      console.log('✅ Login successful! Returning:', { token: token.value, user: user.value })
      return { token: token.value, user: user.value }
    } catch (err) {
      error.value = err.message || 'Error al iniciar sesión'
      console.error('Error en login:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  /**
   * Registro de usuario
   * @param {Object} userData - { email, password, name }
   */
  const register = async (userData) => {
    loading.value = true
    error.value = null

    try {
      const response = await apiService.auth.register(userData)

      // El backend envuelve la respuesta en { succeeded, message, data, errors }
      const data = response.data || response

      token.value = data.token
      user.value = {
        id: data.userId,
        email: data.email,
        name: data.fullName,
        planType: data.planType || 'free',
      }

      // Guardar en sessionStorage
      sessionStorage.setItem('authToken', token.value)
      sessionStorage.setItem('user', JSON.stringify(user.value))

      return { token: token.value, user: user.value }
    } catch (err) {
      error.value = err.message || 'Error al registrar usuario'
      console.error('Error en register:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  /**
   * Logout de usuario
   */
  const logout = () => {
    console.log('🚪 Logging out...')
    token.value = null
    user.value = null

    // Limpiar sessionStorage
    sessionStorage.removeItem('authToken')
    sessionStorage.removeItem('user')

    console.log('✅ Logout completed, redirecting to login')
    router.push('/login')
  }

  /**
   * Obtiene información del usuario actual
   */
  const fetchCurrentUser = async () => {
    if (!token.value) return null

    loading.value = true
    error.value = null

    try {
      const data = await apiService.users.getProfile()
      user.value = data

      // Actualizar en sessionStorage
      sessionStorage.setItem('user', JSON.stringify(user.value))

      return user.value
    } catch (err) {
      error.value = err.message || 'Error obteniendo usuario'
      console.error('Error en fetchCurrentUser:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  /**
   * Actualiza información del usuario
   * @param {Object} userData - Datos a actualizar
   */
  const updateUser = async (userData) => {
    loading.value = true
    error.value = null

    try {
      const data = await apiService.users.updateProfile(userData)
      user.value = data

      // Actualizar en sessionStorage
      sessionStorage.setItem('user', JSON.stringify(user.value))

      return user.value
    } catch (err) {
      error.value = err.message || 'Error actualizando usuario'
      console.error('Error en updateUser:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  /**
   * Cambia la contraseña del usuario
   * @param {Object} passwordData - { currentPassword, newPassword }
   */
  const changePassword = async (passwordData) => {
    loading.value = true
    error.value = null

    try {
      const data = await apiService.users.changePassword(passwordData)
      return data
    } catch (err) {
      error.value = err.message || 'Error cambiando contraseña'
      console.error('Error en changePassword:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  /**
   * Solicita recuperación de contraseña
   * @param {string} email - Email del usuario
   */
  const requestPasswordReset = async (email) => {
    loading.value = true
    error.value = null

    try {
      const data = await apiService.auth.forgotPassword({ email })
      return data
    } catch (err) {
      error.value = err.message || 'Error solicitando recuperación'
      console.error('Error en requestPasswordReset:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  /**
   * Resetea la contraseña con token
   * @param {Object} resetData - { token, newPassword }
   */
  const resetPassword = async (resetData) => {
    loading.value = true
    error.value = null

    try {
      const data = await apiService.auth.resetPassword(resetData)
      return data
    } catch (err) {
      error.value = err.message || 'Error reseteando contraseña'
      console.error('Error en resetPassword:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  /**
   * Actualiza el plan del usuario
   * @param {string} planType - Tipo de plan (free, intermediate, advanced)
   */
  const updatePlan = (planType) => {
    if (user.value) {
      user.value.planType = planType
      sessionStorage.setItem('user', JSON.stringify(user.value))
    }
  }

  /**
   * Limpia el error actual
   */
  function clearError() {
    error.value = null
  }

  /**
   * Limpia todo el store (reset completo)
   */
  function $reset() {
    user.value = null
    token.value = null
    loading.value = false
    error.value = null

    sessionStorage.removeItem('authToken')
    sessionStorage.removeItem('user')
  }

  // Inicializar automáticamente al crear el store
  initializeAuth()

  return {
    // State
    user,
    token,
    loading,
    error,

    // Getters
    isAuthenticated,
    userEmail,
    userName,
    userPlan,
    userId,

    // Actions
    initializeAuth,
    login,
    register,
    logout,
    fetchCurrentUser,
    updateUser,
    changePassword,
    requestPasswordReset,
    resetPassword,
    updatePlan,
    clearError,
    $reset,
  }
})
