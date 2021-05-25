const joi = require('joi')
const ViewModel = require('./models/tillage')

module.exports = [{
  method: 'GET',
  path: '/create-agreement/tillage',
  options: {
    handler: (request, h) => {
      return h.view('create-agreement/tillage', new ViewModel())
    }
  }
},
{
  method: 'POST',
  path: '/create-agreement/tillage',
  options: {
    validate: {
      payload: joi.object({
        tillage: joi.string().required()
      }),
      failAction: async (request, h, error) => {
        return h.view('create-agreement/tillage', new ViewModel(request.payload.tillage, error)).code(400).takeover()
      }
    },
    handler: async (request, h) => {
      return h.redirect('soil-compaction')
    }
  }
}]
