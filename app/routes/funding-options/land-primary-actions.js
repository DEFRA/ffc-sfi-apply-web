const joi = require('joi')
const ViewModel = require('./models/land-primary-actions')
const { sendAgreementCalculateMessage } = require('../../messaging')
const cache = require('../../cache')
const { getParcels } = require('../../api/map')

module.exports = [{
  method: 'GET',
  path: '/funding-options/land-primary-actions',
  options: {
    handler: async (request, h) => {
      const agreement = await cache.get('agreement', request.yar.id)
      const { parcels } = await getParcels(106651310)
      return h.view('funding-options/land-primary-actions', { landInHectares: agreement.landInHectares, landParcels: parcels })
    }
  }
},
{
  method: 'POST',
  path: '/funding-options/land-primary-actions',
  options: {
  /*  validate: {
      payload: joi.object({
        landInHectares: joi.number().greater(0).required()
      }),
      failAction: async (request, h, error) => {
        return h.view('funding-options/land-primary-actions',
          new ViewModel({ landInHectares: request.payload.landInHectares, landParcels: request.payload.landParcels }, error)).code(400).takeover()
      }
    }, */
    handler: async (request, h) => {
      const landInHectares = Object.entries(request.payload).map(e => ({ name: e[0], value: e[1] !== '' ? parseFloat(e[1]) : 0.0 }))
      await cache.update('agreement', request.yar.id, { landInHectares: landInHectares })
      const agreement = await cache.get('agreement', request.yar.id)

      if (agreement.paymentActions !== undefined && agreement.paymentActions.length > 0) {
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
  }
}]
