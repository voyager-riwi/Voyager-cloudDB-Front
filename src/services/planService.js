import api from './api'
import {
  PLAN_TYPES,
  getPlanName,
  getPlanLimit,
  getPlanPrice,
  formatPrice,
} from '@/utils/constants/database'

/**
 * Servicio para gestión de planes
 */
class PlanService {
  /**
   * Obtiene todos los planes disponibles
   * @returns {Promise<Array>} Lista de planes
   */
  async getAllPlans() {
    try {
      const plans = await api.plans.list()
      return plans
    } catch (error) {
      console.error('Error obteniendo planes:', error)
      throw error
    }
  }

  /**
   * Obtiene un plan específico por ID
   * @param {string} planId - GUID del plan
   * @returns {Promise<Object>} Detalles del plan
   */
  async getPlanById(planId) {
    try {
      const plan = await api.plans.get(planId)
      return plan
    } catch (error) {
      console.error(`Error obteniendo plan ${planId}:`, error)
      throw error
    }
  }

  /**
   * Obtiene información de un plan con datos enriquecidos
   * @param {number} planType - Tipo de plan (1=Free, 2=Intermediate, 3=Advanced)
   * @returns {Object} Información del plan con helpers
   */
  getPlanInfo(planType) {
    return {
      type: planType,
      name: getPlanName(planType),
      limit: getPlanLimit(planType),
      price: getPlanPrice(planType),
      formattedPrice: formatPrice(getPlanPrice(planType)),
      maxTotal: getPlanLimit(planType) * 4, // 4 motores
      isFree: planType === PLAN_TYPES.FREE,
      isIntermediate: planType === PLAN_TYPES.INTERMEDIATE,
      isAdvanced: planType === PLAN_TYPES.ADVANCED,
    }
  }

  /**
   * Compara dos planes
   * @param {number} currentPlanType - Tipo de plan actual
   * @param {number} targetPlanType - Tipo de plan objetivo
   * @returns {Object} Comparación de planes
   */
  comparePlans(currentPlanType, targetPlanType) {
    const current = this.getPlanInfo(currentPlanType)
    const target = this.getPlanInfo(targetPlanType)

    return {
      isUpgrade: target.type > current.type,
      isDowngrade: target.type < current.type,
      isSame: target.type === current.type,
      limitDifference: target.limit - current.limit,
      priceDifference: target.price - current.price,
      formattedPriceDifference: formatPrice(Math.abs(target.price - current.price)),
    }
  }

  /**
   * Verifica si un usuario puede crear una base de datos según su plan
   * @param {number} planType - Tipo de plan del usuario
   * @param {number} currentCount - Cantidad actual de BDs de ese motor
   * @returns {Object} { canCreate: boolean, message: string }
   */
  canCreateDatabase(planType, currentCount) {
    const limit = getPlanLimit(planType)
    const canCreate = currentCount < limit

    if (canCreate) {
      return {
        canCreate: true,
        message: `Puedes crear ${limit - currentCount} base(s) de datos más de este motor.`,
        remaining: limit - currentCount,
      }
    }

    return {
      canCreate: false,
      message: `Has alcanzado el límite de ${limit} bases de datos para este motor en tu plan ${getPlanName(planType)}. Actualiza tu plan para crear más.`,
      remaining: 0,
    }
  }

  /**
   * Calcula el uso de bases de datos por motor
   * @param {Array} databases - Lista de bases de datos del usuario
   * @param {number} planType - Tipo de plan del usuario
   * @returns {Object} Uso por motor { engineId: { used, limit, remaining } }
   */
  calculateUsageByEngine(databases, planType) {
    const limit = getPlanLimit(planType)
    const usage = {}

    // Inicializar contadores para cada motor
    for (let engineId = 1; engineId <= 4; engineId++) {
      usage[engineId] = {
        used: 0,
        limit: limit,
        remaining: limit,
        percentage: 0,
      }
    }

    // Contar bases de datos por motor
    databases.forEach((db) => {
      const engineId = this.getEngineIdFromName(db.engine)
      if (engineId && usage[engineId]) {
        usage[engineId].used++
      }
    })

    // Calcular remaining y porcentaje
    Object.keys(usage).forEach((engineId) => {
      usage[engineId].remaining = usage[engineId].limit - usage[engineId].used
      usage[engineId].percentage = (usage[engineId].used / usage[engineId].limit) * 100
    })

    return usage
  }

  /**
   * Convierte nombre de motor a ID
   * @param {string} engineName - Nombre del motor (PostgreSQL, MySQL, MongoDB, SQLServer)
   * @returns {number|null} ID del motor o null si no existe
   */
  getEngineIdFromName(engineName) {
    const map = {
      PostgreSQL: 1,
      MySQL: 2,
      MongoDB: 3,
      SQLServer: 4,
      'SQL Server': 4,
    }
    return map[engineName] || null
  }

  /**
   * Obtiene recomendaciones de plan según uso actual
   * @param {Array} databases - Lista de bases de datos del usuario
   * @param {number} currentPlanType - Tipo de plan actual
   * @returns {Object} Recomendaciones
   */
  getRecommendations(databases, currentPlanType) {
    const usage = this.calculateUsageByEngine(databases, currentPlanType)

    // Si está cerca del límite en algún motor
    const nearLimit = Object.values(usage).some((u) => u.percentage >= 80)

    if (nearLimit && currentPlanType < PLAN_TYPES.ADVANCED) {
      return {
        shouldUpgrade: true,
        message: `Estás usando más del 80% de tu cupo en algún motor. Considera actualizar a ${getPlanName(currentPlanType + 1)}.`,
        suggestedPlan: currentPlanType + 1,
      }
    }

    return {
      shouldUpgrade: false,
      message: 'Tu plan actual es adecuado para tu uso.',
      suggestedPlan: currentPlanType,
    }
  }
}

// Exportar instancia única
export default new PlanService()
