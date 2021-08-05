const joi = require('joi')
const cache = require('../../../cache')

module.exports = [{
  method: 'GET',
  path: '/v2/search-crn',
  options: {
    handler: async (request, h) => {
      const applyJourney = await cache.get('apply-journey', request.yar.id)
      return h.view('v2/search-crn/search-crn', { crn: applyJourney.crn, callerId: applyJourney.callerId })
    }
  }
}, {
  method: 'POST',
  path: '/v2/search-crn',
  options: {
    validate: {
      payload: joi.object({
        crn: joi.string().length(10).pattern(/^[0-9]+$/).required(),
        callerId: joi.string().length(7).pattern(/^[0-9]+$/).required()
      }),
      failAction: async (request, h, error) => {
        return h.view('v2/search-crn/search-crn', { crn: request.payload.crn, callerId: request.payload.callerId, errors: error }).code(400).takeover()
      }
    },
    handler: async (request, h) => {
      const crn = request.payload.crn
      const callerId = request.payload.callerId
      await cache.update('apply-journey', request.yar.id, { crn, callerId })
      return h.redirect('/v2/select-sbi', { crn, callerId })
    }
  }
}]
