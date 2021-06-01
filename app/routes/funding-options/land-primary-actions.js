const joi = require('joi')
const ViewModel = require('./models/land-primary-actions')
const cache = require('../../cache')

module.exports = [{
  method: 'GET',
  path: '/funding-options/land-primary-actions',
  options: {
    handler: async (request, h) => {
      const agreement = await cache.get('agreement', request.yar.id)
      return h.view('funding-options/land-primary-actions', new ViewModel(agreement.landInHectares))
    }
  }
},
{
  method: 'POST',
  path: '/funding-options/land-primary-actions',
  options: {
    validate: {
      payload: joi.object({
        landInHectares: joi.string().required()
      }),
      failAction: async (request, h, error) => {
        return h.view('funding-options/land-primary-actions', new ViewModel(request.payload.landInHectares, error)).code(400).takeover()
      }
    },
    handler: async (request, h) => {
      await cache.update('agreement', request.yar.id, request.payload)
      return h.redirect('land-increased-actions')
    }
  }
}]
