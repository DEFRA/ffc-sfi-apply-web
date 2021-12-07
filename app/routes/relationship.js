const cache = require('../cache')

module.exports = [{
  method: 'GET',
  path: '/relationship',
  options: {

    handler: async (request, h) => {
      const agreement = await cache.get(request)
      return h.view('relationship', { name: agreement.application.selectedOrganisation.name })
    }
  }
},
{
  method: 'POST',
  path: '/relationship',
  options: {

    handler: async (request, h) => {
      await cache.update(request, {
        progress: { businessDetails: true }
      })
      return h.redirect('/application-task-list')
    }
  }
}]
