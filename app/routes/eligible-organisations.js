const cache = require('../cache')
// const getEligibility = require('../eligibility')
const ViewModel = require('./models/search')
const schema = require('./schemas/sbi')

module.exports = [{
  method: 'GET',
  path: '/eligible-organisations',
  options: {
    handler: async (request, h) => {
      // const { eligibility } = await getEligibility(request)

      // temp statements
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
      await cache.update('agreement', request.yar.id, { application: { eligibleOrganisations: eligibility } })

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
    validate: {
      payload: schema,
      failAction: async (request, h, error) => {
        return h.view('eligible-organisations', new ViewModel(request.payload.sbi, error)).code(400).takeover()
      }
    },
    handler: async (request, h) => {
      const sbi = request.payload.sbi
      const agreement = await cache.get('agreement', request.yar.id)
      const organisations = agreement.application.eligibleOrganisations
      const organisation = organisations.filter(organisation => organisation.sbi === sbi)

      if (organisation.length) {
        return h.view('eligible-organisations', { organisations: organisation, ...new ViewModel(sbi) })
      }
      return h.view('eligible-organisations', new ViewModel(sbi, { message: 'No organisation matching SBI.' })).code(400)
    }
  }
}]
