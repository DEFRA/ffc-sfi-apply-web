const cache = require('../../../../cache')
const { saveAgreement } = require('../../../../agreement')
const { saveProgress } = require('../../../../progress')

module.exports = [{
  method: 'GET',
  path: '/payment-details/bank-details',
  options: {
    handler: (request, h) => {
      return h.view('payment-details/bank-details')
    }
  }
},
{
  method: 'POST',
  path: '/payment-details/bank-details',
  options: {
    handler: async (request, h) => {
      await cache.update('progress', request.yar.id, { progress: { paymentDetails: true } })
      const progressId = await saveProgress(await cache.get('progress', request.yar.id))

      await saveAgreement(await cache.get('agreement', request.yar.id), progressId)
      return h.redirect('/application-task-list')
    }
  }
}]
