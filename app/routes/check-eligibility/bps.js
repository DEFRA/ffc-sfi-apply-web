const joi = require('joi')
const ViewModel = require('./models/bps')
const cache = require('../../cache')

module.exports = [{
  method: 'GET',
  path: '/check-eligibility/bps',
  options: {
    handler: async (request, h) => {
      const eligibilityData = await cache.get('eligibility', request.yar.id)
      return h.view('check-eligibility/bps', new ViewModel(eligibilityData.bps))
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
      await cache.update('eligibility', request.yar.id, request.payload)
      return h.redirect('land-types')
    }
  }
}]
