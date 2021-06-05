const cache = require('../cache')
const ViewModel = require('./models/withdrawn')

module.exports = {
  method: 'GET',
  path: '/withdrawn',
  options: {
    handler: async (request, h) => {
      const agreement = await cache.get('agreement', request.yar.id)
      return h.view('withdrawn', new ViewModel(agreement.agreementNumber))
    }
  }
}
