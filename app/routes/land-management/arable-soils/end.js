const cache = require('../../../cache')
const handler = require('../../handler')

module.exports = [{
  method: 'GET',
  path: '/arable-soils/end',
  options: {
    pre: [
      handler.preHandler('arable-soils-end')
    ],
    handler: async (request, h) => {
      const journeyItem = request.pre.journeyItem
      return h.view(journeyItem.view)
    }
  }
},
{
  method: 'POST',
  path: '/arable-soils/end',
  options: {
    pre: [
      handler.preHandler('arable-soils-end')
    ],
    handler: async (request, h) => {
      await cache.update('progress', request.yar.id, {
        progress: { createAgreementOptions: true, how: true }
      })
      const journeyItem = request.pre.journeyItem
      return h.redirect(journeyItem.next)
    }
  }
}]
