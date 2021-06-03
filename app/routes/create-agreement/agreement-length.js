const joi = require('joi')
const ViewModel = require('./models/agreement-length')
const cache = require('../../cache')

module.exports = [{
  method: 'GET',
  path: '/create-agreement/agreement-length',
  options: {
    handler: async (request, h) => {
      const agreement = await cache.get('agreement', request.yar.id)
      return h.view('create-agreement/agreement-length', new ViewModel(agreement.agreementLength))
    }
  }
},
{
  method: 'POST',
  path: '/create-agreement/agreement-length',
  options: {
    validate: {
      payload: joi.object({
        agreementLength: joi.string().required()
      }),
      failAction: async (request, h, error) => {
        return h.view('create-agreement/agreement-length', new ViewModel(request.payload.agreementLength, error)).code(400).takeover()
      }
    },
    handler: async (request, h) => {
      await cache.update('agreement', request.yar.id, request.payload)
      await cache.update('progress', request.yar.id, {
        createAgreementOptions: { agreementLength: true }
      })
      return h.redirect('review')
    }
  }
}]
