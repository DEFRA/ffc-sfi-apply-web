const cache = require('../../cache')

module.exports = [{
  method: 'GET',
  path: '/payment-schedule',
  options: {
    auth: { strategy: 'jwt' },
    handler: async (request, h) => {
      const agreement = await cache.get('agreement', request.yar.id)
      return h.view('land-management/payment-schedule', { selectedStandardCode: agreement.application.selectedStandard.code })
    }
  }
},
{
  method: 'POST',
  path: '/payment-schedule',
  options: {
    auth: { strategy: 'jwt' },
    handler: async (request, h) => {
      await cache.update('agreement', request.yar.id, {
        progress: { schedule: true, chooseActions: true }
      })
      return h.redirect('/check-your-answers')
    }
  }
}]
