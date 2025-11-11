import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import databaseService from '@/services/databaseService'
import { DATABASE_STATUS } from '@/utils/constants/database'

export const useDatabaseStore = defineStore('databases', () => {
  // ==================== STATE ====================
  const databases = ref([])
  const currentDatabase = ref(null)
  const loading = ref(false)
  const error = ref(null)
  const lastFetch = ref(null)

  // ==================== GETTERS (COMPUTED) ====================

  /**
   * Bases de datos activas (Running)
   */
  const activeDatabases = computed(() =>
    databases.value.filter((db) => db.status === DATABASE_STATUS.RUNNING),
  )

  /**
   * Bases de datos eliminadas (Deleted)
   */
  const deletedDatabases = computed(() =>
    databases.value.filter((db) => db.status === DATABASE_STATUS.DELETED),
  )

  /**
   * Total de bases de datos
   */
  const totalDatabases = computed(() => databases.value.length)

  /**
   * Bases de datos agrupadas por motor
   */
  const databasesByEngine = computed(() => {
    return databaseService.groupByEngine(databases.value)
  })

  /**
   * Conteo de bases de datos por motor
   */
  const countByEngine = computed(() => {
    return databaseService.countByEngine(databases.value)
  })

  /**
   * Estadísticas generales
   */
  const statistics = computed(() => {
    return databaseService.getStatistics(databases.value)
  })

  /**
   * Verifica si hay datos cargados
   */
  const hasData = computed(() => databases.value.length > 0)

  /**
   * Verifica si necesita refrescar (última carga > 5 minutos)
   */
  const needsRefresh = computed(() => {
    if (!lastFetch.value) return true
    const fiveMinutes = 5 * 60 * 1000
    return Date.now() - lastFetch.value > fiveMinutes
  })

  // ==================== ACTIONS ====================

  /**
   * Obtiene todas las bases de datos del usuario
   * @param {boolean} force - Forzar recarga aunque haya datos
   */
  const fetchDatabases = async (force = false) => {
    // Si ya hay datos y no es forzado, no recargar
    if (!force && hasData.value && !needsRefresh.value) {
      return databases.value
    }

    loading.value = true
    error.value = null

    try {
      const data = await databaseService.getAllDatabases()
      databases.value = data.map((db) => databaseService.enrichDatabase(db))
      lastFetch.value = Date.now()
      return databases.value
    } catch (err) {
      error.value = err.message || 'Error cargando bases de datos'
      console.error('Error en fetchDatabases:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  /**
   * Obtiene una base de datos específica
   * @param {string} databaseId - GUID de la base de datos
   */
  const fetchDatabaseById = async (databaseId) => {
    loading.value = true
    error.value = null

    try {
      const data = await databaseService.getDatabaseById(databaseId)
      currentDatabase.value = databaseService.enrichDatabase(data)

      // Actualizar en la lista si existe
      const index = databases.value.findIndex((db) => db.id === databaseId)
      if (index !== -1) {
        databases.value[index] = currentDatabase.value
      } else {
        databases.value.push(currentDatabase.value)
      }

      return currentDatabase.value
    } catch (err) {
      error.value = err.message || 'Error cargando base de datos'
      console.error('Error en fetchDatabaseById:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  /**
   * Crea una nueva base de datos
   * @param {number} engineId - ID del motor (1-4)
   */
  const createDatabase = async (engineId) => {
    loading.value = true
    error.value = null

    try {
      const newDatabase = await databaseService.createDatabase(engineId)
      const enriched = databaseService.enrichDatabase(newDatabase)

      // Agregar a la lista
      databases.value.push(enriched)
      currentDatabase.value = enriched

      return enriched
    } catch (err) {
      error.value = err.message || 'Error creando base de datos'
      console.error('Error en createDatabase:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  /**
   * Elimina una base de datos (Soft Delete)
   * @param {string} databaseId - GUID de la base de datos
   */
  const deleteDatabase = async (databaseId) => {
    loading.value = true
    error.value = null

    try {
      const result = await databaseService.deleteDatabase(databaseId)

      // Actualizar estado en la lista
      const index = databases.value.findIndex((db) => db.id === databaseId)
      if (index !== -1) {
        databases.value[index].status = DATABASE_STATUS.DELETED
        databases.value[index].isDeleted = true
      }

      // Si es la BD actual, actualizar
      if (currentDatabase.value?.id === databaseId) {
        currentDatabase.value.status = DATABASE_STATUS.DELETED
        currentDatabase.value.isDeleted = true
      }

      return result
    } catch (err) {
      error.value = err.message || 'Error eliminando base de datos'
      console.error('Error en deleteDatabase:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  /**
   * Restaura una base de datos eliminada
   * @param {string} databaseId - GUID de la base de datos
   */
  const restoreDatabase = async (databaseId) => {
    loading.value = true
    error.value = null

    try {
      const result = await databaseService.restoreDatabase(databaseId)

      // Actualizar estado en la lista
      const index = databases.value.findIndex((db) => db.id === databaseId)
      if (index !== -1) {
        databases.value[index].status = DATABASE_STATUS.RUNNING
        databases.value[index].isDeleted = false
        databases.value[index].isRunning = true
      }

      // Si es la BD actual, actualizar
      if (currentDatabase.value?.id === databaseId) {
        currentDatabase.value.status = DATABASE_STATUS.RUNNING
        currentDatabase.value.isDeleted = false
        currentDatabase.value.isRunning = true
      }

      return result
    } catch (err) {
      error.value = err.message || 'Error restaurando base de datos'
      console.error('Error en restoreDatabase:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  /**
   * Resetea la contraseña de una base de datos
   * @param {string} databaseId - GUID de la base de datos
   */
  const resetPassword = async (databaseId) => {
    loading.value = true
    error.value = null

    try {
      const result = await databaseService.resetDatabasePassword(databaseId)

      // Nota: La nueva contraseña NO se retorna por seguridad
      // Se envía por email al usuario

      return result
    } catch (err) {
      error.value = err.message || 'Error reseteando contraseña'
      console.error('Error en resetPassword:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  /**
   * Busca una base de datos en el store
   * @param {string} databaseId - GUID de la base de datos
   */
  function findDatabase(databaseId) {
    return databases.value.find((db) => db.id === databaseId)
  }

  /**
   * Filtra bases de datos por motor
   * @param {number} engineId - ID del motor (1-4)
   */
  function filterByEngine(engineId) {
    return databases.value.filter(
      (db) => databaseService.getEngineIdFromName(db.engine) === engineId,
    )
  }

  /**
   * Limpia el error actual
   */
  function clearError() {
    error.value = null
  }

  /**
   * Limpia el estado actual
   */
  function clearCurrent() {
    currentDatabase.value = null
  }

  /**
   * Limpia todo el store (logout)
   */
  function $reset() {
    databases.value = []
    currentDatabase.value = null
    loading.value = false
    error.value = null
    lastFetch.value = null
  }

  return {
    // State
    databases,
    currentDatabase,
    loading,
    error,
    lastFetch,

    // Getters
    activeDatabases,
    deletedDatabases,
    totalDatabases,
    databasesByEngine,
    countByEngine,
    statistics,
    hasData,
    needsRefresh,

    // Actions
    fetchDatabases,
    fetchDatabaseById,
    createDatabase,
    deleteDatabase,
    restoreDatabase,
    resetPassword,
    findDatabase,
    filterByEngine,
    clearError,
    clearCurrent,
    $reset,
  }
})
