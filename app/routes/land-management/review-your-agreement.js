const cache = require('../../cache')

module.exports = [{
  method: 'GET',
  path: '/review-your-agreement',
  options: {
    auth: { strategy: 'jwt' },
    handler: async (request, h) => {
      const agreement = await cache.get('agreement', request.yar.id)
      return h.view('land-management/review-your-agreement', { selectedStandardCode: agreement.selectedStandard.code })
    }
  }
},
{
  method: 'POST',
  path: '/review-your-agreement',
  options: {
    auth: { strategy: 'jwt' },
    handler: async (request, h) => {
      await cache.update('progress', request.yar.id, {
        progress: { agreement: true, createAgreement: true }
      })
      return h.redirect('/application-task-list')
    }
  }
}]
