const cache = require('../../cache')
const { getLandCovers } = require('../../api/crown-hosting/land-cover')
const getMapParcels = require('../../map')
const joi = require('joi')

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

        if (!mapParcels.parcels) {
          return h.view('no-response')
        }

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
  },
  {
    method: 'POST',
    path: '/confirm-details',
    options: {
      validate: {
        payload: joi.object({
          landControlCheck: joi.boolean().required()
        }),
        failAction: async (request, h, error) => {
          return h.redirect('/confirm-details')
        }
      },
      handler: async (request, h) => {
        const payload = request.payload

        if (payload.landControlCheck) {
          await cache.update('agreement', request.yar.id, {
            progress: { businessDetails: true }
          })
          return h.redirect('/application-task-list')
        }

        return h.redirect('/land-business-details/change-land-details')
      }
    }
  }]
