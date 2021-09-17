const joi = require('joi')
const cache = require('../cache')
const handler = require('./handler')

module.exports = [{
  method: 'GET',
  path: '/sign-in',
  options: {
    pre: [
      handler.preHandler('/sign-in')
    ],
    handler: async (request, h) => {
      const journeyItem = request.pre.journeyItem
      const applyJourney = await cache.get('apply-journey', request.yar.id)
      return h.view(journeyItem.key, {
        route: journeyItem.route,
        back: journeyItem.back,
        crn: applyJourney.crn,
        callerId: applyJourney.callerId
      })
    }
  }
}, {
  method: 'POST',
  path: '/sign-in',
  options: {
    pre: [
      handler.preHandler('/sign-in')
    ],
    validate: {
      payload: joi.object({
        crn: joi.string().length(10).pattern(/^[0-9]+$/).required(),
        callerId: joi.string().length(7).pattern(/^[0-9]+$/).required(),
        password: joi.string().required()
      }),
      failAction: async (request, h, error) => {
        const journeyItem = request.pre.journeyItem
        return h.view('sign-in', {
          route: journeyItem.route,
          back: journeyItem.back,
          crn: request.payload.crn,
          callerId: request.payload.callerId,
          errors: error
        }).code(400).takeover()
      }
    },
    handler: async (request, h) => {
      const crn = request.payload.crn
      const callerId = request.payload.callerId
      await cache.update('apply-journey', request.yar.id, { crn, callerId })
      const journeyItem = request.pre.journeyItem
      return h.redirect(journeyItem.next)
    }
  }
}]
