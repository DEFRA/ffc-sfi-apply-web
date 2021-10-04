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
      const applyJourney = await cache.get('agreement', request.yar.id)
      await submitAgreement(applyJourney.agreementNumber, applyJourney.selectedSbi.sbi)
      await cache.update('progress', request.yar.id, {
        progress: { submitted: true }
      })
      return h.redirect('/confirmation')
    }
  }
}]
