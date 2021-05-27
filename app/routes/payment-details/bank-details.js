const joi = require('joi')
const ViewModel = require('./models/bank-details')

module.exports = [{
  method: 'GET',
  path: '/payment-details/bank-details',
  options: {
    handler: (request, h) => {
      return h.view('payment-details/bank-details', new ViewModel())
    }
  }
},
{
  method: 'POST',
  path: '/payment-details/bank-details',
  options: {
    validate: {
      payload: joi.object({
        bankDetails: joi.string().required()
      }),
      failAction: async (request, h, error) => {
        return h.view('payment-details/bank-details').code(400).takeover()
      }
    },
    handler: async (request, h) => {
      return h.redirect('/application-task-list')
    }
  }
}]
