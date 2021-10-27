const cache = require('../../cache')

module.exports = [{
  method: 'GET',
  path: '/payment-schedule',
  options: {
    handler: async (request, h) => {
      const agreement = await cache.get('agreement', request.yar.id)
      return h.view('land-management/payment-schedule', { selectedStandardCode: agreement.selectedStandard.code })
    }
  }
},
{
  method: 'POST',
  path: '/payment-schedule',
  options: {
    handler: async (request, h) => {
      await cache.update('progress', request.yar.id, {
        progress: { schedule: true }
      })
      return h.redirect('/check-your-answers')
    }
  }
}]
