const joi = require('joi')
const ViewModel = require('./models/payment-frequency')
const cache = require('../../cache')

module.exports = [{
  method: 'GET',
  path: '/payment-details/payment-frequency',
  options: {
    handler: async (request, h) => {
      const agreement = await cache.get('agreement', request.yar.id)
      return h.view('payment-details/payment-frequency', new ViewModel(agreement.paymentFrequency))
    }
  }
},
{
  method: 'POST',
  path: '/payment-details/payment-frequency',
  options: {
    validate: {
      payload: joi.object({
        paymentFrequency: joi.string().required()
      }),
      failAction: async (request, h, error) => {
        return h.view('payment-details/payment-frequency', new ViewModel(request.payload.paymentFrequency, error)).code(400).takeover()
      }
    },
    handler: async (request, h) => {
      await cache.update('agreement', request.yar.id, request.payload)
      await cache.update('progress', request.yar.id, {
        paymentOptions: { paymentFrequency: true }
      })
      return h.redirect('bank-details')
    }
  }
}]
