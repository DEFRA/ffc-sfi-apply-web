const joi = require('joi')
const ViewModel = require('./models/land-types')

module.exports = [{
  method: 'GET',
  path: '/check-eligibility/land-types',
  options: {
    handler: (request, h) => {
      return h.view('check-eligibility/land-types', new ViewModel())
    }
  }
},
{
  method: 'POST',
  path: '/check-eligibility/land-types',
  options: {
    validate: {
      payload: joi.object({
        landTypes: joi.array().allow('arableHorticultural', 'permanentGrassland', 'livestock', 'organic', 'trees', 'uplands', 'woodland').required()
      }),
      failAction: async (request, h, error) => {
        return h.view('check-eligibility/land-types', new ViewModel(request.payload.landTypes, error)).code(400).takeover()
      }
    },
    handler: async (request, h) => {
      return h.redirect('farming-pilot')
    }
  }
}]
