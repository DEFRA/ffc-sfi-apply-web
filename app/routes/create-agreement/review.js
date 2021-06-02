const ViewModel = require('./models/review')
const cache = require('../../cache')

module.exports = [{
  method: 'GET',
  path: '/create-agreement/review',
  options: {
    handler: async (request, h) => {
      const agreement = await cache.get('agreement', request.yar.id)
      await cache.update('progress', request.yar.id, { createAgreement: true })
      return h.view('create-agreement/review', new ViewModel(agreement))
    }
  }
}]
