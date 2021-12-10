const ViewModel = require('./models/task-list')
const cache = require('../cache')

module.exports = {
  method: 'GET',
  path: '/task-list',
  options: {
    handler: async (request, h) => {
      const agreement = await cache.get(request)
      const progress = agreement?.progress
      return h.view('task-list', new ViewModel(progress))
    }
  }
}
