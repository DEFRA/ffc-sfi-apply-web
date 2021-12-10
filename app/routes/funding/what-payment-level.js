const Joi = require('joi')
const ViewModel = require('./models/what-payment-level')
const getPaymentRates = require('../../funding/get-payment-rates')
const cache = require('../../cache')

module.exports = [{
  method: 'GET',
  path: '/funding/what-payment-level',
  options: {
    handler: async (request, h) => {
      const { application, paymentRates } = await getPaymentRates(request)
      if (paymentRates) {
        return h.view('funding/what-payment-level', ViewModel(
          application.selectedOrganisation.sbi,
          application.selectedStandard.name,
          application.parcelArea, paymentRates,
          application.selectedAmbitionLevel,
          application.selectedStandard.code
        ))
      }
      return h.view('no-response')
    }
  }
},
{
  method: 'POST',
  path: '/funding/what-payment-level',
  options: {
    validate: {
      payload: Joi.object({
        level: Joi.any().required()
      }),
      failAction: async (request, h, error) => {
        const { agreement, paymentRates } = await getPaymentRates(request, error)
        if (paymentRates) {
          return h.view('funding/what-payment-level', ViewModel(
            agreement.selectedOrganisation.sbi, agreement.selectedStandard.name, agreement.parcelArea, paymentRates, agreement.selectedAmbitionLevel, error
          )).code(400).takeover()
        }
        return h.view('no-response')
      }
    },
    handler: async (request, h) => {
      const agreement = await cache.get(request)

      const level = request.payload.level
      const selectedAmbitionLevel = agreement.application.paymentRates[level]

      await cache.update(request, {
        application: {
          selectedAmbitionLevel: { name: level, level: selectedAmbitionLevel },
          paymentAmount: selectedAmbitionLevel.paymentAmount
        }
      })

      await cache.update(request, {
        progress: { fundingDetails: true, paymentLevel: true }
      })

      return h.redirect('/task-list')
    }
  }
}]
