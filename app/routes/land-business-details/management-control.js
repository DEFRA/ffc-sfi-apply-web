const cache = require('../../cache')

module.exports = [{
  method: 'GET',
  path: '/management-control',
  options: {
    handler: async (request, h) => {
      const applyJourney = await cache.get(request)
      return h.view('land-business-details/management-control', { name: applyJourney.application.selectedOrganisation.name })
    }
  }
},
{
  method: 'POST',
  path: '/management-control',
  options: {
    handler: async (request, h) => {
      await cache.update(request, {
        progress: { businessDetails: true }
      })
      return h.redirect('/application-task-list')
    }
  }
}]
