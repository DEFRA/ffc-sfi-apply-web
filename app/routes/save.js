const { save } = require('../agreement')

module.exports = [{
  method: 'GET',
  path: '/save',
  options: {
    handler: async (request, h) => {
      await save(request)
      return h.redirect('saved')
    }
  }
}, {
  method: 'GET',
  path: '/saved',
  options: {
    handler: async (request, h) => {
      return h.view('saved')
    }
  }
}]
