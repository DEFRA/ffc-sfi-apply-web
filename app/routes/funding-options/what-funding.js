const joi = require('joi')
const ViewModel = require('./models/what-funding')
const sessionHandler = require('../../session/session-handler')

module.exports = [{
  method: 'GET',
  path: '/funding-options/what-funding',
  options: {
    handler: (request, h) => {
      const agreement = sessionHandler.get(request, 'agreement')
      return h.view('funding-options/what-funding', new ViewModel(agreement.funding))
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
      sessionHandler.update(request, 'agreement', request.payload)
      return h.redirect('actions-arable-all')
    }
  }
}]
