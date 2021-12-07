const cache = require('../../../../cache')

module.exports = [{
  method: 'GET',
  path: '/arable-soils/high/high-end',
  options: {
    handler: async (request, h) => {
      return h.view('land-management/arable-soils/high/high-end')
    }
  }
},
{
  method: 'POST',
  path: '/arable-soils/high/high-end',
  options: {
    handler: async (request, h) => {
      await cache.update(request, {
        progress: { createAgreementOptions: true, how: true }
      })
      return h.redirect('/payment-schedule')
    }
  }
}]
