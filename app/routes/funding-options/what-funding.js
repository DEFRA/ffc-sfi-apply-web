const joi = require('joi')
const ViewModel = require('./models/what-funding')

module.exports = [{
  method: 'GET',
  path: '/funding-options/what-funding',
  options: {
    handler: (request, h) => {
      return h.view('funding-options/what-funding', new ViewModel())
    }
  }
},
{
  method: 'POST',
  path: '/funding-options/what-funding',
  options: {
    validate: {
      payload: joi.object({
        funding: joi.array().allow('arableHorticulturalSoils', 'permanentGrasslandSoils', 'welfareAssessmentLivestock').required()
      }),
      failAction: async (request, h, error) => {
        return h.view('funding-options/what-funding', new ViewModel(request.payload.funding, error)).code(400).takeover()
      }
    },
    handler: async (request, h) => {
      console.log(request.payload)
      return h.redirect('actions-arable-all')
    }
  }
}]
