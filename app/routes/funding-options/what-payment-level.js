const joi = require('joi')
const ViewModel = require('./models/what-payment-level')
const getPaymentRates = require('./models/util-what-payment-level')
const cache = require('../../cache')
const handler = require('../handler')

module.exports = [{
  method: 'GET',
  path: '/funding-options/what-payment-level',
  options: {
    pre: [
      handler.preHandler('what-payment-level')
    ],
    handler: async (request, h) => {
      const { applyJourney, paymentRates } = await getPaymentRates(request)
      if (paymentRates) {
        const journeyItem = request.pre.journeyItem
        return h.view(journeyItem.view, ViewModel(
          applyJourney.selectedSbi.sbi, applyJourney.selectedStandard.name, applyJourney.parcelArea, paymentRates, applyJourney.selectedAmbitionLevel, applyJourney.selectedStandard.code, journeyItem
        ))
      }
      return h.view('no-response')
    }
  }
},
{
  method: 'POST',
  path: '/funding-options/what-payment-level',
  options: {
    pre: [
      handler.preHandler('what-payment-level')
    ],
    validate: {
      payload: joi.object({
        level: joi.any().required()
      }),
      failAction: async (request, h, error) => {
        const { applyJourney, paymentRates } = await getPaymentRates(request, error)
        if (paymentRates) {
          const journeyItem = request.pre.journeyItem
          return h.view(journeyItem.view, ViewModel(
            applyJourney.selectedSbi.sbi, applyJourney.selectedStandard.name, applyJourney.parcelArea, paymentRates, applyJourney.selectedAmbitionLevel, journeyItem, error
          )).code(400).takeover()
        }
        return h.view('no-response')
      }
    },
    handler: async (request, h) => {
      const applyJourney = await cache.get('apply-journey', request.yar.id)
      const journeyItem = request.pre.journeyItem
      const level = request.payload.level
      const selectedAmbitionLevel = applyJourney.paymentRates[level]

      await cache.update('apply-journey', request.yar.id, {
        selectedAmbitionLevel: { name: level, level: selectedAmbitionLevel },
        paymentAmount: selectedAmbitionLevel.paymentAmount
      })

      await cache.update('progress', request.yar.id, {
        progress: { fundingDetails: true, paymentLevel: true }
      })

      return h.redirect(journeyItem.next)
    }
  }
}]
