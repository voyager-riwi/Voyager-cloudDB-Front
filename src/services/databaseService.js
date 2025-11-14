import api from './api'
import {
  ENGINE_TYPES,
  getEngineName,
  getEngineLabel,
  DATABASE_STATUS,
  GRACE_PERIOD_DAYS,
} from '@/utils/constants/database'

/**
 * Servicio para gestión de bases de datos
 */
class DatabaseService {
  /**
   * Obtiene todas las bases de datos del usuario
   * @returns {Promise<Array>} Lista de bases de datos
   */
  async getAllDatabases() {
    try {
      const databases = await api.databases.list()
      return databases || []
    } catch (error) {
      console.error('Error obteniendo bases de datos:', error)
      throw error
    }
  }

  /**
   * Obtiene una base de datos específica
   * @param {string} databaseId - GUID de la base de datos
   * @returns {Promise<Object>} Detalles de la base de datos
   */
  async getDatabaseById(databaseId) {
    try {
      const database = await api.databases.get(databaseId)

   

      return database
    } catch (error) {
      console.error(`Error obteniendo base de datos ${databaseId}:`, error)
      throw error
    }
  }

  /**
   * Crea una nueva base de datos
   * @param {number} engineId - ID del motor (1=PostgreSQL, 2=MySQL, 3=MongoDB, 4=SQLServer)
   * @returns {Promise<Object>} Base de datos creada con credenciales
   */
  async createDatabase(engineId) {
    try {
      // Validar engine
      if (!engineId || engineId < 1 || engineId > 4) {
        throw new Error('Motor de base de datos inválido')
      }

      const database = await api.databases.create({ engine: engineId })

      // ⚠️ IMPORTANTE: Las credenciales se muestran UNA SOLA VEZ
      if (database.connectionString && !database.credentialsViewed) {
        console.warn('⚠️ CREDENCIALES MOSTRADAS POR ÚNICA VEZ - También enviadas por email')
      }

      return database
    } catch (error) {
      console.error('Error creando base de datos:', error)
      throw error
    }
  }

  /**
   * Elimina una base de datos (Soft Delete - 30 días de gracia)
   * @param {string} databaseId - GUID de la base de datos
   * @returns {Promise<Object>} Resultado de la eliminación
   */
  async deleteDatabase(databaseId) {
    try {
      const result = await api.databases.delete(databaseId)

      console.info(
        `✅ Base de datos eliminada (Soft Delete). Período de gracia: ${GRACE_PERIOD_DAYS} días`,
      )

      return {
        success: result.success,
        message:
          result.message ||
          `Base de datos eliminada. Puedes restaurarla durante ${GRACE_PERIOD_DAYS} días.`,
        gracePeriodDays: GRACE_PERIOD_DAYS,
      }
    } catch (error) {
      console.error(`Error eliminando base de datos ${databaseId}:`, error)
      throw error
    }
  }

  /**
   * Restaura una base de datos eliminada
   * @param {string} databaseId - GUID de la base de datos eliminada
   * @returns {Promise<Object>} Resultado de la restauración
   */
  async restoreDatabase(databaseId) {
    try {
      const result = await api.databases.restore(databaseId)

      console.info('✅ Base de datos restaurada exitosamente')

      return {
        success: result.success,
        message: result.message || 'Base de datos restaurada. Nueva contraseña enviada por email.',
      }
    } catch (error) {
      // Verificar si el período de gracia expiró
      if (error.message && error.message.includes('grace period expired')) {
        throw new Error(
          `No se puede restaurar: el período de gracia de ${GRACE_PERIOD_DAYS} días ha expirado.`,
        )
      }

      console.error(`Error restaurando base de datos ${databaseId}:`, error)
      throw error
    }
  }

  /**
   * Resetea la contraseña de una base de datos
   * @param {string} databaseId - GUID de la base de datos
   * @returns {Promise<Object>} Resultado del reset
   */
  async resetDatabasePassword(databaseId) {
    try {
      const result = await api.databases.resetPassword(databaseId)

      console.info('✅ Contraseña reseteada - Nueva password enviada por email')

      return {
        success: result.success,
        message:
          result.message ||
          'Contraseña reseteada exitosamente. Revisa tu email para la nueva contraseña.',
      }
    } catch (error) {
      console.error(`Error reseteando password de BD ${databaseId}:`, error)
      throw error
    }
  }

  /**
   * Agrupa bases de datos por motor
   * @param {Array} databases - Lista de bases de datos
   * @returns {Object} Bases de datos agrupadas por motor
   */
  groupByEngine(databases) {
    const grouped = {
      [ENGINE_TYPES.POSTGRESQL]: [],
      [ENGINE_TYPES.MYSQL]: [],
      [ENGINE_TYPES.MONGODB]: [],
      [ENGINE_TYPES.SQLSERVER]: [],
    }

    databases.forEach((db) => {
      const engineId = this.getEngineIdFromName(db.engine)
      if (engineId && grouped[engineId]) {
        grouped[engineId].push(db)
      }
    })

    return grouped
  }

  /**
   * Convierte nombre de motor a ID
   * @param {string} engineName - Nombre del motor
   * @returns {number|null} ID del motor o null
   */
  getEngineIdFromName(engineName) {
    const map = {
      PostgreSQL: ENGINE_TYPES.POSTGRESQL,
      MySQL: ENGINE_TYPES.MYSQL,
      MongoDB: ENGINE_TYPES.MONGODB,
      SQLServer: ENGINE_TYPES.SQLSERVER,
      'SQL Server': ENGINE_TYPES.SQLSERVER,
    }
    return map[engineName] || null
  }

  /**
   * Cuenta bases de datos por motor
   * @param {Array} databases - Lista de bases de datos
   * @returns {Object} Conteo por motor { engineId: count }
   *
   * IMPORTANTE: Cuenta TODAS las bases de datos (activas + desactivadas)
   * porque ambas ocupan un slot del plan. Solo las eliminadas permanentemente
   * (después de 30 días) liberan slots.
   */
  countByEngine(databases) {
    const counts = {
      [ENGINE_TYPES.POSTGRESQL]: 0,
      [ENGINE_TYPES.MYSQL]: 0,
      [ENGINE_TYPES.MONGODB]: 0,
      [ENGINE_TYPES.SQLSERVER]: 0,
    }


    databases.forEach((db) => {
      // Contar TODAS las bases de datos (activas + desactivadas)
      // Las desactivadas están en período de gracia (30 días) y siguen ocupando un slot
      // Solo se libera el slot cuando se eliminan permanentemente
      const engineId = this.getEngineIdFromName(db.engine)



      if (engineId && counts[engineId] !== undefined) {
        counts[engineId]++
      }
    })

    return counts
  }

  /**
   * Filtra bases de datos por estado
   * @param {Array} databases - Lista de bases de datos
   * @param {string} status - Estado a filtrar (Running, Stopped, Deleted)
   * @returns {Array} Bases de datos filtradas
   */
  filterByStatus(databases, status) {
    return databases.filter((db) => db.status === status)
  }

  /**
   * Obtiene estadísticas de bases de datos
   * @param {Array} databases - Lista de bases de datos
   * @returns {Object} Estadísticas generales
   */
  getStatistics(databases) {
    const total = databases.length
    const running = this.filterByStatus(databases, DATABASE_STATUS.RUNNING).length
    const stopped = this.filterByStatus(databases, DATABASE_STATUS.STOPPED).length
    const deleted = this.filterByStatus(databases, DATABASE_STATUS.DELETED).length

    const byEngine = this.countByEngine(databases)

    return {
      total,
      running,
      stopped,
      deleted,
      byEngine,
      engines: {
        postgresql: byEngine[ENGINE_TYPES.POSTGRESQL],
        mysql: byEngine[ENGINE_TYPES.MYSQL],
        mongodb: byEngine[ENGINE_TYPES.MONGODB],
        sqlserver: byEngine[ENGINE_TYPES.SQLSERVER],
      },
    }
  }

  /**
   * Valida si una base de datos se puede eliminar
   * @param {Object} database - Base de datos a validar
   * @returns {Object} { canDelete: boolean, reason: string }
   */
  canDelete(database) {
    if (!database) {
      return { canDelete: false, reason: 'Base de datos no encontrada' }
    }

    if (database.status === DATABASE_STATUS.DELETED) {
      return { canDelete: false, reason: 'La base de datos ya está eliminada' }
    }

    return { canDelete: true, reason: 'OK' }
  }

  /**
   * Valida si una base de datos se puede restaurar
   * @param {Object} database - Base de datos a validar
   * @returns {Object} { canRestore: boolean, reason: string }
   */
  canRestore(database) {
    if (!database) {
      return { canRestore: false, reason: 'Base de datos no encontrada' }
    }

    if (database.status !== DATABASE_STATUS.DELETED) {
      return { canRestore: false, reason: 'La base de datos no está eliminada' }
    }

    // Verificar período de gracia (si tenemos la fecha de eliminación)
    if (database.deletedAt) {
      const deletedDate = new Date(database.deletedAt)
      const now = new Date()
      const daysPassed = Math.floor((now - deletedDate) / (1000 * 60 * 60 * 24))

      if (daysPassed > GRACE_PERIOD_DAYS) {
        return {
          canRestore: false,
          reason: `Período de gracia expirado (${daysPassed} días)`,
        }
      }
    }

    return { canRestore: true, reason: 'OK' }
  }

  /**
   * Formatea la cadena de conexión para mostrar
   * @param {string} connectionString - Cadena de conexión completa
   * @param {boolean} hidePassword - Si debe ocultar la contraseña
   * @returns {string} Cadena de conexión formateada
   */
  formatConnectionString(connectionString, hidePassword = false) {
    if (!connectionString) return ''

    if (hidePassword) {
      return connectionString.replace(/Password=([^;]+)/i, 'Password=********')
    }

    return connectionString
  }

  /**
   * Obtiene información enriquecida de una base de datos
   * @param {Object} database - Base de datos
   * @returns {Object} Información enriquecida
   */
  enrichDatabase(database) {
    const engineId = this.getEngineIdFromName(database.engine)

    return {
      ...database,
      engineId,
      engineLabel: getEngineLabel(engineId),
      engineName: getEngineName(engineId),
      isRunning: database.isRunning || database.status === DATABASE_STATUS.RUNNING,
      isDeleted: database.status === DATABASE_STATUS.DELETED,
      canBeRestored: this.canRestore(database).canRestore,
      canBeDeleted: this.canDelete(database).canDelete,
      connectionStringHidden: this.formatConnectionString(database.connectionString, true),
    }
  }
}

// Exportar instancia única
export default new DatabaseService()
