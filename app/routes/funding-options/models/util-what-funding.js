const cache = require('../../../cache')
const { sendStandardsRequestMessage, receiveStandardsResponseMessage } = require('../../../messaging')
const { v4: uuidv4 } = require('uuid')

const getAllStandards = async (request, error) => {
  const agreement = await cache.get('agreement', request.yar.id)
  let standards = agreement.standards
  if (error && standards) {
    return { agreement, standards }
  } else {
    standards = await sendStandardsRequest(agreement, request, standards)
  }

  return { agreement, standards }
}

const sendStandardsRequest = async (agreement, request, standards) => {
  const messageId = uuidv4()
  await sendStandardsRequestMessage({ sbi: agreement.selectedOrganisation.sbi, organisationId: agreement.selectedOrganisation.organisationId, callerId: agreement.callerId }, request.yar.id, messageId)

  const response = await receiveStandardsResponseMessage(messageId)

  if (response) {
    console.info('Standards request received', response)
    await cache.update('agreement', request.yar.id, { standards: response.standards })
    standards = response.standards
  }

  return standards
}

module.exports = getAllStandards
