const Joi = require('joi')
const cache = require('../../cache')
const JWT = require('jsonwebtoken')
const config = require('../../config').jwtConfig

module.exports = [{
  method: 'GET',
  path: '/sign-in',
  options: {
    auth: {
      strategy: 'jwt',
      mode: 'try'
    },
    handler: async (request, h) => {
      if (request.auth.isAuthenticated) {
        return h.redirect('/eligible-organisations')
      }
      return h.view('identity/sign-in')
    }
  }
}, {
  method: 'POST',
  path: '/sign-in',
  options: {
    auth: false,
    validate: {
      payload: Joi.object({
        crn: Joi.string().length(10).pattern(/^\d+$/).required(),
        callerId: Joi.string().length(7).pattern(/^\d+$/).required(),
        password: Joi.string().required()
      }),
      failAction: async (request, h, error) => {
        return h.view('identity/sign-in', { ...request.payload, errors: error }).code(400).takeover()
      }
    },
    handler: async (request, h) => {
      const { crn, callerId } = request.payload
      const { callerId: currentCallerId } = await cache.get(request)

      // if user changes login during same session then remove all data
      if (currentCallerId !== callerId) {
        await cache.clear(request)
      }
      await cache.update(request, { crn, callerId })
      const token = JWT.sign({ callerId }, config.secret, { expiresIn: config.ttl })
      return h.redirect('/eligible-organisations')
        .header('Authorization', token)
        .state('ffc_sfi_identity', token, config.cookieOptionsIdentity)
    }
  }
}]
