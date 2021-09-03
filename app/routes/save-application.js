const cache = require('../cache')

module.exports = [{
  method: 'GET',
  path: '/save-application',
  options: {
    handler: async (request, h) => {
      const applyJourney = await cache.get('apply-journey', request.yar.id)
      const progress = await cache.get('progress', request.yar.id)

      console.log(applyJourney)
      console.log(progress)

      const url = new URL(request.headers.referer)
      const referer = url.pathname
      return h.view('save-application', { referer })
    }
  }
}]
