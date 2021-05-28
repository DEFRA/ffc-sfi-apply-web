const sessionHandler = require('../session/session-handler')

module.exports = {
  method: 'GET',
  path: '/clear-session',
  options: {
    handler: (request, h) => {
      sessionHandler.clear(request, 'agreement')
      return h.redirect('/')
    }
  }
}
