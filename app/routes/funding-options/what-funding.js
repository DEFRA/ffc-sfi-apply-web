const joi = require('joi')
const ViewModel = require('./models/what-funding')
const { sendStandardsRequestMessage, sendAgreementValidateMessage } = require('../../messaging')
const getPollingResponse = require('../../polling')

module.exports = [{
  method: 'GET',
  path: '/funding-options/what-funding',
  options: {
    handler: async (request, h) => {
      await sendStandardsRequestMessage({ id: 1 }, request.yar.id)
      const response = await getPollingResponse(request.yar.id, '/standards')
      if (response) {
        console.info('Standards request received', response)
        return h.view('funding-options/what-funding', new ViewModel())
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
        funding: joi.array().allow('arableHorticulturalSoils', 'permanentGrasslandSoils', 'welfareAssessmentLivestock').required()
      }),
      failAction: async (request, h, error) => {
        return h.view('funding-options/what-funding', new ViewModel(request.payload.funding, error)).code(400).takeover()
      }
    },
    handler: async (request, h) => {
      await sendAgreementValidateMessage({ id: 1 }, request.yar.id)
      return h.redirect('actions-arable-all')
    }
  }
}]
