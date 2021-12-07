const cache = require('../cache')

module.exports = {
  method: 'GET',
  path: '/clear-session',
  options: {
    handler: async (request, h) => {
      await cache.clear(request)
      return h.redirect('/').unstate('ffc_sfi_identity')
    }
  }
}
