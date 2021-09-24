const handler = require('../../../handler')

module.exports = [{
  method: 'GET',
  path: '/improved-grassland-soils/basic/basic-overview',
  options: {
    pre: [
      handler.preHandler('#paymentLevel#-overview')
    ],
    handler: async (request, h) => {
      return h.view('land-management/improved-grassland-soils/basic/basic-overview')
    }
  }
},
{
  method: 'POST',
  path: '/improved-grassland-soils/basic/basic-overview',
  options: {
    pre: [
      handler.preHandler('#paymentLevel#-overview')
    ],
    handler: async (request, h) => {
      const journeyItem = request.pre.journeyItem
      return h.redirect(journeyItem.next)
    }
  }
}]
