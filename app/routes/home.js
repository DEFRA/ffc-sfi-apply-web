const cache = require('../cache')

module.exports = {
  method: 'GET',
  path: '/',
  options: {
    handler: async (request, h) => {
      await cache.clear('progress', request.yar.id)
      await cache.clear('apply-journey', request.yar.id)
      return h.view('home')
    }
  }
}
