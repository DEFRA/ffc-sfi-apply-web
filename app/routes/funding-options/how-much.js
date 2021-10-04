const cache = require('../../cache')
const joi = require('joi')
const ViewModel = require('./models/how-much')

module.exports = [
  {
    method: 'GET',
    path: '/funding-options/how-much',
    handler: async (request, h) => {
      const agreement = await cache.get('agreement', request.yar.id)
      return h.view('funding-options/how-much', new ViewModel(agreement.selectedStandard, agreement.selectedParcels))
    }
  },
  {
    method: 'POST',
    path: '/funding-options/how-much',
    options: {
      validate: {
        payload: joi.object().keys({
          parcels: joi.array().items(joi.string()).single()
        }).unknown(true),
        failAction: async (request, h, error) => {
          const { payload } = request
          const agreement = await cache.get('agreement', request.yar.id)
          const viewModel = new ViewModel(payload, agreement.selectedStandard, agreement.selectedParcels)
          return h.view('funding-options/how-much', viewModel).code(400).takeover()
        }
      },
      handler: async (request, h) => {
        const { payload } = request
        const agreement = await cache.get('agreement', request.yar.id)
        const viewModel = new ViewModel(agreement.selectedStandard, agreement.selectedParcels, payload)

        await cache.update('agreement', request.yar.id,
          {
            selectedParcels: viewModel.model.landInHectares,
            parcelArea: Number(viewModel.model.parcelArea).toFixed(2)
          })

        if (viewModel.model.error || viewModel.model.invalidValues) {
          return h.view('funding-options/how-much', viewModel).code(400).takeover()
        }

        return h.redirect('/funding-options/what-payment-level')
      }
    }
  }
]
