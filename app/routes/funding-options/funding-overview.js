const cache = require('../../cache')

module.exports = [{
  method: 'GET',
  path: '/funding-options/arable-overview',
  options: {
    handler: async (request, h) => {
      return h.view('funding-options/arable-overview')
    }
  }
},
{
  method: 'GET',
  path: '/funding-options/grassland-overview',
  options: {
    handler: async (request, h) => {
      return h.view('funding-options/grassland-overview')
    }
  }
},
{
  method: 'GET',
  path: '/funding-options/funding-overview',
  options: {
    handler: async (request, h) => {
      const agreement = await cache.get('agreement', request.yar.id)
      const standard = agreement.selectedStandard.code
      if (standard === 'sfi-improved-grassland') {
        return h.redirect('/funding-options/grassland-overview')
      }

      return h.redirect('/funding-options/arable-overview')
    }
  }
},
{
  method: 'POST',
  path: '/funding-options/funding-overview',
  options: {
    handler: async (request, h) => {
      await cache.update('progress', request.yar.id, {
        progress: { fundingOptionOverview: true }
      })
      return h.redirect('/funding-options/how-much')
    }
  }
}]
