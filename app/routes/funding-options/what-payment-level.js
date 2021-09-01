const joi = require('joi')
const ViewModel = require('./models/what-payment-level')
const getPaymentRates = require('./models/util-what-payment-level')
const cache = require('../../cache')

module.exports = [{
  method: 'GET',
  path: '/funding-options/what-payment-level',
  handler: async (request, h) => {
    const { applyJourney, paymentRates } = await getPaymentRates(request)
    if (paymentRates) {
      return h.view('funding-options/what-payment-level', ViewModel(
        applyJourney.selectedSbi.sbi, applyJourney.selectedStandard.name, applyJourney.parcelArea, paymentRates, applyJourney.selectedAmbitionLevel, applyJourney.selectedStandard.code
      ))
    }
    return h.view('no-response')
  }
},
{
  method: 'POST',
  path: '/funding-options/what-payment-level',
  options: {
    validate: {
      payload: joi.object({
        level: joi.any().required()
      }),
      failAction: async (request, h, error) => {
        const { applyJourney, paymentRates } = await getPaymentRates(request, error)
        if (paymentRates) {
          return h.view('funding-options/what-payment-levell', ViewModel(
            applyJourney.selectedSbi.sbi, applyJourney.selectedStandard.name, applyJourney.parcelArea, paymentRates, applyJourney.selectedAmbitionLevel, error
          )).code(400).takeover()
        }
        return h.view('no-response')
      }
    },
    handler: async (request, h) => {
      const applyJourney = await cache.get('apply-journey', request.yar.id)

      const level = request.payload.level
      const selectedAmbitionLevel = applyJourney.paymentRates[level]

      await cache.update('apply-journey', request.yar.id, { selectedAmbitionLevel: { name: level, level: selectedAmbitionLevel } })

      await cache.update('progress', request.yar.id, {
        progress: { fundingDetails: true, paymentLevel: true }
      })

      return h.redirect('/application-task-list')
    }
  }
}]
