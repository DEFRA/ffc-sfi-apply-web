const joi = require('joi')
const ViewModel = require('./models/agreement-length')

module.exports = [{
  method: 'GET',
  path: '/create-agreement/agreement-length',
  options: {
    handler: (request, h) => {
      return h.view('create-agreement/agreement-length', new ViewModel())
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
      return h.redirect('review')
    }
  }
}]
