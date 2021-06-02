const joi = require('joi')
const ViewModel = require('./models/farming-pilot')
const { sendEligibilityCheckMessage } = require('../../messaging')
const cache = require('../../cache')
const schema = require('./schemas/eligibility')

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
      const eligibilityData = await cache.update('eligibility', request.yar.id, request.payload)
      // ensure that all eligibility data has been supplied
      const result = schema.validate(eligibilityData, { allowUnknown: true })
      if (result.error) {
        console.info(`Eligibility data is incomplete for ${request.yar.id}, restarting journey`)
        return h.redirect('bps')
      }
      await sendEligibilityCheckMessage(eligibilityData, request.yar.id)
      return h.redirect('eligible')
    }
  }
}]
