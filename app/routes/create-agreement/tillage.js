const joi = require('joi')
const ViewModel = require('./models/tillage')
const cache = require('../../cache')

module.exports = [{
  method: 'GET',
  path: '/create-agreement/tillage',
  options: {
    handler: (request, h) => {
      const agreement = cache.get(request, 'agreement')
      return h.view('create-agreement/tillage', new ViewModel(agreement.tillage))
    }
  }
},
{
  method: 'POST',
  path: '/create-agreement/tillage',
  options: {
    validate: {
      payload: joi.object({
        tillage: joi.string().required()
      }),
      failAction: async (request, h, error) => {
        return h.view('create-agreement/tillage', new ViewModel(request.payload.tillage, error)).code(400).takeover()
      }
    },
    handler: async (request, h) => {
      cache.update(request, 'agreement', request.payload)
      return h.redirect('soil-compaction')
    }
  }
}]
