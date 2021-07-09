const joi = require('joi')
const ViewModel = require('./models/select-sbi')
const cache = require('../../../cache')
const getPollingResponse = require('../../../polling')

module.exports = [{
  method: 'GET',
  path: '/v2/select-sbi',
  options: {
    handler: async (request, h) => {
      const response = await getPollingResponse(request.yar.id, '/request-sbi')
      if (response) {
        console.info('Request SBI result received', response)
        await cache.update('apply-journey', request.yar.id, { sbi: response.sbi })
        const applyJourney = await cache.get('apply-journey', request.yar.id)
        return h.view('v2/select-sbi/select-sbi', new ViewModel(applyJourney.sbi))
      }
      return h.view('no-response')
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
      const sbi = request.payload.sbi
      await cache.update('apply-journey', request.yar.id, { sbi })
      return h.redirect('/v2/organisation-details')
    }
  }
}]
