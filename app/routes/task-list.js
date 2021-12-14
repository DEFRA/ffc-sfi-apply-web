const ViewModel = require('./models/task-list')
const cache = require('../cache')

module.exports = {
  method: 'GET',
  path: '/task-list',
  options: {
    handler: async (request, h) => {
      const cachedData = await cache.get(request)
      return h.view('task-list', new ViewModel(cachedData))
    }
  }
}
