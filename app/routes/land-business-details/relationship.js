const cache = require('../../cache')
const handler = require('../handler')

module.exports = [{
  method: 'GET',
  path: '/relationship',
  options: {
    pre: [
      handler.preHandler('/relationship')
    ],
    handler: async (request, h) => {
      const journeyItem = request.pre.journeyItem
      const applyJourney = await cache.get('apply-journey', request.yar.id)
      return h.view('land-business-details/relationship', {
        name: applyJourney.selectedSbi.name,
        back: journeyItem.back,
        next: journeyItem.next
      })
    }
  }
},
{
  method: 'POST',
  path: '/relationship',
  options: {
    pre: [
      handler.preHandler('/relationship')
    ],
    handler: async (request, h) => {
      await cache.update('progress', request.yar.id, {
        progress: { businessDetails: true }
      })
      const journeyItem = request.pre.journeyItem
      return h.redirect(journeyItem.next)
    }
  }
}]
