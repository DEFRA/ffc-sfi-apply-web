const cache = require('../cache')
const handler = require('./handler')

module.exports = [{
  method: 'GET',
  path: '/declaration',
  options: {
    pre: [
      handler.preHandler('declaration')
    ],
    handler: async (request, h) => {
      const journeyItem = request.pre.journeyItem
      return h.view(journeyItem.view)
    }
  }
},
{
  method: 'POST',
  path: '/declaration',
  options: {
    pre: [
      handler.preHandler('declaration')
    ],
    handler: async (request, h) => {
      await cache.update('progress', request.yar.id, {
        progress: { submitted: true }
      })
      const journeyItem = request.pre.journeyItem
      return h.redirect(journeyItem.next)
    }
  }
}]
