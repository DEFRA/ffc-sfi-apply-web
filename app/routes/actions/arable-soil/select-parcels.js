const { save } = require('../../../agreement')
const cache = require('../../../cache')
const Joi = require('joi')
const ViewModel = require('./models/select-parcels')
const getMapParcels = require('../../../land/land')
const getParcelStandards = require('../../../land/parcel-standards')
const { downloadParcelStandardFile } = require('../../../storage')
const STANDARD_CODE = 'sfi-arable-soil'

module.exports = [{
  method: 'GET',
  path: '/arable/select-arable-parcels',
  options: {
    handler: async (request, h) => {
      const { agreement } = await cache.get(request)
      const parcelStandards = await getParcelStandards(request, STANDARD_CODE)
      if (!parcelStandards) {
        return h.view('no-response')
      }
      const selectedParcelStandard = await downloadParcelStandardFile(parcelStandards.filename)
      const selectedLandCovers = agreement.action[STANDARD_CODE].landCovers
      const viewModel = new ViewModel(selectedLandCovers, selectedParcelStandard)
      const mapParcels = await getMapParcels(request, selectedParcelStandard.spatial)
      viewModel.map = mapParcels
      return h.view('actions/arable-soil/select-parcels', viewModel)
    }
  }
},
{
  method: 'POST',
  path: '/arable/select-arable-parcels',
  options: {
    validate: {
      payload: Joi.object().keys({
        parcels: Joi.array().items(Joi.string()).single().required()
      }).unknown(true),
      failAction: async (request, h, error) => {
        const { agreement } = await cache.get(request)
        const parcelStandards = await getParcelStandards(request, STANDARD_CODE)
        if (!parcelStandards) {
          return h.view('no-response')
        }
        const selectedParcelStandard = await downloadParcelStandardFile(parcelStandards.filename)
        const selectedLandCovers = agreement.action.landCovers
        const viewModel = new ViewModel(selectedLandCovers, selectedParcelStandard, request.payload)
        const mapParcels = await getMapParcels(request, selectedParcelStandard.spatial)
        viewModel.map = mapParcels
        return h.view('actions/arable-soil/select-parcels', viewModel).code(400).takeover()
      }
    },
    handler: async (request, h) => {
      const { agreement } = await cache.get(request)
      const parcelStandards = await getParcelStandards(request, STANDARD_CODE)
      if (!parcelStandards) {
        return h.view('no-response')
      }
      const selectedParcelStandard = await downloadParcelStandardFile(parcelStandards.filename)
      const selectedLandCovers = agreement.action.landCovers
      const viewModel = new ViewModel(selectedLandCovers, selectedParcelStandard, request.payload)

      await cache.update(request, { agreement: { action: { [STANDARD_CODE]: { landCovers: selectedParcelStandard.landCovers.filter(x => request.payload.parcels.includes(x.parcelId)) } } } })

      if (viewModel.model.error || viewModel.model.invalidValues) {
        return h.view('actions/arable-soil/select-parcels', viewModel).code(400).takeover()
      }
      await save(request)
      return h.redirect('/task-list')
    }
  }
}]
