const cache = require('../../cache')

module.exports = [{
  method: 'GET',
  path: '/review-your-agreement',
  options: {

    handler: async (request, h) => {
      const agreement = await cache.get(request)
      return h.view('land-management/review-your-agreement', { selectedStandardCode: agreement.application.selectedStandard.code })
    }
  }
},
{
  method: 'POST',
  path: '/review-your-agreement',
  options: {

    handler: async (request, h) => {
      await cache.update(request, {
        progress: { agreement: true, createAgreement: true, actions: true }
      })
      return h.redirect('/application-task-list')
    }
  }
}]
