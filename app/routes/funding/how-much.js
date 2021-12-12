const cache = require('../../cache')
const Joi = require('joi')
const ViewModel = require('./models/how-much')
const getMapParcels = require('../../land/land')
const getParcelStandards = require('../../land/parcel-standards')
const { downloadParcelStandardFile } = require('../../storage')

module.exports = [{
  method: 'GET',
  path: '/how-much',
  options: {
    handler: async (request, h) => {
      const { agreement } = await cache.get(request)
      // TODO: When multiple funding added will need to specify which one here
      const standardCode = agreement.funding[0]
      const parcelStandards = await getParcelStandards(request, standardCode)
      if (!parcelStandards) {
        return h.view('no-response')
      }
      const selectedParcelStandard = await downloadParcelStandardFile(parcelStandards.filename)
      const selectedLandCovers = agreement.action[standardCode].landCovers
      const viewModel = new ViewModel(selectedLandCovers, selectedParcelStandard)
      const mapParcels = await getMapParcels(request, selectedParcelStandard.spatial)
      viewModel.map = mapParcels
      return h.view('funding/how-much', viewModel)
    }
  }
},
{
  method: 'POST',
  path: '/how-much',
  options: {
    validate: {
      payload: Joi.object().keys({
        parcels: Joi.array().items(Joi.string()).single().required()
      }).unknown(true),
      failAction: async (request, h, error) => {
        const { agreement } = await cache.get(request)
        // TODO: When multiple funding added will need to specify which one here
        const standardCode = agreement.funding[0]
        const parcelStandards = await getParcelStandards(request, standardCode)
        if (!parcelStandards) {
          return h.view('no-response')
        }
        const selectedParcelStandard = await downloadParcelStandardFile(parcelStandards.filename)
        const selectedLandCovers = agreement.action.landCovers
        const viewModel = new ViewModel(selectedLandCovers, selectedParcelStandard, request.payload)
        const mapParcels = await getMapParcels(request, selectedParcelStandard.spatial)
        viewModel.map = mapParcels
        return h.view('funding/how-much', viewModel).code(400).takeover()
      }
    },
    handler: async (request, h) => {
      const { agreement } = await cache.get(request)
      // TODO: When multiple funding added will need to specify which one here
      const standardCode = agreement.funding[0]
      const parcelStandards = await getParcelStandards(request, standardCode)
      if (!parcelStandards) {
        return h.view('no-response')
      }
      const selectedParcelStandard = await downloadParcelStandardFile(parcelStandards.filename)
      const selectedLandCovers = agreement.action.landCovers
      const viewModel = new ViewModel(selectedLandCovers, selectedParcelStandard, request.payload)

      await cache.update(request, { action: { [standardCode]: { landCovers: selectedParcelStandard.landCovers.filter(x => request.payload.parcels.includes(x.parcelId)) } } })

      if (viewModel.model.error || viewModel.model.invalidValues) {
        return h.view('funding/how-much', viewModel).code(400).takeover()
      }

      return h.redirect('/task-list')
    }
  }
}]
