const joi = require('joi')
const ViewModel = require('./models/which-business')
const cache = require('../cache')
const getEligibility = require('../eligibility')

module.exports = [{
  method: 'GET',
  path: '/which-business',
  options: {
    auth: { strategy: 'jwt' },
    handler: async (request, h) => {
      const { eligibility, agreement } = await getEligibility(request)

      if (!eligibility) {
        return h.view('no-response')
      }

      if (!eligibility.length) {
        return h.view('no-businesses')
      }

      return h.view('which-business', new ViewModel(eligibility, agreement.selectedOrganisation))
    }
  }
},
{
  method: 'POST',
  path: '/which-business',
  options: {
    auth: { strategy: 'jwt' },
    validate: {
      payload: joi.object({
        sbi: joi.string().required()
      }),
      failAction: async (request, h, error) => {
        const { eligibility, agreement } = await getEligibility(request, error)
        return h.view('which-business', new ViewModel(eligibility, agreement.selectedOrganisation, error)).code(400).takeover()
      }
    },
    handler: async (request, h) => {
      const sbiValue = request.payload.sbi
      const agreement = await cache.get('agreement', request.yar.id)
      const selectedOrganisation = agreement.application.eligibleOrganisations.find(x => x.sbi === parseInt(sbiValue))

      if (selectedOrganisation) {
        await cache.update('agreement', request.yar.id, { application: { selectedOrganisation, submitted: false } })
        return h.redirect('/application-task-list')
      }

      const { eligibility } = await getEligibility(request)
      const error = { message: 'SBI number not found' }
      return h.view('which-business', new ViewModel(eligibility, selectedOrganisation, error)).code(400).takeover()
    }
  }
}]
