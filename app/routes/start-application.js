const cache = require('../cache')
const Joi = require('joi')

module.exports = [{
  method: 'GET',
  path: '/start-application',
  options: {
    validate: {
      query: Joi.object({
        sbi: Joi.number().required()
      }),
      failAction: async (request, h, error) => {
        return h.view('/404').takeover()
      }
    },
    handler: async (request, h) => {
      const agreement = await cache.get('agreement', request.yar.id)
      const organisation = agreement.application.eligibleOrganisations.find(x => x.sbi === request.query.sbi)
      return h.view('start-application', { organisation })
    }
  }
}, {
  method: 'POST',
  path: '/start-application',
  options: {
    validate: {
      payload: Joi.object({
        sbi: Joi.string().required()
      })
    },
    handler: async (request, h) => {
      const agreement = await cache.get('agreement', request.yar.id)
      const selectedOrganisation = agreement.application.eligibleOrganisations.find(x => x.sbi === request.payload.sbi)

      if (selectedOrganisation) {
        await cache.update('agreement', request.yar.id, { application: { selectedOrganisation, submitted: false } })
        return h.redirect('/application-task-list')
      }
      return h.redirect('/select-organisation')
    }
  }
}]
