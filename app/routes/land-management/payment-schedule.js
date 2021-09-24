const cache = require('../../cache')
const handler = require('../handler')

module.exports = [{
  method: 'GET',
  path: '/payment-schedule',
  options: {
    pre: [
      handler.preHandler('payment-schedule')
    ],
    handler: async (request, h) => {
      const applyJourney = await cache.get('apply-journey', request.yar.id)
      return h.view('land-management/payment-schedule', { selectedStandardCode: applyJourney.selectedStandard.code })
    }
  }
},
{
  method: 'POST',
  path: '/payment-schedule',
  options: {
    pre: [
      handler.preHandler('payment-schedule')
    ],
    handler: async (request, h) => {
      await cache.update('progress', request.yar.id, {
        progress: { schedule: true }
      })
      const journeyItem = request.pre.journeyItem
      return h.redirect(journeyItem.next)
    }
  }
}]
