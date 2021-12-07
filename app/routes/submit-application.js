const cache = require('../cache')
const { submitAgreement } = require('../api/agreement')
const saveAgreement = require('./models/save-application')

module.exports = [{
  method: 'GET',
  path: '/declaration',
  options: {

    handler: async (request, h) => {
      await saveAgreement(request)
      return h.view('submit-application')
    }
  }
},
{
  method: 'POST',
  path: '/declaration',
  options: {

    handler: async (request, h) => {
      await saveAgreement(request)
      const agreement = await cache.get(request)
      await submitAgreement(agreement.application.agreementNumber, agreement.application.selectedOrganisation.sbi)
      await cache.update(request, {
        progress: { submitted: true }
      })
      return h.redirect('/confirmation')
    }
  }
}]
