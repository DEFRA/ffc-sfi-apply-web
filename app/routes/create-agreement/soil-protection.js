const joi = require('joi')
const ViewModel = require('./models/soil-protection')
const cache = require('../../cache')

module.exports = [{
  method: 'GET',
  path: '/create-agreement/soil-protection',
  options: {
    handler: async (request, h) => {
      const agreement = await cache.get('agreement', request.yar.id)
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
      await cache.update('agreement', request.yar.id, request.payload)
      return h.redirect('soil-cover')
    }
  }
}]
