const cache = require('../../../../cache')

module.exports = [{
  method: 'GET',
  path: '/arable-soils/basic/basic-end',
  options: {
    handler: async (request, h) => {
      return h.view('land-management/arable-soils/basic/basic-end')
    }
  }
},
{
  method: 'POST',
  path: '/arable-soils/basic/basic-end',
  options: {
    handler: async (request, h) => {
      await cache.update(request, {
        progress: { createAgreementOptions: true, how: true }
      })
      return h.redirect('/payment-schedule')
    }
  }
}]
