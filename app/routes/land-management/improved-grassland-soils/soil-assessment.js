const handler = require('../../handler')

module.exports = [{
  method: 'GET',
  path: '/improved-grassland-soils/soil-assessment',
  options: {
    pre: [
      handler.preHandler('improved-grassland-soils-soil-assessment')
    ],
    handler: async (request, h) => {
      const journeyItem = request.pre.journeyItem
      return h.view(journeyItem.view)
    }
  }
},
{
  method: 'POST',
  path: '/improved-grassland-soils/soil-assessment',
  options: {
    pre: [
      handler.preHandler('improved-grassland-soils-soil-assessment')
    ],
    handler: async (request, h) => {
      const journeyItem = request.pre.journeyItem
      return h.redirect(journeyItem.next)
    }
  }
}]
