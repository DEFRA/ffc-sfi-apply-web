const cache = require('../../cache')
const config = require('../../config')
const { getLandCovers } = require('../../api/crown-hosting/land-cover')
const { getParcels } = require('../../api/map')

module.exports = [
  {
    method: 'GET',
    path: '/confirm-details',
    options: {
      handler: async (request, h) => {
        const applyJourney = await cache.get('apply-journey', request.yar.id)
        const { totalHectares, landCovers } = await getLandCovers(applyJourney.selectedOrganisation.organisationId, applyJourney.callerId)
        const sbi = applyJourney.selectedOrganisation.sbi
        const mapStyle = request.query.mapStyle || ''
        const apiKey = config.osMapApiKey || ''
        const { parcels, center } = await getParcels(sbi)

        return h.view('land-business-details/confirm-details',
          {
            apiKey,
            parcels,
            center,
            mapStyle,
            sbi,
            name: applyJourney.selectedOrganisation.name,
            address: applyJourney.selectedOrganisation.address,
            totalHa: totalHectares,
            landCovers
          })
      }
    }
  }]
