const cache = require('../../../cache')
const { sendStandardsRequestMessage, receiveStandardsResponseMessage } = require('../../../messaging')
const { v4: uuidv4 } = require('uuid')

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
  const messageId = uuidv4()
  await sendStandardsRequestMessage({ sbi: applyJourney.selectedSbi.sbi, organisationId: applyJourney.selectedSbi.organisationId, callerId: applyJourney.callerId }, request.yar.id, messageId)

  const response = await receiveStandardsResponseMessage(messageId)

  if (response) {
    console.info('Standards request received', response)
    await cache.update('apply-journey', request.yar.id, { standards: response.standards })
    standards = response.standards
  }

  return standards
}

module.exports = getAllStandards
