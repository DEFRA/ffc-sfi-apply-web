const joi = require('joi')
const ViewModel = require('./models/bps')
const sessionHandler = require('../../session/session-handler')

module.exports = [{
  method: 'GET',
  path: '/check-eligibility/bps',
  options: {
    handler: (request, h) => {
      const agreement = sessionHandler.get(request, 'agreement')
      return h.view('check-eligibility/bps', new ViewModel(agreement.bps))
    }
  }
},
{
  method: 'POST',
  path: '/check-eligibility/bps',
  options: {
    validate: {
      payload: joi.object({
        bps: joi.boolean().required()
      }),
      failAction: async (request, h, error) => {
        return h.view('check-eligibility/bps', new ViewModel(request.payload.bps, error)).code(400).takeover()
      }
    },
    handler: async (request, h) => {
      sessionHandler.update(request, 'agreement', request.payload)
      return h.redirect('land-types')
    }
  }
}]
