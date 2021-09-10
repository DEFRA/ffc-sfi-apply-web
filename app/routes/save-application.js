const cache = require('../cache')
const { saveAgreement } = require('../api/agreement')

module.exports = [{
  method: 'GET',
  path: '/save-application',
  options: {
    handler: async (request, h) => {
      const applyJourney = await cache.get('apply-journey', request.yar.id)
      const progress = await cache.get('progress', request.yar.id)
      await saveAgreement(applyJourney, progress)
      const url = new URL(request.headers.referer)
      const referer = url.pathname
      return h.view('save-application', { referer })
    }
  }
}]
