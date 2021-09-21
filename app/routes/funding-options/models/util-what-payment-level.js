const { sendAgreementCalculateMessage, receiveCalculateResponseMessage } = require('../../../messaging')
const cache = require('../../../cache')
const { v4: uuidv4 } = require('uuid')

async function getPaymentRates (request, error) {
  const applyJourney = await cache.get('apply-journey', request.yar.id)
  let paymentRates = null
  if (error && applyJourney.paymentRates) {
    paymentRates = applyJourney.paymentRates
  } else {
    const messageId = uuidv4()

    await sendAgreementCalculateMessage(
      {
        agreementNumber: applyJourney.agreementNumber,
        callerId: applyJourney.callerId,
        code: applyJourney.selectedStandard.code,
        parcels: applyJourney.selectedParcels.map(x => ({ area: x.value }))
      }, request.yar.id,
      messageId)

    const response = await receiveCalculateResponseMessage(messageId)

    if (response) {
      console.info('Calculate request received', response)
      await cache.update('apply-journey', request.yar.id, { paymentRates: response })
      paymentRates = response
    }
  }
  return { applyJourney, paymentRates }
}

module.exports = getPaymentRates
