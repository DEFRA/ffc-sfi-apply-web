const cache = require('../../cache')

module.exports = [{
  method: 'GET',
  path: '/check-your-answers',
  options: {
    auth: { strategy: 'jwt' },
    handler: async (request, h) => {
      const agreement = await cache.get('agreement', request.yar.id)
      return h.view('land-management/check-your-answers', { selectedStandardCode: agreement.selectedStandard.code })
    }
  }
},
{
  method: 'POST',
  path: '/check-your-answers',
  options: {
    auth: { strategy: 'jwt' },
    handler: async (request, h) => {
      await cache.update('progress', request.yar.id, {
        progress: { answers: true }
      })
      return h.redirect('/review-your-agreement')
    }
  }
}]
