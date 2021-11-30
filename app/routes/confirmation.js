const cache = require('../cache')

module.exports = [{
  method: 'GET',
  path: '/confirmation',
  options: {
    handler: async (request, h) => {
      const agreement = await cache.get('agreement', request.yar.id)
      return h.view('confirmation', { agreementNumber: agreement.application.agreementNumber })
    }
  }
}]
