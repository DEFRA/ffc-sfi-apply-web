const cache = require('../../../cache')
const { sendStandardsRequestMessage } = require('../../../messaging')
const getPollingResponse = require('../../../polling')

const getAllStandards = async (request, error) => {
  const applyJourney = await cache.get('apply-journey', request.yar.id)
  let standards = applyJourney.standards
  if (error && standards) {
    return { applyJourney, standards }
  } else {
    standards = await sendStandardsRequest(applyJourney, request, standards)
  }

  return { applyJourney, standards }
}

const sendStandardsRequest = async (applyJourney, request, standards) => {
  await sendStandardsRequestMessage({ sbi: applyJourney.selectedSbi.sbi, organisationId: applyJourney.selectedSbi.organisationId, callerId: applyJourney.callerId }, request.yar.id)
  const response = await getPollingResponse(request.yar.id, '/standards')
  if (response) {
    console.info('Standards request received', response)
    await cache.update('apply-journey', request.yar.id, { standards: response.standards })
    standards = response.standards
  }

  return standards
}

module.exports = getAllStandards
