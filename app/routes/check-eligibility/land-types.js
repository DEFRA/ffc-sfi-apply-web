const joi = require('joi')
const ViewModel = require('./models/land-types')
const sessionHandler = require('../../session/session-handler')

module.exports = [{
  method: 'GET',
  path: '/check-eligibility/land-types',
  options: {
    handler: (request, h) => {
      const agreement = sessionHandler.get(request, 'agreement')
      console.log(agreement)
      return h.view('check-eligibility/land-types', new ViewModel(agreement.landTypes))
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
      sessionHandler.update(request, 'agreement', request.payload)
      return h.redirect('farming-pilot')
    }
  }
}]
