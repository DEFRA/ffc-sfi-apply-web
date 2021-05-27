const joi = require('joi')
const ViewModel = require('./models/submit')
const { sendAgreementSubmitMessage } = require('../messaging')

module.exports = [{
  method: 'GET',
  path: '/submit',
  options: {
    handler: (request, h) => {
      return h.view('submit', new ViewModel())
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
      if (request.payload.submit) {
        await sendAgreementSubmitMessage({ id: 1 })
        return h.redirect('/confirmation')
      }
      return h.redirect('/application-task-list')
    }
  }
}]
