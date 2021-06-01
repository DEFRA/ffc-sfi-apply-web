const ViewModel = require('./models/review')
const cache = require('../../cache')

module.exports = [{
  method: 'GET',
  path: '/create-agreement/review',
  options: {
    handler: (request, h) => {
      const agreement = cache.get(request, 'agreement')
      return h.view('create-agreement/review', new ViewModel(agreement))
    }
  }
}]
