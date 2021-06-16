const joi = require('joi')
const ViewModel = require('./models/soil-assessment')
const cache = require('../../cache')

module.exports = [{
  method: 'GET',
  path: '/create-agreement/soil-assessment',
  options: {
    handler: async (request, h) => {
      await cache.update('agreement', request.yar.id, {
        agreementLength: 'rolling'
      })
      const agreement = await cache.get('agreement', request.yar.id)
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
      await cache.update('agreement', request.yar.id, request.payload)
      return h.redirect('soil-protection')
    }
  }
}]
