const joi = require('joi')
const ViewModel = require('./models/select-sbi')
const cache = require('../../../cache')
const { getSbis } = require('../../../api/crown-hosting')

module.exports = [{
  method: 'GET',
  path: '/v2/select-sbi',
  options: {
    handler: async (request, h) => {
      const applyJourney = await cache.get('apply-journey', request.yar.id)
      const sbis = await getSbis(applyJourney.crn, applyJourney.callerId)
      await cache.update('apply-journey', request.yar.id, { availableSbis: sbis })

      return h.view('v2/select-sbi/select-sbi', new ViewModel(sbis))
    }
  }
},
{
  method: 'POST',
  path: '/v2/select-sbi',
  options: {
    validate: {
      payload: joi.object({
        sbi: joi.string().required()
      }),
      failAction: async (request, h, error) => {
        return h.view('v2/select-sbi/select-sbi', new ViewModel(request.payload.sbi, error)).code(400).takeover()
      }
    },
    handler: async (request, h) => {
      const sbiValue = request.payload.sbi
      const applyJourney = await cache.get('apply-journey', request.yar.id)

      const selectedSbi = applyJourney.availableSbis.find(x => x.sbi === parseInt(sbiValue))
      await cache.update('apply-journey', request.yar.id, { selectedSbi: selectedSbi })
      return h.redirect('/v2/organisation-details')
    }
  }
}]
