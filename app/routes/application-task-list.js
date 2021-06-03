const ViewModel = require('./models/application-task-list')
const cache = require('../cache')

module.exports = {
  method: 'GET',
  path: '/application-task-list',
  options: {
    handler: async (request, h) => {
      const progress = await cache.get('progress', request.yar.id)
      return h.view('application-task-list', new ViewModel(progress))
    }
  }
}
