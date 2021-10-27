const saveAgreement = require('./models/save-application')

module.exports = [{
  method: 'GET',
  path: '/save-application',
  options: {
    auth: { strategy: 'jwt' },
    handler: async (request, h) => {
      const agreement = await saveAgreement(request)
      const url = new URL(request.headers.referer)
      const referer = url.pathname
      return h.view('save-application', { referer, agreementNumber: agreement.agreementNumber })
    }
  }
}]
