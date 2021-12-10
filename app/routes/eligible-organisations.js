const getEligibleOrganisations = require('../eligibility')

module.exports = [{
  method: 'GET',
  path: '/eligible-organisations',
  options: {
    handler: async (request, h) => {
      const eligibleOrganisations = await getEligibleOrganisations(request)

      if (!eligibleOrganisations) {
        return h.view('no-response')
      }

      if (!eligibleOrganisations.length) {
        return h.view('no-businesses')
      }

      if (eligibleOrganisations.length === 1) {
        return h.redirect(`/start-application?sbi=${eligibleOrganisations[0].sbi}`)
      }

      return h.view('eligible-organisations', { organisations: eligibleOrganisations })
    }
  }
}]
