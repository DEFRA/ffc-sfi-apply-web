const cache = require('../../../cache')

module.exports = [
  {
    method: 'GET',
    path: '/v2/organisation-details',
    options: {
      handler: async (request, h) => {
        const applyJourney = await cache.get('apply-journey', request.yar.id)
        console.log(applyJourney)
        return h.view('v2/organisation-details/organisation-details', { sbi: applyJourney.sbi })
      }
    }
  }
]
