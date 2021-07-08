const joi = require('joi')
const ViewModel = require('./models/select-sbi')

module.exports = [{
  method: 'GET',
  path: '/v2/select-sbi',
  options: {
    handler: async (request, h) => {
      return h.view('v2/select-sbi/select-sbi', new ViewModel())
    }
  }
},
{
  method: 'POST',
  path: '/v2/select-sbi',
  options: {
    validate: {
      payload: joi.object({
        sbi: joi.string().required()
      }),
      failAction: async (request, h, error) => {
        return h.view('v2/select-sbi/select-sbi', new ViewModel(request.payload.sbi, error)).code(400).takeover()
      }
    },
    handler: async (request, h) => {
      return h.redirect('/v2/organisation-details')
    }
  }
}]
