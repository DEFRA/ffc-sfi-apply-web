const joi = require('joi')
const ViewModel = require('./models/payment-frequency')

module.exports = [{
  method: 'GET',
  path: '/payment-details/payment-frequency',
  options: {
    handler: (request, h) => {
      return h.view('payment-details/payment-frequency', new ViewModel())
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
    handler: async (request, h) => {
      return h.redirect('bank-details')
    }
  }
}]
