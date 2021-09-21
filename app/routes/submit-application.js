const cache = require('../cache')
const { saveAgreement, submitAgreement } = require('../api/agreement')

module.exports = [{
  method: 'GET',
  path: '/declaration',
  options: {
    handler: async (request, h) => {
      return h.view('submit-application')
    }
  }
},
{
  method: 'POST',
  path: '/declaration',
  options: {
    handler: async (request, h) => {
      const applyJourney = await cache.get('apply-journey', request.yar.id)
      await submitAgreement(applyJourney.agreementNumber, applyJourney.selectedSbi.sbi)
      const progress = await cache.update('progress', request.yar.id, {
        progress: { submitted: true }
      })
      await saveAgreement(applyJourney, progress)
      return h.redirect('/confirmation')
    }
  }
}]
