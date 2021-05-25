const joi = require('joi')
const ViewModel = require('./models/soil-quality')

module.exports = [{
  method: 'GET',
  path: '/create-agreement/soil-quality',
  options: {
    handler: (request, h) => {
      return h.view('create-agreement/soil-quality', new ViewModel())
    }
  }
},
{
  method: 'POST',
  path: '/create-agreement/soil-quality',
  options: {
    validate: {
      payload: joi.object({
        soilQuality: joi.string().required()
      }),
      failAction: async (request, h, error) => {
        return h.view('create-agreement/soil-quality', new ViewModel(request.payload.soilQuality, error)).code(400).takeover()
      }
    },
    handler: async (request, h) => {
      return h.redirect('/application-task-list')
    }
  }
}]
