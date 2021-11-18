const cache = require('../cache')

module.exports = {
  method: 'GET',
  path: '/clear-session',
  options: {
    handler: async (request, h) => {
      await cache.clear('agreement', request.yar.id)
      return h.redirect('/').unstate('ffc_sfi_identity')
    }
  }
}
