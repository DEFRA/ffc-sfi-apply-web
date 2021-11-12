const cache = require('../../cache')

module.exports = [{
  method: 'GET',
  path: '/review-your-agreement',
  options: {
    auth: { strategy: 'jwt' },
    handler: async (request, h) => {
      const agreement = await cache.get('agreement', request.yar.id)
      return h.view('land-management/review-your-agreement', { selectedStandardCode: agreement.application.selectedStandard.code })
    }
  }
},
{
  method: 'POST',
  path: '/review-your-agreement',
  options: {
    auth: { strategy: 'jwt' },
    handler: async (request, h) => {
      await cache.update('agreement', request.yar.id, {
        progress: { agreement: true, createAgreement: true, actions: true }
      })
      return h.redirect('/application-task-list')
    }
  }
}]
