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
        bps: joi.string().required()
      }),
      failAction: async (request, h, error) => {
        return h.view('payment-details/payment-frequency', new ViewModel(request.payload.payment - frequency, error)).code(400).takeover()
      }
    },
    handler: async (request, h) => {
      return h.redirect('application-task-list')
    }
  }
}]
