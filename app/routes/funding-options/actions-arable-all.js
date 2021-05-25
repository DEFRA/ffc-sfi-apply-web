const joi = require('joi')
const ViewModel = require('./models/actions-arable-all')

module.exports = [{
  method: 'GET',
  path: '/funding-options/actions-arable-all',
  options: {
    handler: (request, h) => {
      return h.view('funding-options/actions-arable-all', new ViewModel())
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
        paymentActions: joi.array().allow('establishGreenCover', 'convertArableLand').required()
      }),
      failAction: async (request, h, error) => {
        return h.view('funding-options/actions-arable-all',
          new ViewModel({ primaryActions: request.payload.primaryActions, paymentActions: request.payload.paymentActions }, error)).code(400).takeover()
      }
    },
    handler: async (request, h) => {
      return h.redirect('land-primary-actions')
    }
  }
}]
