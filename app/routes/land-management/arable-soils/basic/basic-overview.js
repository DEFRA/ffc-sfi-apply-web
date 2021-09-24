const handler = require('../../../handler')

module.exports = [{
  method: 'GET',
  path: '/arable-soils/basic/basic-overview',
  options: {
    pre: [
      handler.preHandler('/arable-soils/basic/basic-overview')
    ],
    handler: async (request, h) => {
      return h.view('land-management/arable-soils/basic/basic-overview')
    }
  }
},
{
  method: 'POST',
  path: '/arable-soils/basic/basic-overview',
  options: {
    pre: [
      handler.preHandler('/arable-soils/basic/basic-overview')
    ],
    handler: async (request, h) => {
      const journeyItem = request.pre.journeyItem
      return h.redirect(journeyItem.next)
    }
  }
}]
