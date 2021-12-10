const cache = require('../../cache')

module.exports = [{
  method: 'GET',
  path: '/funding/arable-overview',
  options: {
    handler: async (request, h) => {
      return h.view('funding/arable-overview')
    }
  }
},
{
  method: 'GET',
  path: '/funding/grassland-overview',
  options: {
    handler: async (request, h) => {
      return h.view('funding/grassland-overview')
    }
  }
},
{
  method: 'GET',
  path: '/funding/funding-overview',
  options: {
    handler: async (request, h) => {
      const agreement = await cache.get(request)
      const standard = agreement.application.selectedStandard.code
      if (standard === 'sfi-improved-grassland') {
        return h.redirect('/funding/grassland-overview')
      }

      return h.redirect('/funding/arable-overview')
    }
  }
},
{
  method: 'POST',
  path: '/funding/funding-overview',
  options: {
    handler: async (request, h) => {
      await cache.update(request, {
        progress: { fundingOptionOverview: true }
      })
      return h.redirect('/funding/how-much')
    }
  }
}]
