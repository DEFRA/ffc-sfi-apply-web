const joi = require('joi')
const ViewModel = require('./models/land-increased-actions')
const { sendAgreementCalculateMessage } = require('../../messaging')
const cache = require('../../cache')
const buildMessage = require('../../calculation')

module.exports = [{
  method: 'GET',
  path: '/funding-options/land-increased-actions',
  options: {
    handler: async (request, h) => {
      const agreement = await cache.get('agreement', request.yar.id)
      return h.view('funding-options/land-increased-actions', new ViewModel({ paymentActions: agreement.paymentActions, greenCover: agreement.greenCover, permanentGrass: agreement.permanentGrass }))
    }
  }
},
{
  method: 'POST',
  path: '/funding-options/land-increased-actions',
  options: {
    validate: {
      payload: joi.object({
        greenCover: joi.number().greater(0).optional(),
        permanentGrass: joi.number().greater(0).optional()
      }),
      failAction: async (request, h, error) => {
        const agreement = await cache.get('agreement', request.yar.id)
        return h.view('funding-options/land-increased-actions',
          new ViewModel({ paymentActions: agreement.paymentActions, greenCover: request.payload.greenCover, permanentGrass: request.payload.permanentGrass }, error)).code(400).takeover()
      }
    },
    handler: async (request, h) => {
      const agreement = await cache.update('agreement', request.yar.id, request.payload)
      console.log('###########', JSON.stringify(buildMessage(agreement)))
      await sendAgreementCalculateMessage(buildMessage(agreement), request.yar.id)
      await cache.update('progress', request.yar.id, {
        progress: {
          fundingOptions: { land: true }
        }
      })
      return h.redirect('calculation')
    }
  }
}]
