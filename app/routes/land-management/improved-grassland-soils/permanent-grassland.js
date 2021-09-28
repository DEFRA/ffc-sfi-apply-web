const handler = require('../../handler')

module.exports = [{
  method: 'GET',
  path: '/improved-grassland-soils/permanent-grassland',
  options: {
    pre: [
      handler.preHandler('improved-grassland-soils-permanent-grassland')
    ],
    handler: async (request, h) => {
      const journeyItem = request.pre.journeyItem
      return h.view(journeyItem.view)
    }
  }
},
{
  method: 'POST',
  path: '/improved-grassland-soils/permanent-grassland',
  options: {
    pre: [
      handler.preHandler('improved-grassland-soils-permanent-grassland')
    ],
    handler: async (request, h) => {
      const journeyItem = request.pre.journeyItem
      return h.redirect(journeyItem.next)
    }
  }
}]
