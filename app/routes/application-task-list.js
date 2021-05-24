module.exports = {
  method: 'GET',
  path: '/application-task-list',
  options: {
    handler: (request, h) => {
      return h.view('application-task-list')
    }
  }
}
