const joi = require('joi')
const ViewModel = require('./models/agreement-length')
const sessionHandler = require('../../session/session-handler')

module.exports = [{
  method: 'GET',
  path: '/create-agreement/agreement-length',
  options: {
    handler: (request, h) => {
      const agreement = sessionHandler.get(request, 'agreement')
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
      sessionHandler.update(request, 'agreement', request.payload)
      return h.redirect('/application-task-list')
    }
  }
}]
