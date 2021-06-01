const joi = require('joi')
const ViewModel = require('./models/soil-cover')
const cache = require('../../cache')

module.exports = [{
  method: 'GET',
  path: '/create-agreement/soil-cover',
  options: {
    handler: (request, h) => {
      const agreement = cache.get(request, 'agreement')
      return h.view('create-agreement/soil-cover', new ViewModel(agreement.soilCover))
    }
  }
},
{
  method: 'POST',
  path: '/create-agreement/soil-cover',
  options: {
    validate: {
      payload: joi.object({
        soilCover: joi.string().required()
      }),
      failAction: async (request, h, error) => {
        return h.view('create-agreement/soil-cover', new ViewModel(request.payload.soilCover, error)).code(400).takeover()
      }
    },
    handler: async (request, h) => {
      cache.update(request, 'agreement', request.payload)
      return h.redirect('soil-management')
    }
  }
}]
