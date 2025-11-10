/**
 * Constantes relacionadas con bases de datos y planes
 */

// Tipos de motores de bases de datos
export const ENGINE_TYPES = {
  POSTGRESQL: 1,
  MYSQL: 2,
  MONGODB: 3,
  SQLSERVER: 4,
}

// Mapeo inverso: número a nombre
export const ENGINE_NAMES = {
  1: 'PostgreSQL',
  2: 'MySQL',
  3: 'MongoDB',
  4: 'SQLServer',
}

// Mapeo para labels en UI
export const ENGINE_LABELS = {
  1: 'PostgreSQL',
  2: 'MySQL',
  3: 'MongoDB',
  4: 'SQL Server',
}

// Tipos de planes
export const PLAN_TYPES = {
  FREE: 1,
  INTERMEDIATE: 2,
  ADVANCED: 3,
}

// Nombres de planes
export const PLAN_NAMES = {
  1: 'Free Plan',
  2: 'Intermediate Plan',
  3: 'Advanced Plan',
}

// Límites de bases de datos por plan
export const PLAN_LIMITS = {
  1: 2, // Free: 2 BDs por motor
  2: 5, // Intermediate: 5 BDs por motor
  3: 10, // Advanced: 10 BDs por motor
}

// Precios de planes (en COP)
export const PLAN_PRICES = {
  1: 0, // Free: $0
  2: 5000, // Intermediate: $5,000
  3: 10000, // Advanced: $10,000
}

// Estados de bases de datos
export const DATABASE_STATUS = {
  RUNNING: 'Running',
  STOPPED: 'Stopped',
  DELETED: 'Deleted',
  PENDING: 'Pending',
}

// Período de gracia para restauración (en días)
export const GRACE_PERIOD_DAYS = 30

// Puertos por defecto de cada motor
export const DEFAULT_PORTS = {
  1: 5432, // PostgreSQL
  2: 3306, // MySQL
  3: 27017, // MongoDB
  4: 1433, // SQL Server
}

// Colores para cada motor (tema Harry Potter)
export const ENGINE_COLORS = {
  1: {
    // PostgreSQL - Ravenclaw
    primary: '#0E4C92',
    secondary: '#946B2D',
    gradient: 'from-blue-900 via-blue-700 to-yellow-600',
  },
  2: {
    // MySQL - Gryffindor
    primary: '#740001',
    secondary: '#D3A625',
    gradient: 'from-red-900 via-red-700 to-yellow-500',
  },
  3: {
    // MongoDB - Slytherin
    primary: '#1A472A',
    secondary: '#5D5D5D',
    gradient: 'from-green-900 via-green-700 to-gray-600',
  },
  4: {
    // SQL Server - Hufflepuff
    primary: '#FFD800',
    secondary: '#000000',
    gradient: 'from-yellow-600 via-yellow-500 to-gray-800',
  },
}

// Iconos para cada motor (emojis)
export const ENGINE_ICONS = {
  1: '🐘', // PostgreSQL (elefante)
  2: '🐬', // MySQL (delfín)
  3: '🍃', // MongoDB (hoja)
  4: '🗄️', // SQL Server (servidor)
}

/**
 * Obtiene el nombre del motor por su ID
 * @param {number} engineId - ID del motor (1-4)
 * @returns {string} Nombre del motor
 */
export function getEngineName(engineId) {
  return ENGINE_NAMES[engineId] || 'Unknown'
}

/**
 * Obtiene el label del motor para UI
 * @param {number} engineId - ID del motor (1-4)
 * @returns {string} Label del motor
 */
export function getEngineLabel(engineId) {
  return ENGINE_LABELS[engineId] || 'Unknown'
}

/**
 * Obtiene el nombre del plan por su tipo
 * @param {number} planType - Tipo de plan (1-3)
 * @returns {string} Nombre del plan
 */
export function getPlanName(planType) {
  return PLAN_NAMES[planType] || 'Unknown Plan'
}

/**
 * Convierte el nombre del plan (string) a su tipo numérico
 * @param {string} planName - Nombre del plan ('free', 'intermediate', 'advanced')
 * @returns {number} Tipo de plan (1-3)
 */
export function getPlanTypeFromName(planName) {
  const planMap = {
    free: PLAN_TYPES.FREE,
    intermediate: PLAN_TYPES.INTERMEDIATE,
    advanced: PLAN_TYPES.ADVANCED,
  }
  return planMap[planName?.toLowerCase()] || PLAN_TYPES.FREE
}

/**
 * Obtiene el límite de BDs por motor para un plan (acepta string o número)
 * @param {number|string} planType - Tipo de plan (1-3) o nombre ('free', 'intermediate', 'advanced')
 * @returns {number} Límite de bases de datos
 */
export function getPlanLimit(planType) {
  // Si es string, convertir a número
  if (typeof planType === 'string') {
    planType = getPlanTypeFromName(planType)
  }
  return PLAN_LIMITS[planType] || 0
}

/**
 * Obtiene el precio de un plan
 * @param {number} planType - Tipo de plan (1-3)
 * @returns {number} Precio en COP
 */
export function getPlanPrice(planType) {
  return PLAN_PRICES[planType] || 0
}

/**
 * Formatea el precio en formato colombiano
 * @param {number} price - Precio en COP
 * @returns {string} Precio formateado (ej: $5.000)
 */
export function formatPrice(price) {
  return new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    minimumFractionDigits: 0,
  }).format(price)
}

/**
 * Calcula el total máximo de bases de datos para un plan
 * @param {number} planType - Tipo de plan (1-3)
 * @returns {number} Total máximo (límite * 4 motores)
 */
export function getMaxTotalDatabases(planType) {
  const limit = getPlanLimit(planType)
  return limit * 4 // 4 motores disponibles
}

/**
 * Obtiene el color del motor para UI
 * @param {number} engineId - ID del motor (1-4)
 * @returns {Object} { primary, secondary, gradient }
 */
export function getEngineColors(engineId) {
  return (
    ENGINE_COLORS[engineId] || {
      primary: '#6B7280',
      secondary: '#9CA3AF',
      gradient: 'from-gray-700 to-gray-500',
    }
  )
}

/**
 * Obtiene el icono del motor
 * @param {number} engineId - ID del motor (1-4)
 * @returns {string} Emoji del motor
 */
export function getEngineIcon(engineId) {
  return ENGINE_ICONS[engineId] || '💾'
}

/**
 * Obtiene el puerto por defecto del motor
 * @param {number} engineId - ID del motor (1-4)
 * @returns {number} Puerto por defecto
 */
export function getDefaultPort(engineId) {
  return DEFAULT_PORTS[engineId] || 0
}

/**
 * Valida si un motor es válido
 * @param {number} engineId - ID del motor
 * @returns {boolean} True si es válido (1-4)
 */
export function isValidEngine(engineId) {
  return engineId >= 1 && engineId <= 4
}

/**
 * Valida si un plan es válido
 * @param {number} planType - Tipo de plan
 * @returns {boolean} True si es válido (1-3)
 */
export function isValidPlan(planType) {
  return planType >= 1 && planType <= 3
}

export default {
  ENGINE_TYPES,
  ENGINE_NAMES,
  ENGINE_LABELS,
  PLAN_TYPES,
  PLAN_NAMES,
  PLAN_LIMITS,
  PLAN_PRICES,
  DATABASE_STATUS,
  GRACE_PERIOD_DAYS,
  DEFAULT_PORTS,
  ENGINE_COLORS,
  ENGINE_ICONS,
  getEngineName,
  getEngineLabel,
  getPlanName,
  getPlanLimit,
  getPlanTypeFromName,
  getPlanPrice,
  formatPrice,
  getMaxTotalDatabases,
  getEngineColors,
  getEngineIcon,
  getDefaultPort,
  isValidEngine,
  isValidPlan,
}
