const joi = require('joi')
const ViewModel = require('./models/land-primary-actions')

module.exports = [{
  method: 'GET',
  path: '/funding-options/land-primary-actions',
  options: {
    handler: (request, h) => {
      return h.view('funding-options/land-primary-actions', new ViewModel())
    }
  }
},
{
  method: 'POST',
  path: '/funding-options/land-primary-actions',
  options: {
    validate: {
      payload: joi.object({
        landInHectares: joi.string().required()
      }),
      failAction: async (request, h, error) => {
        return h.view('funding-options/land-primary-actions', new ViewModel(request.payload.landInHectares, error)).code(400).takeover()
      }
    },
    handler: async (request, h) => {
      return h.redirect('land-increased-actions')
    }
  }
}]
