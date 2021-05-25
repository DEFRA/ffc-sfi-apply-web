const ViewModel = require('./models/application-value')

module.exports = [{
  method: 'GET',
  path: '/funding-options/application-value',
  options: {
    handler: (request, h) => {
      return h.view('funding-options/application-value', new ViewModel())
    }
  }
},
{
  method: 'POST',
  path: '/funding-options/application-value',
  options: {
    handler: async (request, h) => {
      return h.redirect('/application-task-list')
    }
  }
}]
