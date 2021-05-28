const ViewModel = require('./models/review')
const sessionHandler = require('../../session/session-handler')

module.exports = [{
  method: 'GET',
  path: '/create-agreement/review',
  options: {
    handler: (request, h) => {
      const agreement = sessionHandler.get(request, 'agreement')
      console.log(agreement)
      return h.view('create-agreement/review', new ViewModel(agreement))
    }
  }
}]
