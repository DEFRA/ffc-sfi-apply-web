const joi = require('joi')
const ViewModel = require('./models/what-payment-level')
const getPaymentRates = require('./models/util-what-payment-level')
const cache = require('../../cache')

module.exports = [{
  method: 'GET',
  path: '/funding-options/what-payment-level',
  handler: async (request, h) => {
    const { agreement, paymentRates } = await getPaymentRates(request)
    if (paymentRates) {
      return h.view('funding-options/what-payment-level', ViewModel(
        agreement.selectedSbi.sbi, agreement.selectedStandard.name, agreement.parcelArea, paymentRates, agreement.selectedAmbitionLevel, agreement.selectedStandard.code
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
        const { agreement, paymentRates } = await getPaymentRates(request, error)
        if (paymentRates) {
          return h.view('funding-options/what-payment-levell', ViewModel(
            agreement.selectedSbi.sbi, agreement.selectedStandard.name, agreement.parcelArea, paymentRates, agreement.selectedAmbitionLevel, error
          )).code(400).takeover()
        }
        return h.view('no-response')
      }
    },
    handler: async (request, h) => {
      const agreement = await cache.get('agreement', request.yar.id)

      const level = request.payload.level
      const selectedAmbitionLevel = agreement.paymentRates[level]

      await cache.update('agreement', request.yar.id, {
        selectedAmbitionLevel: { name: level, level: selectedAmbitionLevel },
        paymentAmount: selectedAmbitionLevel.paymentAmount
      })

      await cache.update('progress', request.yar.id, {
        progress: { fundingDetails: true, paymentLevel: true }
      })

      return h.redirect('/application-task-list')
    }
  }
}]
