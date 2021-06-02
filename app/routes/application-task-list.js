const sessionHandler = require('../session/session-handler')

module.exports = {
  method: 'GET',
  path: '/application-task-list',
  options: {
    handler: (request, h) => {
      const agreement = sessionHandler.get(request, 'agreement')
      console.log(agreement)
      return h.view('application-task-list')
    }
  }
}
