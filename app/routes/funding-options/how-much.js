const cache = require('../../cache')
const joi = require('joi')
const ViewModel = require('./models/how-much')
const handler = require('../handler')

module.exports = [
  {
    method: 'GET',
    path: '/funding-options/how-much',
    options: {
      pre: [
        handler.preHandler('how-much')
      ],
      handler: async (request, h) => {
        const applyJourney = await cache.get('apply-journey', request.yar.id)
        const journeyItem = request.pre.journeyItem
        return h.view(journeyItem.view, new ViewModel(applyJourney.selectedStandard, applyJourney.selectedParcels, null, journeyItem))
      }
    }
  },
  {
    method: 'POST',
    path: '/funding-options/how-much',
    options: {
      pre: [
        handler.preHandler('how-much')
      ],
      validate: {
        payload: joi.object().keys({
          parcels: joi.array().items(joi.string()).single()
        }).unknown(true),
        failAction: async (request, h, error) => {
          const { payload } = request
          const journeyItem = request.pre.journeyItem
          const applyJourney = await cache.get('apply-journey', request.yar.id)
          const viewModel = new ViewModel(payload, applyJourney.selectedStandard, applyJourney.selectedParcels, journeyItem)
          return h.view(journeyItem.view, viewModel).code(400).takeover()
        }
      },
      handler: async (request, h) => {
        const { payload } = request
        const journeyItem = request.pre.journeyItem
        const applyJourney = await cache.get('apply-journey', request.yar.id)
        const viewModel = new ViewModel(applyJourney.selectedStandard, applyJourney.selectedParcels, payload, journeyItem)

        await cache.update('apply-journey', request.yar.id,
          {
            selectedParcels: viewModel.model.landInHectares,
            parcelArea: Number(viewModel.model.parcelArea).toFixed(2)
          })

        if (viewModel.model.error || viewModel.model.invalidValues) {
          return h.view('funding-options/how-much', viewModel).code(400).takeover()
        }

        return h.redirect(journeyItem.next)
      }
    }
  }
]
