const ViewModel = require('./models/change')

module.exports = [{
  method: 'GET',
  path: '/funding-options/change',
  options: {
    handler: (request, h) => {
      return h.view('funding-options/change', new ViewModel())
    }
  }
},
{
  method: 'POST',
  path: '/funding-options/change',
  options: {
    handler: async (request, h) => {
      return h.redirect('application-value')
    }
  }
}]
