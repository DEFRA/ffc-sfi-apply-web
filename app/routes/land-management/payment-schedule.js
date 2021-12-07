const cache = require('../../cache')

module.exports = [{
  method: 'GET',
  path: '/payment-schedule',
  options: {

    handler: async (request, h) => {
      const agreement = await cache.get(request)
      return h.view('land-management/payment-schedule', { selectedStandardCode: agreement.application.selectedStandard.code })
    }
  }
},
{
  method: 'POST',
  path: '/payment-schedule',
  options: {

    handler: async (request, h) => {
      await cache.update(request, {
        progress: { schedule: true, chooseActions: true }
      })
      return h.redirect('/check-your-answers')
    }
  }
}]
