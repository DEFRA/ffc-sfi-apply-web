const cache = require('../cache')
const { save } = require('../agreement')

module.exports = {
  method: 'GET',
  path: '/progress-saved',
  options: {
    handler: async (request, h) => {
      const { agreement } = await cache.get(request)
      const agreementNumber = agreement.agreementNumber
      const referer = request.headers.referer ? new URL(request.headers.referer).pathname : '/'
      await save(request)
      return h.view('progress-saved', { referer, agreementNumber })
    }
  }
}
