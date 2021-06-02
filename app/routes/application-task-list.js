const sessionHandler = require('../session/session-handler')
const agreementStatus = require('../task-list')
const ViewModel = require('./models/application-task-list')

module.exports = {
  method: 'GET',
  path: '/application-task-list',
  options: {
    handler: (request, h) => {
      const agreement = sessionHandler.get(request, 'agreement')
      console.log(agreement)
      return h.view('application-task-list', new ViewModel(agreementStatus))
    }
  }
}
