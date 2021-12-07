const getEligibility = require('../eligibility')
const cache = require('../cache')

module.exports = [{
  method: 'GET',
  path: '/select-organisation',
  options: {
    handler: async (request, h) => {
      const { eligibility } = await getEligibility(request)

      if (!eligibility) {
        return h.view('no-response')
      }

      if (!eligibility.length) {
        return h.view('no-businesses')
      }

      if (eligibility.length === 1) {
        const selectedOrganisation = eligibility[0]
        await cache.update(request, { application: { selectedOrganisation, submitted: false } })
        return h.redirect('/start-application')
      }

      return h.redirect('/eligible-organisations')
    }
  }
}]
