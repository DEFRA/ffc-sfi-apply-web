const joi = require('joi')
const ViewModel = require('./models/soil-quality')
const cache = require('../../cache')

module.exports = [{
  method: 'GET',
  path: '/create-agreement/soil-quality',
  options: {
    handler: async (request, h) => {
      const agreement = await cache.get('agreement', request.yar.id)
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
      await cache.update('agreement', request.yar.id, request.payload)
      await cache.update('progress', request.yar.id, {
        createAgreementOptions: { how: true }
      })
      return h.redirect('/application-task-list')
    }
  }
}]
