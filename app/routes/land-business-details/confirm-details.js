const cache = require('../../cache')
const getMapParcels = require('../../map')
const joi = require('joi')

module.exports = [
  {
    method: 'GET',
    path: '/confirm-details',
    options: {
      handler: async (request, h) => {
        const mapParcels = await getMapParcels(request)

        if (!mapParcels.parcels) {
          return h.view('no-response')
        }

        return h.view('land-business-details/confirm-details', mapParcels)
      }
    }
  },
  {
    method: 'POST',
    path: '/confirm-details',
    options: {
      validate: {
        payload: joi.object({
          isLandCorrect: joi.boolean().required(),
          'layer-select': joi.string()
        }),
        failAction: async (request, h, error) => {
          const mapParcels = await getMapParcels(request)
          mapParcels.errors = error
          return h.view('land-business-details/confirm-details', mapParcels).code(400).takeover()
        }
      },
      handler: async (request, h) => {
        const payload = request.payload

        if (payload.isLandCorrect) {
          await cache.update(request, {
            progress: { businessDetails: true }
          })
          return h.redirect('/management-control')
        }

        return h.redirect('/change-land-details')
      }
    }
  }]
