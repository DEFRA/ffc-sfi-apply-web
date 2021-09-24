const cache = require('../../cache')
const handler = require('../handler')

module.exports = [{
  method: 'GET',
  path: '/review-your-agreement',
  options: {
    pre: [
      handler.preHandler('review-your-agreement')
    ],
    handler: async (request, h) => {
      const applyJourney = await cache.get('apply-journey', request.yar.id)
      return h.view('land-management/review-your-agreement', { selectedStandardCode: applyJourney.selectedStandard.code })
    }
  }
},
{
  method: 'POST',
  path: '/review-your-agreement',
  options: {
    pre: [
      handler.preHandler('review-your-agreement')
    ],
    handler: async (request, h) => {
      await cache.update('progress', request.yar.id, {
        progress: { agreement: true, createAgreement: true }
      })
      const journeyItem = request.pre.journeyItem
      return h.redirect(journeyItem.next)
    }
  }
}]
