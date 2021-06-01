const joi = require('joi')
const ViewModel = require('./models/farming-pilot')
const { sendEligibilityCheckMessage } = require('../../messaging')
const cache = require('../../cache')

module.exports = [{
  method: 'GET',
  path: '/check-eligibility/farming-pilot',
  options: {
    handler: async (request, h) => {
      const eligibilityData = await cache.get('eligibility', request.yar.id)
      return h.view('check-eligibility/farming-pilot', new ViewModel(eligibilityData.farmingPilot))
    }
  }
},
{
  method: 'POST',
  path: '/check-eligibility/farming-pilot',
  options: {
    validate: {
      payload: joi.object({
        farmingPilot: joi.boolean().required()
      }),
      failAction: async (request, h, error) => {
        return h.view('check-eligibility/farming-pilot', new ViewModel(request.payload.farmingPilot, error)).code(400).takeover()
      }
    },
    handler: async (request, h) => {
      await cache.update('eligibility', request.yar.id, request.payload)
      const eligibilityData = await cache.get('eligibility', request.yar.id)
      await sendEligibilityCheckMessage(eligibilityData, request.yar.id)
      return h.redirect('eligible')
    }
  }
}]
