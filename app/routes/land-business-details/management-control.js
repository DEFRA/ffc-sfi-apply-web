const cache = require('../../cache')

module.exports = [{
  method: 'GET',
  path: '/management-control',
  options: {
    handler: async (request, h) => {
      const applyJourney = await cache.get('agreement', request.yar.id)
      return h.view('land-business-details/management-control', { name: applyJourney.selectedOrganisation.name })
    }
  }
},
{
  method: 'POST',
  path: '/management-control',
  options: {
    handler: async (request, h) => {
      await cache.update('progress', request.yar.id, {
        progress: { businessDetails: true }
      })
      return h.redirect('/application-task-list')
    }
  }
}]
