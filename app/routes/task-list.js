const ViewModel = require('./models/task-list')

module.exports = {
  method: 'GET',
  path: '/task-list',
  options: {
    handler: async (request, h) => {
      return h.view('task-list', new ViewModel())
    }
  }
}
