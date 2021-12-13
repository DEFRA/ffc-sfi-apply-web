const Joi = require('joi')
const { v4: uuidv4 } = require('uuid')

module.exports = [{
  method: 'GET',
  path: '/sign-in',
  options: {
    auth: {
      mode: 'try'
    },
    plugins: {
      'hapi-auth-cookie': {
        redirectTo: false
      }
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
    auth: {
      mode: 'try'
    },
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
      const { callerId, crn } = request.payload
      // TODO: add Defra Identity authentication before continuing to set cookie
      const sid = uuidv4()
      request.cookieAuth.set({ sid })
      await request.server.app.cache.set(sid, { callerId, crn }, 0)
      return h.redirect('/eligible-organisations')
    }
  }
}]
