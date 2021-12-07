const cache = require('../../../../cache')

module.exports = [{
  method: 'GET',
  path: '/improved-grassland-soils/medium/medium-end',
  options: {
    handler: async (request, h) => {
      return h.view('land-management/improved-grassland-soils/medium/medium-end')
    }
  }
},
{
  method: 'POST',
  path: '/improved-grassland-soils/medium/medium-end',
  options: {
    handler: async (request, h) => {
      await cache.update(request, {
        progress: { createAgreementOptions: true, how: true }
      })
      return h.redirect('/payment-schedule')
    }
  }
}]
