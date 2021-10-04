const cache = require('../cache')

module.exports = [{
  method: 'GET',
  path: '/relationship',
  options: {
    handler: async (request, h) => {
      const agreement = await cache.get('agreement', request.yar.id)
      return h.view('relationship', { name: agreement.selectedSbi.name })
    }
  }
},
{
  method: 'POST',
  path: '/relationship',
  options: {
    handler: async (request, h) => {
      await cache.update('progress', request.yar.id, {
        progress: { businessDetails: true }
      })
      return h.redirect('/application-task-list')
    }
  }
}]
