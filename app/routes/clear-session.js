const cache = require('../cache')

module.exports = {
  method: 'GET',
  path: '/clear-session',
  options: {
    handler: (request, h) => {
      cache.clear(request, 'agreement')
      return h.redirect('/')
    }
  }
}
