const { save } = require('../agreement')

module.exports = [{
  method: 'GET',
  path: '/save',
  options: {
    handler: async (request, h) => {
      await save(request)
      return h.view('saved')
    }
  }
}]
