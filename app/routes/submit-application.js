const cache = require('../cache')
const handler = require('./handler')
const { submitAgreement } = require('../api/agreement')
const saveAgreement = require('./models/save-application')

module.exports = [{
  method: 'GET',
  path: '/declaration',
  options: {
    pre: [
      handler.preHandler('declaration')
    ],
    handler: async (request, h) => {
      const journeyItem = request.pre.journeyItem
      return h.view(journeyItem.view)
    }
  }
},
{
  method: 'POST',
  path: '/declaration',
  options: {
    pre: [
      handler.preHandler('declaration')
    ],
    handler: async (request, h) => {
      await saveAgreement(request)
      const applyJourney = await cache.get('apply-journey', request.yar.id)
      await submitAgreement(applyJourney.agreementNumber, applyJourney.selectedSbi.sbi)
      await cache.update('progress', request.yar.id, {
        progress: { submitted: true }
      })
      const journeyItem = request.pre.journeyItem
      return h.redirect(journeyItem.next)
    }
  }
}]
