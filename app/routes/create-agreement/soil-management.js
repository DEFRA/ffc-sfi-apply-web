const joi = require('joi')
const ViewModel = require('./models/soil-management')
const cache = require('../../cache')

module.exports = [{
  method: 'GET',
  path: '/create-agreement/soil-management',
  options: {
    handler: (request, h) => {
      const agreement = cache.get(request, 'agreement')
      return h.view('create-agreement/soil-management', new ViewModel(agreement.soilManagement))
    }
  }
},
{
  method: 'POST',
  path: '/create-agreement/soil-management',
  options: {
    validate: {
      payload: joi.object({
        soilManagement: joi.string().required()
      }),
      failAction: async (request, h, error) => {
        return h.view('create-agreement/soil-management', new ViewModel(request.payload.soilManagement, error)).code(400).takeover()
      }
    },
    handler: async (request, h) => {
      cache.update(request, 'agreement', request.payload)
      return h.redirect('tillage')
    }
  }
}]
