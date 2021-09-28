const cache = require('../../cache')
const handler = require('../handler')

module.exports = [{
  method: 'GET',
  path: '/check-your-answers',
  options: {
    pre: [
      handler.preHandler('check-your-answers')
    ],
    handler: async (request, h) => {
      const applyJourney = await cache.get('apply-journey', request.yar.id)
      const journeyItem = request.pre.journeyItem
      return h.view(journeyItem.view, { selectedStandardCode: applyJourney.selectedStandard.code })
    }
  }
},
{
  method: 'POST',
  path: '/check-your-answers',
  options: {
    pre: [
      handler.preHandler('check-your-answers')
    ],
    handler: async (request, h) => {
      await cache.update('progress', request.yar.id, {
        progress: { answers: true }
      })
      const journeyItem = request.pre.journeyItem
      return h.redirect(journeyItem.next)
    }
  }
}]
