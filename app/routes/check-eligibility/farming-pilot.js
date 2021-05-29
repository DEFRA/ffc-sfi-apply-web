const joi = require('joi')
const ViewModel = require('./models/farming-pilot')
const { sendEligibilityCheckMessage } = require('../../messaging')

module.exports = [{
  method: 'GET',
  path: '/check-eligibility/farming-pilot',
  options: {
    handler: (request, h) => {
      return h.view('check-eligibility/farming-pilot', new ViewModel())
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
      await sendEligibilityCheckMessage({ id: 1 }, request.yar.id)
      return h.redirect('eligible')
    }
  }
}]
