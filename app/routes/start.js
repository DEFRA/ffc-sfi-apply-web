const cache = require('../cache')

module.exports = {
  method: 'GET',
  path: '/start',
  handler: async (request, h) => {
    await cache.clear('progress', request.yar.id)
    await cache.clear('agreement', request.yar.id)

    return h.redirect('/v2/search-crn')
  }
}
