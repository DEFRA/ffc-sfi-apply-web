const cache = require('../../cache')
const { getLandCovers } = require('../../api/crown-hosting/land-cover')

module.exports = [
  {
    method: 'GET',
    path: '/confirm-details',
    options: {
      handler: async (request, h) => {
        const applyJourney = await cache.get('apply-journey', request.yar.id)
        const { totalHectares, landCovers } = await getLandCovers(applyJourney.selectedSbi.organisationId, applyJourney.callerId)

        return h.view('land-business-details/confirm-details',
          {
            sbi: applyJourney.selectedSbi.sbi,
            name: applyJourney.selectedSbi.name,
            address: applyJourney.selectedSbi.address,
            totalHa: totalHectares,
            landCovers
          })
      }
    }
  }]
