const cache = require('../../../cache')

module.exports = [{
  method: 'GET',
  path: '/v2/summary',
  options: {
    handler: async (request, h) => {
      const applyJourney = await cache.get('apply-journey', request.yar.id)

      return h.view('v2/summary/summary',
        {
          paymentAmount: applyJourney.selectedAmbitionLevel.level.paymentAmount,
          standard: applyJourney.selectedStandard.name,
          parcelArea: applyJourney.parcelArea
        }
      )
    }
  }
},
{
  method: 'POST',
  path: '/v2/summary',
  options: {
    handler: async (request, h) => {
      return h.redirect('/v2/submit')
    }
  }
}]
