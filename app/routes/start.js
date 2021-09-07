const cache = require('../cache')

module.exports = [{
  method: 'GET',
  path: '/start',
  handler: async (request, h) => {
    await cache.clear('progress', request.yar.id)
    await cache.clear('apply-journey', request.yar.id)

    return h.redirect('/application-task-list')
  }
},
{
  method: 'GET',
  path: '/startV2',
  handler: async (request, h) => {
    await cache.clear('progress', request.yar.id)
    await cache.clear('apply-journey', request.yar.id)

    return h.redirect('/v2/search-crn')
  }
}]
