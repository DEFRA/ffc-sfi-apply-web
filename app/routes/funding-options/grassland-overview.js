const cache = require('../../cache')

module.exports = [{
  method: 'GET',
  path: '/funding-options/grassland-overview',
  options: {
    handler: async (request, h) => {
      return h.view('funding-options/grassland-overview')
    }
  }
},
{
  method: 'POST',
  path: '/funding-options/grassland-overview',
  options: {
    handler: async (request, h) => {
      await cache.update('progress', request.yar.id, {
        progress: { fundingOptionOverview: true }
      })

      return h.redirect('/funding-options/how-much')
    }
  }
}]
