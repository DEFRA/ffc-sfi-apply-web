const joi = require('joi')
const ViewModel = require('./models/soil-cover')

module.exports = [{
  method: 'GET',
  path: '/create-agreement/soil-cover',
  options: {
    handler: (request, h) => {
      return h.view('create-agreement/soil-cover', new ViewModel())
    }
  }
},
{
  method: 'POST',
  path: '/create-agreement/soil-cover',
  options: {
    validate: {
      payload: joi.object({
        soilCover: joi.string().required()
      }),
      failAction: async (request, h, error) => {
        return h.view('create-agreement/soil-cover', new ViewModel(request.payload.soilCover, error)).code(400).takeover()
      }
    },
    handler: async (request, h) => {
      return h.redirect('soil-management')
    }
  }
}]
