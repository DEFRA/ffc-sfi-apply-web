const ViewModel = require('./models/choose-level')
const cache = require('../../../cache')
const getPollingResponse = require('../../../polling')

module.exports = [{
  method: 'GET',
  path: '/v2/choose-level',
  handler: async (request, h) => {
    const applyJourney = await cache.get('apply-journey', request.yar.id)
    const response = await getPollingResponse(request.yar.id, '/calculate')
    if (response) {
      console.info('Calculate request received', response)
      await cache.update('apply-journey', request.yar.id, { paymentRates: response.paymentRates })
      return h.view('v2/choose-level/choose-level', ViewModel(
        applyJourney.selectedSbi.sbi, applyJourney.selectedStandard.name, applyJourney.parcelArea, response.paymentRates
      ))
    }
    return h.view('no-response')
  }
},
{
  method: 'POST',
  path: '/v2/choose-level',
  handler: async (request, h) => {
    const applyJourney = await cache.get('apply-journey', request.yar.id)

    const level = request.payload.level
    const selectedAmbitionLevel = applyJourney.paymentRates[level]

    await cache.update('apply-journey', request.yar.id, { selectedAmbitionLevel: { name: level, level: selectedAmbitionLevel } })

    return h.redirect('/v2/summary')
  }
}]
