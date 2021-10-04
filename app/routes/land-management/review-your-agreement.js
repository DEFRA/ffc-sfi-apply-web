const cache = require('../../cache')

module.exports = [{
  method: 'GET',
  path: '/review-your-agreement',
  options: {
    handler: async (request, h) => {
      const applyJourney = await cache.get('agreement', request.yar.id)
      return h.view('land-management/review-your-agreement', { selectedStandardCode: applyJourney.selectedStandard.code })
    }
  }
},
{
  method: 'POST',
  path: '/review-your-agreement',
  options: {
    handler: async (request, h) => {
      await cache.update('progress', request.yar.id, {
        progress: { agreement: true, createAgreement: true }
      })
      return h.redirect('/application-task-list')
    }
  }
}]
