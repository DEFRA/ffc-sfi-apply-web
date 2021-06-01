const joi = require('joi')
const ViewModel = require('./models/submit')
const { sendAgreementSubmitMessage } = require('../messaging')
const cache = require('../cache')

module.exports = [{
  method: 'GET',
  path: '/submit',
  options: {
    handler: (request, h) => {
      const agreement = cache.get(request, 'agreement')
      return h.view('submit', new ViewModel(agreement.submit))
    }
  }
},
{
  method: 'POST',
  path: '/submit',
  options: {
    validate: {
      payload: joi.object({
        submit: joi.boolean().required()
      }),
      failAction: async (request, h, error) => {
        return h.view('submit', new ViewModel(request.payload.submit, error)).code(400).takeover()
      }
    },
    handler: async (request, h) => {
      cache.update(request, 'agreement', request.payload)
      if (request.payload.submit) {
        await sendAgreementSubmitMessage({ id: 1 }, request.yar.id)
        return h.redirect('/confirmation')
      }
      return h.redirect('/application-task-list')
    }
  }
}]
