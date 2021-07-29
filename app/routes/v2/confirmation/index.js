const cache = require('../../../cache')
const ViewModel = require('./models/confirmation')

module.exports = {
  method: 'GET',
  path: '/v2/confirmation',
  options: {
    handler: async (request, h) => {
      const applyJourney = await cache.get('apply-journey', request.yar.id)
      return h.view('v2/confirmation/confirmation', new ViewModel(applyJourney.agreementNumber))
    }
  }
}
