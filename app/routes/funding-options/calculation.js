const getPollingResponse = require('../../polling')
const cache = require('../../cache')

module.exports = [{
  method: 'GET',
  path: '/funding-options/calculation',
  options: {
    handler: async (request, h) => {
      const response = await getPollingResponse(request.yar.id, '/calculate')
      if (response) {
        console.info('Calculation result received', response)
        await cache.update('agreement', request.yar.id, { paymentAmount: response.paymentAmount })
        return h.view('funding-options/calculation', { paymentAmount: response.paymentAmount })
      }
      return h.view('no-response')
    }
  }
},
{
  method: 'POST',
  path: '/funding-options/calculation',
  options: {
    handler: async (request, h) => {
      await cache.update('progress', request.yar.id, { eligibility: true })
      return h.redirect('/application-task-list')
    }
  }
}]
