const joi = require('joi')
const ViewModel = require('./models/soil-quality')
const cache = require('../../cache')

module.exports = [{
  method: 'GET',
  path: '/create-agreement/soil-quality',
  options: {
    handler: (request, h) => {
      const agreement = cache.get(request, 'agreement')
      return h.view('create-agreement/soil-quality', new ViewModel(agreement.soilQuality))
    }
  }
},
{
  method: 'POST',
  path: '/create-agreement/soil-quality',
  options: {
    validate: {
      payload: joi.object({
        soilQuality: joi.string().required()
      }),
      failAction: async (request, h, error) => {
        return h.view('create-agreement/soil-quality', new ViewModel(request.payload.soilQuality, error)).code(400).takeover()
      }
    },
    handler: async (request, h) => {
      cache.update(request, 'agreement', request.payload)
      return h.redirect('/application-task-list')
    }
  }
}]
