const { sendAgreementCalculateMessage, receiveCalculateResponseMessage } = require('../../../messaging')
const cache = require('../../../cache')
const { v4: uuidv4 } = require('uuid')

async function getPaymentRates (request, error) {
  const agreement = await cache.get('agreement', request.yar.id)
  let paymentRates = null
  if (error && agreement.paymentRates) {
    paymentRates = agreement.paymentRates
  } else {
    const messageId = uuidv4()

    await sendAgreementCalculateMessage(
      {
        agreementNumber: agreement.agreementNumber,
        callerId: agreement.callerId,
        code: agreement.selectedStandard.code,
        parcels: agreement.selectedParcels.map(x => ({ area: x.value }))
      }, request.yar.id,
      messageId)

    const response = await receiveCalculateResponseMessage(messageId)

    if (response) {
      console.info('Calculate request received', response)
      await cache.update('agreement', request.yar.id, { paymentRates: response })
      paymentRates = response
    }
  }
  return { agreement, paymentRates }
}

module.exports = getPaymentRates
