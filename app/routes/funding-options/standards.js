const joi = require('joi')
const ViewModel = require('./models/standards')
const { sendStandardsRequestMessage } = require('../../messaging')
const getPollingResponse = require('../../polling')
const cache = require('../../cache')

module.exports = [{
  method: 'GET',
  path: '/funding-options/standards',
  options: {
    handler: async (request, h) => {
      const agreement = await cache.get('agreement', request.yar.id)
      await sendStandardsRequestMessage(agreement, request.yar.id)
      const response = await getPollingResponse(request.yar.id, '/standards')
      if (response) {
        console.info('Standards request received', response)
        await cache.update('apply-journey', request.yar.id, { standards: response.standards })
        return h.view('funding-options/standards', new ViewModel(response.standards, agreement.standards))
      }
      return h.view('no-response')
    }
  }
},
{
  method: 'POST',
  path: '/funding-options/standards',
  options: {
    validate: {
      payload: joi.object({
        standards: joi.array().items(
          joi.string().allow('soilProtection', 'permanentGrasslandProtection', 'livestockWelfare', 'moorlandGrazing').required()
        ).single().required()
      }),
      failAction: async (request, h, error) => {
        const agreement = await cache.get('agreement', request.yar.id)
        await sendStandardsRequestMessage(agreement, request.yar.id)
        const response = await getPollingResponse(request.yar.id, '/standards')
        if (response) {
          console.info('Standards request received', response)
          return h.view('funding-options/standards', new ViewModel(response.standards, request.payload.standards, error)).code(400).takeover()
        }
        return h.view('no-response')
      }
    },
    handler: async (request, h) => {
      await cache.update('agreement', request.yar.id, request.payload)
      await cache.update('progress', request.yar.id, {
        progress: {
          fundingOptions: { standards: true }
        }
      })
      return h.redirect('actions')
    }
  }
}]
