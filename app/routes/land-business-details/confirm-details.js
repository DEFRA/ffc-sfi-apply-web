const cache = require('../../cache')
const { getLandCovers } = require('../../api/crown-hosting/land-cover')
const { getMapParcels } = require('../../parcels')

module.exports = [
  {
    method: 'GET',
    path: '/confirm-details',
    options: {
      handler: async (request, h) => {
        const applyJourney = await cache.get('apply-journey', request.yar.id)
        const { totalHectares, landCovers } = await getLandCovers(applyJourney.selectedOrganisation.organisationId, applyJourney.callerId)
        const mapParcels = await getMapParcels(request)

        return h.view('land-business-details/confirm-details',
          {
            apiKey: mapParcels.apiKey,
            parcels: mapParcels.parcels,
            center: mapParcels.center,
            mapStyle: mapParcels.mapStyle,
            sbi: mapParcels.sbi,
            name: applyJourney.selectedOrganisation.name,
            address: applyJourney.selectedOrganisation.address,
            totalHa: totalHectares,
            landCovers
          })
      }
    }
  }]
