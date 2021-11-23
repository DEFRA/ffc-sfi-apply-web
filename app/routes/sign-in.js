const joi = require('joi')
const cache = require('../cache')
const JWT = require('jsonwebtoken')
const config = require('../config')

module.exports = [{
  method: 'GET',
  path: '/sign-in',
  options: {
    auth: false,
    handler: async (request, h) => {
      const agreement = await cache.get('agreement', request.yar.id)
      return h.view('sign-in', { crn: agreement?.application?.crn, callerId: agreement?.application?.callerId })
    }
  }
}, {
  method: 'POST',
  path: '/sign-in',
  options: {
    auth: false,
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
      await cache.update('agreement', request.yar.id, { application: { crn, callerId } })
      const token = JWT.sign({ callerId }, config.jwtConfig.secret, { expiresIn: 3600 * 1000 })
      return h.redirect('/start-application')
        .header('Authorization', token)
        .state('ffc_sfi_identity', token, config.cookieOptionsIdentity)
    }
  }
}]
