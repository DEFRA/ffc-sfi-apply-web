const getEligibility = require('../eligibility')
const ViewModel = require('./models/search')

module.exports = [{
  method: 'GET',
  path: '/eligible-organisations',
  options: {
    handler: async (request, h) => {
      // const { eligibility } = await getEligibility(request)

      const eligibility = [{
        sbi: 123456789,
        name: 'Title Forename 6Lastname1',
        organisationId: 123457,
        address: 'address1, address2, address3, postalCode'
      },
      {
        sbi: 987654321,
        name: 'Title Forename Lastname2',
        organisationId: 7654321,
        address: 'address1, address2, address3, postalCode'
      }]

      if (!eligibility) {
        return h.view('no-response')
      }

      if (!eligibility.length) {
        return h.view('no-businesses')
      }

      if (eligibility.length === 1) {
        return h.redirect(`/start-application?sbi=${eligibility[0].sbi}`)
      }

      return h.view('eligible-organisations', { organisations: eligibility, ...new ViewModel() })
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