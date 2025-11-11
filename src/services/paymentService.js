import api from './api'

/**
 * Servicio para gestión de pagos con MercadoPago
 */
class PaymentService {
  /**
   * Crea una preferencia de pago en MercadoPago
   * @param {string} planId - GUID del plan a comprar
   * @returns {Promise<Object>} { preferenceId, initPoint }
   */
  async createPaymentPreference(planId) {
    try {
      const response = await api.payments.createPreference({ planId })

      if (response.succeeded && response.data) {
        return {
          success: true,
          preferenceId: response.data.preferenceId,
          initPoint: response.data.initPoint,
          message: response.message,
        }
      }

      throw new Error(response.message || 'Error creando preferencia de pago')
    } catch (error) {
      console.error('Error creando preferencia de pago:', error)
      throw error
    }
  }

  /**
   * Redirige al usuario a MercadoPago para completar el pago
   * @param {string} initPoint - URL de inicio de MercadoPago
   */
  redirectToPayment(initPoint) {
    if (!initPoint) {
      throw new Error('URL de pago no válida')
    }

    // Redirigir en la misma ventana
    window.location.href = initPoint
  }

  /**
   * Crea preferencia y redirige al usuario (método de conveniencia)
   * @param {string} planId - GUID del plan a comprar
   * @returns {Promise<void>}
   */
  async createAndRedirect(planId) {
    try {
      const { initPoint } = await this.createPaymentPreference(planId)
      this.redirectToPayment(initPoint)
    } catch (error) {
      console.error('Error en flujo de pago:', error)
      throw error
    }
  }

  /**
   * Verifica la configuración de MercadoPago (solo para debug)
   * @returns {Promise<Object>} Estado de configuración
   */
  async checkConfiguration() {
    try {
      const config = await api.payments.getConfigTest()
      return config
    } catch (error) {
      console.error('Error verificando configuración de MercadoPago:', error)
      throw error
    }
  }

  /**
   * Consulta el estado de una orden en MercadoPago (solo para debug)
   * @param {number} orderId - ID de la orden en MercadoPago
   * @returns {Promise<Object>} Estado de la orden
   */
  async debugOrder(orderId) {
    try {
      const orderStatus = await api.payments.debugOrder(orderId)
      return orderStatus
    } catch (error) {
      console.error(`Error consultando orden ${orderId}:`, error)
      throw error
    }
  }

  /**
   * Procesa el retorno desde MercadoPago
   * @param {URLSearchParams} queryParams - Parámetros de la URL de retorno
   * @returns {Object} Información del pago procesado
   */
  processPaymentReturn(queryParams) {
    const status = queryParams.get('status')
    const paymentId = queryParams.get('payment_id')
    const preferenceId = queryParams.get('preference_id')
    const externalReference = queryParams.get('external_reference')

    const statusMap = {
      approved: {
        success: true,
        message: '¡Pago aprobado! Tu plan se actualizará en breve.',
        icon: '✅',
      },
      pending: {
        success: false,
        message: 'Tu pago está pendiente de confirmación.',
        icon: '⏳',
      },
      rejected: {
        success: false,
        message: 'El pago fue rechazado. Por favor, intenta con otro método.',
        icon: '❌',
      },
      in_process: {
        success: false,
        message: 'Tu pago está en proceso. Te notificaremos cuando se confirme.',
        icon: '🔄',
      },
    }

    const result = statusMap[status] || {
      success: false,
      message: 'Estado de pago desconocido.',
      icon: '❓',
    }

    return {
      ...result,
      status,
      paymentId,
      preferenceId,
      externalReference,
      timestamp: new Date().toISOString(),
    }
  }

  /**
   * Extrae el plan ID de la referencia externa
   * @param {string} externalReference - Referencia externa (user:xxx;plan:xxx)
   * @returns {Object} { userId, planId }
   */
  parseExternalReference(externalReference) {
    if (!externalReference) {
      return { userId: null, planId: null }
    }

    try {
      const parts = externalReference.split(';')
      const userPart = parts.find((p) => p.startsWith('user:'))
      const planPart = parts.find((p) => p.startsWith('plan:'))

      return {
        userId: userPart ? userPart.split(':')[1] : null,
        planId: planPart ? planPart.split(':')[1] : null,
      }
    } catch (error) {
      console.error('Error parseando referencia externa:', error)
      return { userId: null, planId: null }
    }
  }

  /**
   * Verifica si el pago fue exitoso según los parámetros de retorno
   * @param {URLSearchParams} queryParams - Parámetros de la URL de retorno
   * @returns {boolean} True si el pago fue aprobado
   */
  isPaymentSuccessful(queryParams) {
    const status = queryParams.get('status')
    return status === 'approved'
  }

  /**
   * Obtiene mensajes de error comunes de MercadoPago
   * @param {string} errorCode - Código de error
   * @returns {string} Mensaje de error traducido
   */
  getErrorMessage(errorCode) {
    const errors = {
      cc_rejected_insufficient_amount: 'Fondos insuficientes en la tarjeta.',
      cc_rejected_bad_filled_security_code: 'Código de seguridad inválido.',
      cc_rejected_call_for_authorize: 'Debes autorizar el pago con tu banco.',
      cc_rejected_card_disabled: 'La tarjeta está deshabilitada.',
      cc_rejected_duplicated_payment: 'Ya existe un pago con estos datos.',
      cc_rejected_high_risk: 'Pago rechazado por riesgo de fraude.',
      cc_rejected_invalid_installments: 'Número de cuotas inválido.',
      cc_rejected_max_attempts: 'Excediste el número de intentos permitidos.',
    }

    return errors[errorCode] || 'Error procesando el pago. Por favor, intenta nuevamente.'
  }
}

// Exportar instancia única
export default new PaymentService()
