import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import planService from '@/services/planService'
import { PLAN_TYPES } from '@/utils/constants/database'

export const usePlanStore = defineStore('plans', () => {
  // ==================== STATE ====================
  const plans = ref([])
  const currentPlan = ref(null)
  const loading = ref(false)
  const error = ref(null)
  const lastFetch = ref(null)

  // ==================== GETTERS (COMPUTED) ====================

  /**
   * Plan gratuito
   */
  const freePlan = computed(() => plans.value.find((p) => p.planType === PLAN_TYPES.FREE))

  /**
   * Plan intermedio
   */
  const intermediatePlan = computed(() =>
    plans.value.find((p) => p.planType === PLAN_TYPES.INTERMEDIATE),
  )

  /**
   * Plan avanzado
   */
  const advancedPlan = computed(() => plans.value.find((p) => p.planType === PLAN_TYPES.ADVANCED))

  /**
   * Planes ordenados por precio (Free -> Intermediate -> Advanced)
   */
  const sortedPlans = computed(() => {
    return [...plans.value].sort((a, b) => a.planType - b.planType)
  })

  /**
   * Total de planes disponibles
   */
  const totalPlans = computed(() => plans.value.length)

  /**
   * Verifica si hay datos cargados
   */
  const hasData = computed(() => plans.value.length > 0)

  /**
   * Verifica si necesita refrescar (última carga > 15 minutos)
   */
  const needsRefresh = computed(() => {
    if (!lastFetch.value) return true
    const fifteenMinutes = 15 * 60 * 1000
    return Date.now() - lastFetch.value > fifteenMinutes
  })

  // ==================== ACTIONS ====================

  /**
   * Obtiene todos los planes disponibles
   * @param {boolean} force - Forzar recarga aunque haya datos
   */
  const fetchPlans = async (force = false) => {
    // Si ya hay datos y no es forzado, no recargar
    if (!force && hasData.value && !needsRefresh.value) {
      return plans.value
    }

    loading.value = true
    error.value = null

    try {
      const data = await planService.getAllPlans()
      plans.value = data || []
      lastFetch.value = Date.now()
      return plans.value
    } catch (err) {
      error.value = err.message || 'Error cargando planes'
      console.error('Error en fetchPlans:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  /**
   * Obtiene un plan específico por ID
   * @param {string} planId - GUID del plan
   */
  const fetchPlanById = async (planId) => {
    loading.value = true
    error.value = null

    try {
      const data = await planService.getPlanById(planId)
      currentPlan.value = data

      // Actualizar en la lista si existe
      const index = plans.value.findIndex((p) => p.id === planId)
      if (index !== -1) {
        plans.value[index] = data
      } else {
        plans.value.push(data)
      }

      return currentPlan.value
    } catch (err) {
      error.value = err.message || 'Error cargando plan'
      console.error('Error en fetchPlanById:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  /**
   * Busca un plan en el store
   * @param {string} planId - GUID del plan
   */
  const findPlan = (planId) => {
    return plans.value.find((p) => p.id === planId)
  }

  /**
   * Busca un plan por tipo
   * @param {number} planType - Tipo de plan (1=Free, 2=Intermediate, 3=Advanced)
   */
  const findPlanByType = (planType) => {
    return plans.value.find((p) => p.planType === planType)
  }

  /**
   * Obtiene información enriquecida de un plan
   * @param {number} planType - Tipo de plan
   */
  const getPlanInfo = (planType) => {
    return planService.getPlanInfo(planType)
  }

  /**
   * Compara dos planes
   * @param {number} currentPlanType - Tipo de plan actual
   * @param {number} targetPlanType - Tipo de plan objetivo
   */
  const comparePlans = (currentPlanType, targetPlanType) => {
    return planService.comparePlans(currentPlanType, targetPlanType)
  }

  /**
   * Verifica si puede crear una base de datos
   * @param {number} planType - Tipo de plan del usuario
   * @param {number} currentCount - Cantidad actual de BDs del motor
   */
  const canCreateDatabase = (planType, currentCount) => {
    return planService.canCreateDatabase(planType, currentCount)
  }

  /**
   * Calcula uso de BDs por motor
   * @param {Array} databases - Lista de bases de datos del usuario
   * @param {number} planType - Tipo de plan del usuario
   */
  const calculateUsage = (databases, planType) => {
    return planService.calculateUsageByEngine(databases, planType)
  }

  /**
   * Obtiene recomendaciones de plan
   * @param {Array} databases - Lista de bases de datos del usuario
   * @param {number} currentPlanType - Tipo de plan actual
   */
  const getRecommendations = (databases, currentPlanType) => {
    return planService.getRecommendations(databases, currentPlanType)
  }

  /**
   * Selecciona un plan como actual
   * @param {Object} plan - Plan a seleccionar
   */
  const selectPlan = (plan) => {
    currentPlan.value = plan
  }

  /**
   * Limpia el plan actual
   */
  const clearCurrent = () => {
    currentPlan.value = null
  }

  /**
   * Limpia el error actual
   */
  const clearError = () => {
    error.value = null
  }

  /**
   * Limpia todo el store (logout)
   */
  const $reset = () => {
    plans.value = []
    currentPlan.value = null
    loading.value = false
    error.value = null
    lastFetch.value = null
  }

  return {
    // State
    plans,
    currentPlan,
    loading,
    error,
    lastFetch,

    // Getters
    freePlan,
    intermediatePlan,
    advancedPlan,
    sortedPlans,
    totalPlans,
    hasData,
    needsRefresh,

    // Actions
    fetchPlans,
    fetchPlanById,
    findPlan,
    findPlanByType,
    getPlanInfo,
    comparePlans,
    canCreateDatabase,
    calculateUsage,
    getRecommendations,
    selectPlan,
    clearCurrent,
    clearError,
    $reset,
  }
})
