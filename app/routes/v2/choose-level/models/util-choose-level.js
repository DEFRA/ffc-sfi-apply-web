const getPollingResponse = require('../../../../polling')
const cache = require('../../../../cache')

async function getPaymentRates (request, error) {
  const applyJourney = await cache.get('apply-journey', request.yar.id)
  let paymentRates = null
  if (error && applyJourney.paymentRates) {
    paymentRates = applyJourney.paymentRates
  } else {
    const response = await getPollingResponse(request.yar.id, '/calculate')
    if (response) {
      console.info('Calculate request received', response)
      await cache.update('apply-journey', request.yar.id, { paymentRates: response.paymentRates })
      paymentRates = response.paymentRates
    }
  }
  return { applyJourney, paymentRates }
}

module.exports = getPaymentRates
