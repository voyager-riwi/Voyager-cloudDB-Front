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
    const token = localStorage.getItem('authToken')
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`
    }

    try {
      // Timeout handling
      const controller = new AbortController()
      const timeoutId = setTimeout(() => controller.abort(), env.api.timeout)
      config.signal = controller.signal

      console.log(`🚀 ${config.method} ${url}`)

      const response = await fetch(url, config)
      clearTimeout(timeoutId)

      console.log(`✅ ${config.method} ${endpoint} - Status: ${response.status}`)

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
     * @param {Object} data - Datos de la base de datos
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
     * Eliminar base de datos
     * @param {string} id - ID de la base de datos
     */
    delete: (id) =>
      this.request(env.api.endpoints.databases.delete(id), {
        method: 'DELETE',
      }),

    /**
     * Resetear password de base de datos
     * @param {string} id - ID de la base de datos
     * @param {Object} data - { email }
     */
    resetPassword: (id, data) =>
      this.request(env.api.endpoints.databases.resetPassword(id), {
        method: 'POST',
        body: data,
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
     * @param {Object} data - Datos del perfil
     */
    updateProfile: (data) =>
      this.request(env.api.endpoints.users.update, {
        method: 'PUT',
        body: data,
      }),
  }

  // ==================== PLANS ENDPOINTS ====================
  plans = {
    /**
     * Obtener todos los planes disponibles
     */
    list: () => this.request(env.api.endpoints.plans?.list || '/api/Plans'),

    /**
     * Obtener un plan específico
     * @param {string} id - GUID del plan
     */
    get: (id) => this.request(env.api.endpoints.plans?.get?.(id) || `/api/Plans/${id}`),
  }

  // ==================== PAYMENTS ENDPOINTS ====================
  payments = {
    /**
     * Crear preferencia de pago en MercadoPago
     * @param {Object} data - { planId }
     */
    createPreference: (data) =>
      this.request(env.api.endpoints.payments?.createPreference || '/api/Payments/create-preference', {
        method: 'POST',
        body: data,
      }),

    /**
     * Verificar configuración de MercadoPago (solo para debug)
     */
    getConfigTest: () =>
      this.request(env.api.endpoints.payments?.configTest || '/api/Payments/config-test'),

    /**
     * Debug de orden de MercadoPago
     * @param {number} orderId - ID de la orden
     */
    debugOrder: (orderId) =>
      this.request(env.api.endpoints.payments?.debugOrder?.(orderId) || `/api/Payments/debug-order/${orderId}`),
  }
}

// Exportar instancia única (Singleton)
export default new ApiService()
