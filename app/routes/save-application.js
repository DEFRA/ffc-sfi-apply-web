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

      const referer = request.headers.referer.replace(/^[a-z]{4,5}:\/{2}[a-z]{1,}:[0-9]{1,4}.(.*)/, '$1')
      return h.view('save-application', { referer })
    }
  }
}]
