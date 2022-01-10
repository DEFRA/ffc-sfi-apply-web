const { save } = require('../agreement')
const cache = require('../cache')

module.exports = [{
  method: 'GET',
  path: '/saved',
  options: {
    handler: async (request, h) => {
      const { agreement } = await cache.get(request)
      const agreementNumber = agreement.agreementNumber
      const referer = request.headers.referer ? new URL(request.headers.referer).pathname : '/'
      return h.view('saved', { referer, agreementNumber })
    }
  }
}, {
  method: 'POST',
  path: '/save',
  options: {
    handler: async (request, h) => {
      await save(request)
      return h.redirect('/saved')
    }
  }
}]
