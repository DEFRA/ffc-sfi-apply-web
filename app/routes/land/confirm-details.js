const cache = require('../../cache')
const getLand = require('../../land/land')
const Joi = require('joi')

module.exports = [
  {
    method: 'GET',
    path: '/confirm-details',
    options: {
      handler: async (request, h) => {
        const land = await getLand(request)

        if (!land.parcels) {
          return h.view('no-response')
        }

        return h.view('land/confirm-details', land)
      }
    }
  },
  {
    method: 'POST',
    path: '/confirm-details',
    options: {
      validate: {
        payload: Joi.object({
          isLandCorrect: Joi.boolean().required(),
          'layer-select': Joi.string()
        }),
        failAction: async (request, h, error) => {
          const mapParcels = await getLand(request)
          mapParcels.errors = error
          return h.view('land/confirm-details', mapParcels).code(400).takeover()
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
