const cache = require('../cache')
const handler = require('./handler')

module.exports = {
  method: 'GET',
  path: '/',
  options: {
    pre: [
      handler.preHandler('home')
    ],
    handler: async (request, h) => {
      await cache.clear('progress', request.yar.id)
      await cache.clear('apply-journey', request.yar.id)
      const journeyItem = request.pre.journeyItem
      return h.view(journeyItem.view, { next: journeyItem.next })
    }
  }
}
