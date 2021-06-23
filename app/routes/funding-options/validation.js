const getPollingResponse = require('../../polling')
const { sendAgreementCalculateMessage } = require('../../messaging')
const cache = require('../../cache')

module.exports = [{
  method: 'GET',
  path: '/funding-options/validation',
  options: {
    handler: async (request, h) => {
      const agreement = await cache.get('agreement', request.yar.id)
      const response = await getPollingResponse(request.yar.id, '/validate')
      if (response) {
        console.info('Validation result received', response)
        if (response.isValid) {
          await cache.update('agreement', request.yar.id, { paymentAmount: response.paymentAmount })
          if (agreement.paymentActions !== undefined && agreement.paymentActions.length > 0) {
            return h.redirect('land-increased-actions')
          } else {
            await sendAgreementCalculateMessage(agreement, request.yar.id)
            return h.redirect('calculation')
          }
        } else {
          return h.redirect('land-primary-actions')
        }
      } else {
        return h.view('no-response')
      }
    }
  }
}]
