
const ViewModel = require('./models/withdrawn')

module.exports = {
  method: 'GET',
  path: '/withdrawn',
  options: {
    handler: async (request, h) => {
      return h.view('withdrawn', new ViewModel(request.query.agreementNumber))
    }
  }
}
