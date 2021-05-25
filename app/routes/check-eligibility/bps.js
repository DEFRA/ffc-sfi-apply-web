const joi = require('joi')
const ViewModel = require('./models/bps')

module.exports = [{
  method: 'GET',
  path: '/check-eligibility/bps',
  options: {
    handler: (request, h) => {
      return h.view('check-eligibility/bps', new ViewModel())
    }
  }
},
{
  method: 'POST',
  path: '/check-eligibility/bps',
  options: {
    validate: {
      payload: joi.object({
        bps: joi.boolean().required()
      }),
      failAction: async (request, h, error) => {
        return h.view('check-eligibility/bps', new ViewModel(request.payload.bps, error)).code(400).takeover()
      }
    },
    handler: async (request, h) => {
      return h.redirect('land-types')
    }
  }
}]
