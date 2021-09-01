const joi = require('joi')
const cache = require('../../../../cache')
const getAllStandards = require('./models/util-select-standard')
const ViewModel = require('./models/select-standard')

module.exports = [{
  method: 'GET',
  path: '/v2/standards',
  options: {
    handler: async (request, h) => {
      const { applyJourney, standards } = await getAllStandards(request)
      if (standards) {
        return h.view('v2/standards/select-standard', new ViewModel(standards, applyJourney.selectedStandard))
      }
      return h.view('no-response')
    }
  }
},
{
  method: 'POST',
  path: '/v2/standards',
  options: {
    validate: {
      payload: joi.object({
        standard: joi.string().required()
      }),
      failAction: async (request, h, error) => {
        const { applyJourney, standards } = await getAllStandards(request, error)
        if (standards) {
          return h.view('v2/standards/select-standard', new ViewModel(standards, applyJourney.selectedStandard, error)).code(400).takeover()
        }
        return h.view('no-response')
      }
    },
    handler: async (request, h) => {
      const standard = request.payload.standard
      const applyJourney = await cache.get('apply-journey', request.yar.id)

      const selectedStandard = applyJourney.standards.find(x => x.code === standard)
      await cache.update('apply-journey', request.yar.id, { selectedStandard: selectedStandard })
      return h.redirect('/v2/add-standard-parcels')
    }
  }
}]
