const ViewModel = require('./models/review')

module.exports = [{
  method: 'GET',
  path: '/create-agreement/review',
  options: {
    handler: (request, h) => {
      return h.view('create-agreement/review', new ViewModel())
    }
  }
}]
