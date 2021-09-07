const cache = require('../../cache')

module.exports = [{
  method: 'GET',
  path: '/check-your-answers',
  options: {
    handler: async (request, h) => {
      const applyJourney = await cache.get('apply-journey', request.yar.id)
      return h.view('land-management/check-your-answers', { selectedStandardCode: applyJourney.selectedStandard.code })
    }
  }
},
{
  method: 'POST',
  path: '/check-your-answers',
  options: {
    handler: async (request, h) => {
      await cache.update('progress', request.yar.id, {
        progress: { answers: true }
      })
      return h.redirect('/review-your-agreement')
    }
  }
}]
