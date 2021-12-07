const cache = require('../cache')
const Joi = require('joi')

module.exports = [{
  method: 'GET',
  path: '/start-application',
  options: {
    handler: async (request, h) => {
      const agreement = await cache.get(request)
      // if SBI not provided as query parameter, then use previously selected organisation from cache if exists.
      const sbi = request.query.sbi ?? agreement?.application?.selectedOrganisation?.sbi
      if (sbi) {
        const organisation = agreement.application.eligibleOrganisations.find(x => x.sbi === parseInt(sbi))
        return h.view('start-application', { organisation })
      }
      return h.view('404')
    }
  }
}, {
  method: 'POST',
  path: '/start-application',
  options: {
    validate: {
      payload: Joi.object({
        sbi: Joi.number().required()
      })
    },
    handler: async (request, h) => {
      const agreement = await cache.get(request)
      const selectedOrganisation = agreement.application.eligibleOrganisations.find(x => x.sbi === request.payload.sbi)

      if (selectedOrganisation) {
        await cache.update(request, { application: { selectedOrganisation, submitted: false } })
        return h.redirect('/application-task-list')
      }
      return h.redirect('/select-organisation')
    }
  }
}]
