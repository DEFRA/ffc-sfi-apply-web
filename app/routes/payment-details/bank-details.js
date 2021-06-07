const cache = require('../../cache')
const { saveAgreement } = require('../../agreement')

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
      await cache.update('progress', request.yar.id, { paymentDetails: true })
      await saveAgreement(await cache.get('agreement', request.yar.id))
      return h.redirect('/application-task-list')
    }
  }
}]
