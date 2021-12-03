const getEligibility = require('../eligibility')

module.exports = [{
  method: 'GET',
  path: '/eligible-organisations',
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
        return h.redirect(`/start-application?sbi=${eligibility[0].sbi}`)
      }

      return h.view('eligible-organisations', { organisations: eligibility })
    }
  }
},
{
  method: 'POST',
  path: '/eligible-organisations',
  options: {
    handler: async (request, h) => {
      const { eligibility } = await getEligibility(request)

      // get the organisations from the cache
      const organisations = cache.get('agreement', request.yar.id, { application: { eligibleOrganisations: eligibility } })
      const sbi = request.payload.sbi

      // match sbi in the orginsations array
      const organisation = [] // cast to array

      const json = {
        organisations: organisation,
        unavaible: true, // bool value,
        sbi: request.payload.sbi
      }

      return h.view('eligible-organisations', json)
    }
  }
}]
