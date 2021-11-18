const cache = require('../../cache')
const { getLandCovers } = require('../../api/crown-hosting/land-cover')
const getMapParcels = require('../../map')

module.exports = [
  {
    method: 'GET',
    path: '/confirm-details',
    options: {
      handler: async (request, h) => {
        const agreement = await cache.get('agreement', request.yar.id)
        const application = agreement.application
        const { totalHectares, landCovers } = await getLandCovers(application.selectedOrganisation.organisationId, application.callerId)
        const mapParcels = await getMapParcels(request)

        return h.view('land-business-details/confirm-details',
          {
            apiKey: mapParcels.apiKey,
            parcels: mapParcels.parcels,
            center: mapParcels.center,
            mapStyle: mapParcels.mapStyle,
            sbi: mapParcels.sbi,
            name: application.selectedOrganisation.name,
            address: application.selectedOrganisation.address,
            totalHa: totalHectares,
            landCovers
          })
      }
    }
  }]
