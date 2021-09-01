const joi = require('joi')
const cache = require('../cache')

module.exports = [{
  method: 'GET',
  path: '/sign-in',
  options: {
    handler: async (request, h) => {
      const applyJourney = await cache.get('apply-journey', request.yar.id)
      return h.view('sign-in', { crn: applyJourney.crn, callerId: applyJourney.callerId })
    }
  }
}, {
  method: 'POST',
  path: '/sign-in',
  options: {
    validate: {
      payload: joi.object({
        crn: joi.string().length(10).pattern(/^[0-9]+$/).required(),
        callerId: joi.string().length(7).pattern(/^[0-9]+$/).required(),
        password: joi.string().required()
      }),
      failAction: async (request, h, error) => {
        return h.view('sign-in', { crn: request.payload.crn, callerId: request.payload.callerId, errors: error }).code(400).takeover()
      }
    },
    handler: async (request, h) => {
      const crn = request.payload.crn
      const callerId = request.payload.callerId
      await cache.update('apply-journey', request.yar.id, { crn, callerId })
      return h.redirect('/which-business', { crn, callerId })
    }
  }
}]
