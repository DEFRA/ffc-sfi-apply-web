const joi = require('joi')
const ViewModel = require('./models/actions-arable-all')
const sessionHandler = require('../../session/session-handler')

module.exports = [{
  method: 'GET',
  path: '/funding-options/actions-arable-all',
  options: {
    handler: (request, h) => {
      const agreement = sessionHandler.get(request, 'agreement')
      console.log(agreement)
      return h.view('funding-options/actions-arable-all', new ViewModel({ primaryActions: agreement.primaryActions !== undefined ? agreement.primaryActions : null, paymentActions: agreement.paymentActions !== undefined ? agreement.paymentActions : null }))
    }
  }
},
{
  method: 'POST',
  path: '/funding-options/actions-arable-all',
  options: {
    validate: {
      payload: joi.object({
        primaryActions: joi.array().allow('cultivateDrillSlope', 'stripTillageNotil', 'soilManagementPlan', 'avoidMachineryTraffic', 'soilAssessment', 'useShallow', 'addOrganicMatter').required().min(4),
        paymentActions: joi.array().allow('establishGreenCover', 'convertArableLand')
      }),
      failAction: async (request, h, error) => {
        return h.view('funding-options/actions-arable-all',
          new ViewModel({ primaryActions: request.payload.primaryActions, paymentActions: request.payload.paymentActions }, error)).code(400).takeover()
      }
    },
    handler: async (request, h) => {
      sessionHandler.update(request, 'agreement', request.payload)
      return h.redirect('land-primary-actions')
    }
  }
}]
