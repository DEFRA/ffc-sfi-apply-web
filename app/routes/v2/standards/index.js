const ViewModel = require('./models/select-standard')
const joi = require('joi')
const { sendStandardsRequestMessage } = require('../../../messaging')
const cache = require('../../../cache')
const getPollingResponse = require('../../../polling')
const generateAgreementNumber = require('../../../agreement-number')

module.exports = [{
  method: 'GET',
  path: '/v2/standards',
  options: {
    handler: async (request, h) => {
      const applyJourney = await cache.get('apply-journey', request.yar.id)
      await sendStandardsRequestMessage({ sbi: applyJourney.selectedSbi.sbi, organisationId: applyJourney.selectedSbi.organisationId, callerId: applyJourney.callerId }, request.yar.id)
      const response = await getPollingResponse(request.yar.id, '/standards')
      if (response) {
        console.info('Standards request received', response)
        await cache.update('apply-journey', request.yar.id, { agreementNumber: response.agreementNumber ?? generateAgreementNumber(), standards: response.standards })
        return h.view('v2/standards/select-standard', new ViewModel(response.standards, applyJourney.selectedStandards))
      }
      return h.view('no-response')
    }
  }
},
{
  method: 'POST',
  path: '/v2/standards',
  options: {
    validate: {
      payload: joi.object({
        standard: joi.string().required()
      }),
      failAction: async (request, h, error) => {
        return h.view('v2/standards/select-standard', new ViewModel(request.payload.standards, error)).code(400).takeover()
      }
    },
    handler: async (request, h) => {
      const standard = request.payload.standard
      const applyJourney = await cache.get('apply-journey', request.yar.id)

      const selectedStandard = applyJourney.standards.find(x => x.code === standard)
      await cache.update('apply-journey', request.yar.id, { selectedStandard: selectedStandard })
      return h.redirect('/v2/add-standard-parcels')
    }
  }
}]
