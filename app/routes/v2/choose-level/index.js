const ViewModel = require('./models/choose-level')
const cache = require('../../../cache')

module.exports = [{
  method: 'GET',
  path: '/v2/choose-level/choose-level',
  handler: async (request, h) => {
    const applyJourney = await cache.get('apply-journey', request.yar.id)
    return h.view('v2/choose-level/choose-level', ViewModel(
      applyJourney.sbi, request.yar.get('proto-std'), request.yar.get('proto-std-area')
    ))
  }
},
{
  method: 'POST',
  path: '/v2/choose-level/choose-level',
  handler: async (request, h) => {
    request.yar.set('proto-level', request.payload.level)
    return h.redirect('/v2/choose-level/choose-level')
  }
}]
