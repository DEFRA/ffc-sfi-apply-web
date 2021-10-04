const cache = require('../../cache')
const getOrganisationAddress = require('../../organisation-address')
const { getLandCovers } = require('../../api/crown-hosting/land-cover')

module.exports = [
  {
    method: 'GET',
    path: '/confirm-details',
    options: {
      handler: async (request, h) => {
        const applyJourney = await cache.get('agreement', request.yar.id)
        const { totalHectares, landCovers } = await getLandCovers(applyJourney.selectedSbi.organisationId, applyJourney.callerId)
        const organisationAddress = await getOrganisationAddress(applyJourney.selectedSbi, applyJourney.callerId)

        return h.view('land-business-details/confirm-details',
          {
            sbi: applyJourney.selectedSbi.sbi,
            name: organisationAddress.name,
            address: organisationAddress.address,
            totalHa: totalHectares,
            landCovers
          })
      }
    }
  }]
