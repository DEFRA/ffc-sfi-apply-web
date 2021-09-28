const handler = require('../../handler')

module.exports = [{
  method: 'GET',
  path: '/arable-soils/soil-management',
  options: {
    pre: [
      handler.preHandler('arable-soils-soil-management')
    ],
    handler: async (request, h) => {
      const journeyItem = request.pre.journeyItem
      return h.view(journeyItem.view)
    }
  }
},
{
  method: 'POST',
  path: '/arable-soils/soil-management',
  options: {
    pre: [
      handler.preHandler('arable-soils-soil-management')
    ],
    handler: async (request, h) => {
      const journeyItem = request.pre.journeyItem
      return h.redirect(journeyItem.next)
    }
  }
}]
