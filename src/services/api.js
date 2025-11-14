import env from '@/config/env'

class ApiService {
  constructor() {
    this.baseURL = env.api.baseUrl
  }

  /**
   * Método base para todas las requests HTTP
   */
  async request(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`

    const config = {
      method: options.method || 'GET',
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    }

    // Agregar body si existe y no es GET/HEAD
    if (options.body && !['GET', 'HEAD'].includes(config.method.toUpperCase())) {
      config.body = JSON.stringify(options.body)
    }

    // Agregar token de autenticación si existe
    const token = sessionStorage.getItem('authToken')
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`
    }

    try {
      // Timeout handling
      const controller = new AbortController()
      const timeoutId = setTimeout(() => controller.abort(), env.api.timeout)
      config.signal = controller.signal


      const response = await fetch(url, config)
      clearTimeout(timeoutId)


      if (!response.ok) {
        const errorData = await response.json().catch(() => ({
          message: `HTTP error! status: ${response.status}`,
        }))
        throw new Error(errorData.message || `Request failed with status ${response.status}`)
      }

      const data = await response.json()
      return data
    } catch (error) {
      if (error.name === 'AbortError') {
        throw new Error('Request timeout - Please try again')
      }
      console.error(`❌ API request failed:`, error)
      throw error
    }
  }

  // ==================== AUTH ENDPOINTS ====================
  auth = {
    /**
     * Login de usuario
     * @param {Object} credentials - { email, password }
     */
    login: (credentials) =>
      this.request(env.api.endpoints.auth.login, {
        method: 'POST',
        body: credentials,
      }),

    /**
     * Registro de usuario
     * @param {Object} userData - { first_name, last_name, email, password }
     */
    register: (userData) =>
      this.request(env.api.endpoints.auth.register, {
        method: 'POST',
        body: userData,
      }),

    /**
     * Olvidé mi contraseña
     * @param {Object} data - { email }
     */
    forgotPassword: (data) =>
      this.request(env.api.endpoints.auth.forgotPassword, {
        method: 'POST',
        body: data,
      }),

    /**
     * Resetear contraseña
     * @param {Object} data - { token, newPassword }
     */
    resetPassword: (data) =>
      this.request(env.api.endpoints.auth.resetPassword, {
        method: 'POST',
        body: data,
      }),
  }

  // ==================== DATABASES ENDPOINTS ====================
  databases = {
    /**
     * Obtener todas las bases de datos
     */
    list: () => this.request(env.api.endpoints.databases.list),

    /**
     * Obtener una base de datos específica
     * @param {string} id - ID de la base de datos
     */
    get: (id) => this.request(env.api.endpoints.databases.get(id)),

    /**
     * Crear nueva base de datos
     * @param {Object} data - { engine: 1=PostgreSQL, 2=MySQL, 3=MongoDB, 4=SQLServer }
     */
    create: (data) =>
      this.request(env.api.endpoints.databases.create, {
        method: 'POST',
        body: data,
      }),

    /**
     * Actualizar base de datos
     * @param {string} id - ID de la base de datos
     * @param {Object} data - Datos a actualizar
     */
    update: (id, data) =>
      this.request(env.api.endpoints.databases.update(id), {
        method: 'PUT',
        body: data,
      }),

    /**
     * Eliminar base de datos (Soft Delete - 30 días de gracia)
     * @param {string} id - ID de la base de datos
     */
    delete: (id) =>
      this.request(env.api.endpoints.databases.delete(id), {
        method: 'DELETE',
      }),

    /**
     * Restaurar base de datos eliminada (solo si < 30 días)
     * @param {string} id - ID de la base de datos eliminada
     */
    restore: (id) =>
      this.request(env.api.endpoints.databases.restore(id), {
        method: 'POST',
      }),

    /**
     * Resetear password de base de datos (nueva contraseña llega por email)
     * @param {string} id - ID de la base de datos
     */
    resetPassword: (id) =>
      this.request(env.api.endpoints.databases.resetPassword(id), {
        method: 'POST',
      }),
  }

  // ==================== USERS ENDPOINTS ====================
  users = {
    /**
     * Obtener perfil del usuario
     */
    getProfile: () => this.request(env.api.endpoints.users.profile),

    /**
     * Actualizar perfil del usuario
     * @param {Object} data - { firstName, lastName }
     */
    updateProfile: (data) =>
      this.request(env.api.endpoints.users.update, {
        method: 'PUT',
        body: data,
      }),

    /**
     * Cambiar contraseña del usuario
     * @param {Object} data - { currentPassword, newPassword }
     */
    changePassword: (data) =>
      this.request(env.api.endpoints.users.changePassword, {
        method: 'POST',
        body: data,
      }),
  }

  // ==================== PLANS ENDPOINTS ====================
  plans = {
    /**
     * Obtener todos los planes disponibles
     * No requiere autenticación
     */
    list: () => this.request(env.api.endpoints.plans.list),

    /**
     * Obtener un plan específico
     * @param {string} id - ID del plan
     * No requiere autenticación
     */
    get: (id) => this.request(env.api.endpoints.plans.get(id)),
  }

  // ==================== PAYMENTS ENDPOINTS ====================
  payments = {
    /**
     * Crear preferencia de pago en MercadoPago
     * @param {Object} data - { planId: GUID del plan }
     * @returns {Object} { preferenceId, initPoint } - URL para redirigir al usuario
     */
    createPreference: (data) =>
      this.request(env.api.endpoints.payments.createPreference, {
        method: 'POST',
        body: data,
      }),

    /**
     * Verificar configuración de MercadoPago (debug)
     * @returns {Object} Estado de configuración
     */
    getConfigTest: () => this.request(env.api.endpoints.payments.configTest),

    /**
     * Consultar estado de orden de MercadoPago (debug)
     * @param {number} orderId - ID de la orden en MercadoPago
     * @returns {Object} Estado detallado de la orden
     */
    debugOrder: (orderId) => this.request(env.api.endpoints.payments.debugOrder(orderId)),
  }

  // ==================== HEALTH CHECK ENDPOINTS ====================
  health = {
    /**
     * Verificar estado del servidor
     * No requiere autenticación
     */
    check: () => this.request(env.api.endpoints.health.check),

    /**
     * Probar manejo de errores (debug)
     * No requiere autenticación
     */
    error: () => this.request(env.api.endpoints.health.error),
  }
}

// Exportar instancia única (Singleton)
export default new ApiService()
