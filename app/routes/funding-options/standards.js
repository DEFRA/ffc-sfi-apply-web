const joi = require('joi')
const ViewModel = require('./models/standards')
const { sendStandardsRequestMessage, sendAgreementValidateMessage } = require('../../messaging')
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
        standards: joi.array().allow('soilProtection', 'permanentGrasslandProtection', 'livestockWelfare').required()
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
      const agreement = await await cache.update('agreement', request.yar.id, request.payload)
      await sendAgreementValidateMessage(agreement, request.yar.id)
      return h.redirect('actions')
    }
  }
}]
