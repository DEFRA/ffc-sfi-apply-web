const ViewModel = require('./models/select-standard')
const { sendStandardsRequestMessage } = require('../../../messaging')
const cache = require('../../../cache')
const getPollingResponse = require('../../../polling')

module.exports = [{
  method: 'GET',
  path: '/v2/standards',
  options: {
    handler: async (request, h) => {
      const applyJourney = await cache.get('apply-journey', request.yar.id)
      await sendStandardsRequestMessage({ sbi: applyJourney.selectedSbi.sbi, organistionId: applyJourney.selectedSbi.organisationId, callerId: applyJourney.callerId }, request.yar.id)
      const response = await getPollingResponse(request.yar.id, '/standards')
      if (response) {
        console.info('Standards request received', response)
        await cache.update('apply-journey', request.yar.id, { standards: response.standards })
        return h.view('v2/standards/select-standard', new ViewModel(response.standards, applyJourney.selectedStandards))
      }
      return h.view('no-response')
    }
  }
}]
