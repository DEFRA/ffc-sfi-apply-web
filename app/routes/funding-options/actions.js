const joi = require('joi')
const ViewModel = require('./models/actions')
const cache = require('../../cache')

module.exports = [{
  method: 'GET',
  path: '/funding-options/actions',
  options: {
    handler: async (request, h) => {
      const agreement = await cache.get('agreement', request.yar.id)
      return h.view('funding-options/actions', new ViewModel({ primaryActions: agreement.primaryActions, paymentActions: agreement.paymentActions }))
    }
  }
},
{
  method: 'POST',
  path: '/funding-options/actions',
  options: {
    validate: {
      payload: joi.object({
        primaryActions: joi.array().items(joi.string().allow('cultivateDrillSlope', 'stripTillageNotil', 'soilManagementPlan', 'avoidMachineryTraffic', 'soilAssessment', 'useShallow', 'addOrganicMatter')).required().min(4),
        paymentActions: joi.alternatives().try(
          joi.array().items(joi.string().allow('establishGreenCover', 'convertArableLand')),
          joi.string())
      }),
      failAction: async (request, h, error) => {
        return h.view('funding-options/actions',
          new ViewModel({ primaryActions: request.payload.primaryActions, paymentActions: request.payload.paymentActions }, error)).code(400).takeover()
      }
    },
    handler: async (request, h) => {
      await cache.update('agreement', request.yar.id, request.payload)
      await cache.update('progress', request.yar.id, {
        progress: {
          fundingOptions: { actions: true }
        }
      })
      return h.redirect('land-primary-actions')
    }
  }
}]
