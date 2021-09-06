const cache = require('../../cache')
const getOrganisationAddress = require('../../organisation-address')

module.exports = [
  {
    method: 'GET',
    path: '/confirm-details',
    options: {
      handler: async (request, h) => {
        const applyJourney = await cache.get('apply-journey', request.yar.id)
        const organisationAddress = await getOrganisationAddress(applyJourney.selectedSbi, applyJourney.callerId)
        return h.view('land-business-details/confirm-details',
          {
            sbi: applyJourney.selectedSbi.sbi,
            name: organisationAddress.name,
            address: organisationAddress.address
          })
      }
    }
  }]
