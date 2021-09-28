const handler = require('../../handler')
const cache = require('../../../cache')

module.exports = [{
  method: 'GET',
  path: '/improved-grassland-soils/stocking-density',
  options: {
    pre: [
      handler.preHandler('improved-grassland-soils-stocking-density')
    ],
    handler: async (request, h) => {
      const journeyItem = request.pre.journeyItem
      return h.view(journeyItem.view)
    }
  }
},
{
  method: 'POST',
  path: '/improved-grassland-soils/stocking-density',
  options: {
    pre: [
      handler.preHandler('improved-grassland-soils-stocking-density')
    ],
    handler: async (request, h) => {
      const applyJourney = await cache.get('apply-journey', request.yar.id)
      const journeyItem = request.pre.journeyItem
      const paymentLevel = journeyItem.decision.find(d => d.key === applyJourney?.selectedAmbitionLevel?.name)
      return h.redirect(paymentLevel ? paymentLevel.value : journeyItem.next)
    }
  }
}]
