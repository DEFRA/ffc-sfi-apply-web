const joi = require('joi')
const { sendAgreementCalculateMessage } = require('../../messaging')
const cache = require('../../cache')
const { getParcels } = require('../../api/map')

function getLandInHectares (payload, parcels) {
  return Object.entries(payload).map(entry => {
    const [name, value] = entry
    const [sheetId, parcelId] = name.split('_')
    const feature = parcels.features.find(feature => {
      const props = feature.properties
      return props.sheet_id === sheetId && props.parcel_id === parcelId
    })

    return {
      name,
      value,
      valid: value <= feature.properties.area_ha
    }
  })
}

module.exports = [
  {
    method: 'GET',
    path: '/funding-options/land-primary-actions',
    options: {
      handler: async (request, h) => {
        const agreement = await cache.get('agreement', request.yar.id)
        const { parcels } = await getParcels(agreement.sbi)

        return h.view('funding-options/land-primary-actions', {
          landInHectares: agreement.landInHectares,
          landParcels: parcels
        })
      }
    }
  },
  {
    method: 'POST',
    path: '/funding-options/land-primary-actions',
    options: {
      handler: async (request, h) => {
        const { payload } = request
        const agreement = await cache.get('agreement', request.yar.id)
        const { parcels } = await getParcels(agreement.sbi)
        const landInHectares = getLandInHectares(payload, parcels)
        const hasInvalidValues = landInHectares.some(element => !element.valid)

        if (hasInvalidValues) {
          return h.view('funding-options/land-primary-actions', {
            landInHectares: landInHectares,
            landParcels: parcels,
            errors: true
          }).code(400).takeover()
        } else {
          await cache.update('agreement', request.yar.id, { landInHectares: landInHectares })

          if (agreement.paymentActions?.length > 0) {
            return h.redirect('land-increased-actions')
          } else {
            await sendAgreementCalculateMessage(agreement, request.yar.id)
            await cache.update('progress', request.yar.id, {
              progress: {
                fundingOptions: { land: true }
              }
            })

            return h.redirect('calculation')
          }
        }
      },
      validate: {
        payload: joi.object().pattern(joi.string(), joi.number().empty('').default(0)).required(),
        failAction: async (request, h, error) => {
          const { payload } = request
          const agreement = await cache.get('agreement', request.yar.id)
          const { parcels } = await getParcels(agreement.sbi)
          const landInHectares = getLandInHectares(payload, parcels)

          return h.view('funding-options/land-primary-actions', {
            landInHectares: landInHectares,
            landParcels: parcels,
            errors: true
          }).takeover()
        }
      }
    }
  }
]
