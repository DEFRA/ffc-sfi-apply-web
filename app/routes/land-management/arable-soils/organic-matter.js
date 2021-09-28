const cache = require('../../../cache')
const handler = require('../../handler')

module.exports = [{
  method: 'GET',
  path: '/arable-soils/organic-matter',
  options: {
    pre: [
      handler.preHandler('arable-soils-organic-matter')
    ],
    handler: async (request, h) => {
      const journeyItem = request.pre.journeyItem
      return h.view(journeyItem.view)
    }
  }
},
{
  method: 'POST',
  path: '/arable-soils/organic-matter',
  options: {
    pre: [
      handler.preHandler('arable-soils-organic-matter')
    ],
    handler: async (request, h) => {
      const applyJourney = await cache.get('apply-journey', request.yar.id)
      const journeyItem = request.pre.journeyItem
      const paymentLevel = journeyItem.decision.find(d => d.key === applyJourney?.selectedAmbitionLevel?.name)
      return h.redirect(paymentLevel ? paymentLevel.value : journeyItem.next)
    }
  }
}]
