const cache = require('../../../cache')
const { sendStandardsRequestMessage, receiveStandardsResponseMessage } = require('../../../messaging')
const { v4: uuidv4 } = require('uuid')
const util = require('util')

const getAllStandards = async (request, error) => {
  const agreement = await cache.get(request)
  const application = agreement.application
  let standards = application.standards
  if (error && standards) {
    return { application, standards }
  }
  standards = await sendStandardsRequest(application, request, standards)
  return { application, standards }
}

const sendStandardsRequest = async (application, request, standards) => {
  const messageId = uuidv4()
  await sendStandardsRequestMessage({
    sbi: application.selectedOrganisation.sbi,
    organisationId: application.selectedOrganisation.organisationId,
    callerId: application.callerId
  }, request.yar.id, messageId)

  const response = await receiveStandardsResponseMessage(messageId)

  if (response) {
    console.info('Standards request received:', util.inspect(response, false, null, true))
    await cache.update(request, { application: { standards: response.standards } })
    standards = response.standards
  }

  return standards
}

module.exports = getAllStandards
