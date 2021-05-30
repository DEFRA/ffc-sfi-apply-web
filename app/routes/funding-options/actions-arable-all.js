const joi = require('joi')
const ViewModel = require('./models/actions-arable-all')
const getPollingResponse = require('../../polling')

module.exports = [{
  method: 'GET',
  path: '/funding-options/actions-arable-all',
  options: {
    handler: async (request, h) => {
      const response = await getPollingResponse(request.yar.id, '/validate')
      if (response) {
        console.info('Validation result received', response)
        if (response.isValid) {
          return h.view('funding-options/actions-arable-all', new ViewModel())
        }
        return h.view('funding-options/not-valid')
      }
      return h.view('no-response')
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
      return h.redirect('land-primary-actions')
    }
  }
}]
