const joi = require('joi')
const ViewModel = require('./models/soil-protection')
const sessionHandler = require('../../session/session-handler')

module.exports = [{
  method: 'GET',
  path: '/create-agreement/soil-protection',
  options: {
    handler: (request, h) => {
      const agreement = sessionHandler.get(request, 'agreement')
      return h.view('create-agreement/soil-protection', new ViewModel(agreement.soilProtection))
    }
  }
},
{
  method: 'POST',
  path: '/create-agreement/soil-protection',
  options: {
    validate: {
      payload: joi.object({
        soilProtection: joi.string().required()
      }),
      failAction: async (request, h, error) => {
        return h.view('create-agreement/soil-protection', new ViewModel(request.payload.soilProtection, error)).code(400).takeover()
      }
    },
    handler: async (request, h) => {
      sessionHandler.update(request, 'agreement', request.payload)
      return h.redirect('soil-cover')
    }
  }
}]
