const { sendAgreementCalculateMessage, receiveCalculateResponseMessage } = require('../messaging')
const cache = require('../cache')
const { v4: uuidv4 } = require('uuid')

async function getPaymentRates (request, error) {
  const agreement = await cache.get(request)
  const application = agreement.application
  let paymentRates = null
  if (error && application.paymentRates) {
    paymentRates = application.paymentRates
  } else {
    const messageId = uuidv4()

    await sendAgreementCalculateMessage(
      {
        agreementNumber: application.agreementNumber,
        callerId: application.callerId,
        code: application.selectedStandard.code,
        landCovers: application.selectedLandCovers
      }, request.yar.id,
      messageId)

    const response = await receiveCalculateResponseMessage(messageId)

    if (response) {
      console.info('Calculate request received', response)
      await cache.update(request, { application: { paymentRates: response } })
      paymentRates = response
    }
  }
  return { application, paymentRates }
}

module.exports = getPaymentRates
