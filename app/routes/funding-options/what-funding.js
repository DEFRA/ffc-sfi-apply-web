const joi = require('joi')
const ViewModel = require('./models/what-funding')
const { sendStandardsRequestMessage, sendAgreementValidateMessage } = require('../../messaging')
const getPollingResponse = require('../../polling')
const sessionHandler = require('../../session/session-handler')

module.exports = [{
  method: 'GET',
  path: '/funding-options/what-funding',
  options: {
    handler: async (request, h) => {
      await sendStandardsRequestMessage({ id: 1 }, request.yar.id)
      const response = await getPollingResponse(request.yar.id, '/standards')
      if (response) {
        console.info('Standards request received', response)
        return h.view('funding-options/what-funding', new ViewModel(response.standards))
      }
      return h.view('no-response')
    }
  }
},
{
  method: 'POST',
  path: '/funding-options/what-funding',
  options: {
    validate: {
      payload: joi.object({
        funding: joi.array().allow('soilProtection', 'permanentGrasslandProtection', 'livestockWelfare').required()
      }),
      failAction: async (request, h, error) => {
        await sendStandardsRequestMessage({ id: 1 }, request.yar.id)
        const response = await getPollingResponse(request.yar.id, '/standards')
        if (response) {
          console.info('Standards request received', response)
          return h.view('funding-options/what-funding', new ViewModel(response.standards, request.payload.funding, error)).code(400).takeover()
        }
        return h.view('no-response')
      }
    },
    handler: async (request, h) => {
      sessionHandler.update(request, 'agreement', request.payload)
      await sendAgreementValidateMessage({ id: 1 }, request.yar.id)
      return h.redirect('actions-arable-all')
    }
  }
}]
