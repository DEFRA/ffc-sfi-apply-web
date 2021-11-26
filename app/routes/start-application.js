const cache = require('../cache')

module.exports = [{
  method: 'GET',
  path: '/start-application',
  options: {
    handler: async (request, h) => {
      const agreement = await cache.get('agreement', request.yar.id)
      return h.view('start-application', { organisation: agreement.selectedOrganisation })
    }
  }
}]
