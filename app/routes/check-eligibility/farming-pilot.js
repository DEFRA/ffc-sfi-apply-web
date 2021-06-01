const joi = require('joi')
const ViewModel = require('./models/farming-pilot')
const sessionHandler = require('../../session/session-handler')

module.exports = [{
  method: 'GET',
  path: '/check-eligibility/farming-pilot',
  options: {
    handler: (request, h) => {
      const agreement = sessionHandler.get(request, 'agreement')
      return h.view('check-eligibility/farming-pilot', new ViewModel(agreement.farmingPilot))
    }
  }
},
{
  method: 'POST',
  path: '/check-eligibility/farming-pilot',
  options: {
    validate: {
      payload: joi.object({
        farmingPilot: joi.boolean().required()
      }),
      failAction: async (request, h, error) => {
        return h.view('check-eligibility/farming-pilot', new ViewModel(request.payload.farmingPilot, error)).code(400).takeover()
      }
    },
    handler: async (request, h) => {
      sessionHandler.update(request, 'agreement', request.payload)
      return h.redirect('eligible')
    }
  }
}]
