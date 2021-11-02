const cache = require('../../cache')
const joi = require('joi')
const ViewModel = require('./models/how-much')
const getMapParcels = require('../../map')
const { getParcelStandards } = require('../../parcels')
const { downloadParcelStandardFile } = require('../../storage')

module.exports = [
  {
    method: 'GET',
    path: '/funding-options/how-much',
    handler: async (request, h) => {
      const { parcelStandards, applyJourney } = await getParcelStandards(request)
      const selectedParcelStandard = await downloadParcelStandardFile(parcelStandards.filename)

      const viewModel = new ViewModel(applyJourney, selectedParcelStandard)
      const mapParcels = await getMapParcels(request)

      viewModel.map = mapParcels

      return h.view('funding-options/how-much', viewModel)
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
          const { parcelStandards, applyJourney } = await getParcelStandards(request)
          const selectedParcelStandard = await downloadParcelStandardFile(parcelStandards.filename)
          const viewModel = new ViewModel(applyJourney, selectedParcelStandard, payload)
          return h.view('funding-options/how-much', viewModel).code(400).takeover()
        }
      },
      handler: async (request, h) => {
        const { payload } = request
        const { parcelStandards, applyJourney } = await getParcelStandards(request)
        const selectedParcelStandard = await downloadParcelStandardFile(parcelStandards.filename)
        const viewModel = new ViewModel(applyJourney, selectedParcelStandard, payload)

        await cache.update('apply-journey', request.yar.id,
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
