const cache = require('../cache')
const schema = require('./schemas/sbi')

module.exports = [{
  method: 'GET',
  path: '/start-application',
  options: {
    handler: async (request, h) => {
      const { sbi: cachedSbi, data } = await cache.get(request)
      // if SBI not provided as query parameter, then use previously selected organisation from cache if exists.
      const sbi = request.query.sbi ?? cachedSbi
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
      const { data } = await cache.get(request)
      const selectedOrganisation = data.eligibleOrganisations.find(x => x.sbi === request.payload.sbi)

      if (selectedOrganisation) {
        await cache.update(request, { sbi: selectedOrganisation.sbi })
        return h.redirect('/task-list')
      }
      return h.redirect('/select-organisation')
    }
  }
}]
