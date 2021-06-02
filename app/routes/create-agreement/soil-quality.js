const joi = require('joi')
const ViewModel = require('./models/soil-quality')
const cache = require('../../cache')
const schema = require('./schemas/eligibility')

module.exports = [{
  method: 'GET',
  path: '/create-agreement/soil-quality',
  options: {
    handler: async (request, h) => {
      const agreement = await cache.get('agreement', request.yar.id)
      return h.view('create-agreement/soil-quality', new ViewModel(agreement.soilQuality))
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
      const agreement = await cache.update('agreement', request.yar.id, request.payload)
      // ensure that all soil data has been supplied
      const result = schema.validate(agreement, { allowUnknown: true })
      if (result.error) {
        console.info(`Soil data is incomplete for ${request.yar.id}, restarting journey`)
        return h.redirect('soil-assessment')
      }
      await cache.update('progress', request.yar.id, {
        createAgreement: { how: true }
      })
      return h.redirect('/application-task-list')
    }
  }
}]
