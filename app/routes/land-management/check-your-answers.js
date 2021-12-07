const cache = require('../../cache')

module.exports = [{
  method: 'GET',
  path: '/check-your-answers',
  options: {

    handler: async (request, h) => {
      const agreement = await cache.get(request)
      return h.view('land-management/check-your-answers', { selectedStandardCode: agreement.application.selectedStandard.code })
    }
  }
},
{
  method: 'POST',
  path: '/check-your-answers',
  options: {

    handler: async (request, h) => {
      await cache.update(request, {
        progress: { answers: true }
      })
      return h.redirect('/review-your-agreement')
    }
  }
}]
