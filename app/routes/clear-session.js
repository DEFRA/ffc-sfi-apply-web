const cache = require('../cache')

module.exports = {
  method: 'GET',
  path: '/clear-session',
  options: {
    handler: async (request, h) => {
      await cache.clear('eligibility', request.yar.id)
      await cache.clear('agreement', request.yar.id)
      await cache.clear('calculation', request.yar.id)
      return h.redirect('/')
    }
  }
}
