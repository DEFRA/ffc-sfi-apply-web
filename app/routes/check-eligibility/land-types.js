const joi = require('joi')
const ViewModel = require('./models/land-types')
const cache = require('../../cache')

module.exports = [{
  method: 'GET',
  path: '/check-eligibility/land-types',
  options: {
    handler: async (request, h) => {
      const eligibilityData = await cache.get('eligibility', request.yar.id)
      return h.view('check-eligibility/land-types', new ViewModel(eligibilityData.landTypes))
    }
  }
},
{
  method: 'POST',
  path: '/check-eligibility/land-types',
  options: {
    validate: {
      payload: joi.object({
        landTypes: joi.array().allow('arableHorticultural', 'permanentGrassland', 'livestock', 'organic', 'trees', 'uplands', 'woodland').required()
      }),
      failAction: async (request, h, error) => {
        return h.view('check-eligibility/land-types', new ViewModel(request.payload.landTypes, error)).code(400).takeover()
      }
    },
    handler: async (request, h) => {
      await cache.update('eligibility', request.yar.id, request.payload)
      return h.redirect('farming-pilot')
    }
  }
}]
