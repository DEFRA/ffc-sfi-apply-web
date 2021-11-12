const cache = require('../cache')

module.exports = [{
  method: 'GET',
  path: '/relationship',
  options: {
    auth: { strategy: 'jwt' },
    handler: async (request, h) => {
      const agreement = await cache.get('agreement', request.yar.id)
      return h.view('relationship', { name: agreement.application.selectedOrganisation.name })
    }
  }
},
{
  method: 'POST',
  path: '/relationship',
  options: {
    auth: { strategy: 'jwt' },
    handler: async (request, h) => {
      await cache.update('agreement', request.yar.id, {
        progress: { businessDetails: true }
      })
      return h.redirect('/application-task-list')
    }
  }
}]
