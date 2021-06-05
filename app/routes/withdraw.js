const joi = require('joi')
const ViewModel = require('./models/withdraw')
const { sendAgreementWithdrawMessage } = require('../messaging')
const cache = require('../cache')

module.exports = [{
  method: 'GET',
  path: '/withdraw',
  options: {
    handler: (request, h) => {
      return h.view('withdraw', new ViewModel())
    }
  }
},
{
  method: 'POST',
  path: '/withdraw',
  options: {
    validate: {
      payload: joi.object({
        withdraw: joi.boolean().required()
      }),
      failAction: async (request, h, error) => {
        return h.view('withdraw', new ViewModel(request.payload.withdraw, error)).code(400).takeover()
      }
    },
    handler: async (request, h) => {
      if (request.payload.withdraw) {
        const agreement = await cache.get('agreement', request.yar.id)
        if (agreement.submitted) {
          await sendAgreementWithdrawMessage(agreement, request.yar.id)
          await cache.update('agreement', request.yar.id, { withdrawn: true })
          return h.redirect('/withdrawn')
        }
      }
      return h.redirect('/application-task-list')
    }
  }
}]
