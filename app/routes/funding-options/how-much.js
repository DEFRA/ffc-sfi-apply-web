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
    options: {
      handler: async (request, h) => {
        const { parcelStandards, application } = await getParcelStandards(request)
        if (!parcelStandards) {
          return h.view('no-response')
        }
        const selectedParcelStandard = await downloadParcelStandardFile(parcelStandards.filename)
        const viewModel = new ViewModel(application, selectedParcelStandard)
        const mapParcels = await getMapParcels(request, selectedParcelStandard.spatial)
        viewModel.map = mapParcels
        return h.view('funding-options/how-much', viewModel)
      }
    }
  },
  {
    method: 'POST',
    path: '/funding-options/how-much',
    options: {
      validate: {
        payload: joi.object().keys({
          parcels: joi.array().items(joi.string()).single().required()
        }).unknown(true),
        failAction: async (request, h, error) => {
          const { payload } = request
          const { parcelStandards, application } = await getParcelStandards(request)
          const selectedParcelStandard = await downloadParcelStandardFile(parcelStandards.filename)
          const viewModel = new ViewModel(application, selectedParcelStandard, payload)
          const mapParcels = await getMapParcels(request)
          viewModel.map = mapParcels
          return h.view('funding-options/how-much', viewModel).code(400).takeover()
        }
      },
      handler: async (request, h) => {
        const { payload } = request
        const { parcelStandards, application } = await getParcelStandards(request)
        const selectedParcelStandard = await downloadParcelStandardFile(parcelStandards.filename)
        const viewModel = new ViewModel(application, selectedParcelStandard, payload)

        await cache.update(request, {
          application: {
            selectedParcels: viewModel.model.landInHectares,
            parcelArea: viewModel.model.parcelArea,
            selectedLandCovers: selectedParcelStandard.landCovers.filter(x => payload.parcels.includes(x.parcelId))
          }
        })

        if (viewModel.model.error || viewModel.model.invalidValues) {
          return h.view('funding-options/how-much', viewModel).code(400).takeover()
        }

        return h.redirect('/funding-options/what-payment-level')
      }
    }
  }
]
