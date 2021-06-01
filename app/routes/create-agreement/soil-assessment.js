const joi = require('joi')
const ViewModel = require('./models/soil-assessment')
const cache = require('../../cache')

module.exports = [{
  method: 'GET',
  path: '/create-agreement/soil-assessment',
  options: {
    handler: (request, h) => {
      const agreement = cache.get(request, 'agreement')
      return h.view('create-agreement/soil-assessment', new ViewModel(agreement.soilAssessment))
    }
  }
},
{
  method: 'POST',
  path: '/create-agreement/soil-assessment',
  options: {
    validate: {
      payload: joi.object({
        soilAssessment: joi.string().required()
      }),
      failAction: async (request, h, error) => {
        return h.view('create-agreement/soil-assessment', new ViewModel(request.payload.soilAssessment, error)).code(400).takeover()
      }
    },
    handler: async (request, h) => {
      cache.update(request, 'agreement', request.payload)
      return h.redirect('soil-protection')
    }
  }
}]
