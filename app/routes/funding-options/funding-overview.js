const cache = require('../../cache')
const handler = require('../handler')

module.exports = [{
  method: 'GET',
  path: '/funding-options/funding-overview',
  options: {
    pre: [
      handler.preHandler('funding-overview')
    ],
    handler: async (request, h) => {
      const applyJourney = await cache.get('apply-journey', request.yar.id)
      const standard = applyJourney.selectedStandard.code
      const journeyItem = request.pre.journeyItem
      const view = journeyItem.decision.find(x => x.key === standard).value
      return h.view(view, { back: journeyItem.back })
    }
  }
},
{
  method: 'POST',
  path: '/funding-options/funding-overview',
  options: {
    pre: [
      handler.preHandler('funding-overview')
    ],
    handler: async (request, h) => {
      await cache.update('progress', request.yar.id, {
        progress: { fundingOptionOverview: true }
      })
      const journeyItem = request.pre.journeyItem
      return h.redirect(journeyItem.next)
    }
  }
}]
