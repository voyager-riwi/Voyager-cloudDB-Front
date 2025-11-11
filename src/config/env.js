const config = {
  api: {
    baseUrl: import.meta.env.VITE_API_BASE_URL,
    timeout: parseInt(import.meta.env.VITE_API_TIMEOUT) || 30000,
    endpoints: {
      // Auth endpoints
      auth: {
        login: '/api/Auth/login',
        register: '/api/Auth/register',
        forgotPassword: '/api/Auth/forgot-password',
        resetPassword: '/api/Auth/reset-password',
      },
      // Databases endpoints
      databases: {
        base: '/api/Databases',
        list: '/api/Databases',
        create: '/api/Databases',
        get: (id) => `/api/Databases/${id}`,
        update: (id) => `/api/Databases/${id}`,
        delete: (id) => `/api/Databases/${id}`,
        resetPassword: (id) => `/api/Databases/${id}/reset-password`,
      },
      // Users endpoints
      users: {
        profile: '/api/Users/profile',
        update: '/api/Users/profile',
      },
      plans: {
        list: '/api/Plans',
      },
    },
  },
  app: {
    name: import.meta.env.VITE_APP_NAME || 'CrudCloudDb',
    version: import.meta.env.VITE_APP_VERSION || '1.0.0',
    debug: import.meta.env.VITE_DEBUG === 'true',
  },
}

// Validación de variables requeridas
if (!import.meta.env.VITE_API_BASE_URL) {
  console.warn('VITE_API_BASE_URL no está definida en las variables de entorno')
}

export default config
