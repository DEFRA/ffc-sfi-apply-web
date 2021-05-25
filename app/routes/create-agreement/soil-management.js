const joi = require('joi')
const ViewModel = require('./models/soil-management')

module.exports = [{
  method: 'GET',
  path: '/create-agreement/soil-management',
  options: {
    handler: (request, h) => {
      return h.view('create-agreement/soil-management', new ViewModel())
    }
  }
},
{
  method: 'POST',
  path: '/create-agreement/soil-management',
  options: {
    validate: {
      payload: joi.object({
        soilManagement: joi.string().required()
      }),
      failAction: async (request, h, error) => {
        return h.view('create-agreement/soil-management', new ViewModel(request.payload.soilManagement, error)).code(400).takeover()
      }
    },
    handler: async (request, h) => {
      return h.redirect('tillage')
    }
  }
}]
