const cache = require('../../../../cache')

module.exports = [{
  method: 'GET',
  path: '/improved-grassland-soils/basic/basic-end',
  options: {
    handler: async (request, h) => {
      return h.view('land-management/improved-grassland-soils/basic/basic-end')
    }
  }
},
{
  method: 'POST',
  path: '/improved-grassland-soils/basic/basic-end',
  options: {
    handler: async (request, h) => {
      await cache.update('agreement', request.yar.id, {
        progress: { createAgreementOptions: true, how: true }
      })
      return h.redirect('/payment-schedule')
    }
  }
}]
