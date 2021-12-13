const { create } = require('../agreement')
const cache = require('../cache')
const schema = require('./schemas/sbi')

module.exports = [{
  method: 'GET',
  path: '/start-application',
  options: {
    handler: async (request, h) => {
      const { agreement, data } = await cache.get(request)
      const { cachedOrganisation } = agreement
      // if SBI not provided as query parameter, then use previously selected organisation from cache if exists.
      const sbi = request.query?.sbi ?? cachedOrganisation?.sbi
      if (sbi) {
        const organisation = data.eligibleOrganisations.find(x => x.sbi === parseInt(sbi))
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
      payload: schema
    },
    handler: async (request, h) => {
      let { agreement, data, callerId } = await cache.get(request)

      // if no existing agreement or SBI no longer matches cached agreement then start new agreement
      if (!agreement || agreement?.organisation?.sbi !== request.payload.sbi) {
        await cache.reset(request)
        agreement = create()
        // Need to include caller Id as part of agreement to support downstream services
        // Expect to remove once Defra Identity integrated
        agreement.callerId = callerId
      }

      const selectedOrganisation = data.eligibleOrganisations.find(x => x.sbi === request.payload.sbi)

      if (selectedOrganisation) {
        agreement.organisation = selectedOrganisation
        await cache.update(request, { agreement })
        return h.redirect('/task-list')
      }
      return h.redirect('/eligible-organisation')
    }
  }
}]
