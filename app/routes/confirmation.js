const cache = require('../cache')
const ViewModel = require('./models/confirmation')

module.exports = {
  method: 'GET',
  path: '/confirmation',
  options: {
    handler: async (request, h) => {
      const agreement = await cache.get('agreement', request.yar.id)
      return h.view('confirmation', new ViewModel(agreement.agreementNumber))
    }
  }
}
