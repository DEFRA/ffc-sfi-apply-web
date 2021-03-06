const cache = require('../cache')
const config = require('../config')
const { sendMessage, receiveMessage } = require('../messaging')
const { v4: uuidv4 } = require('uuid')
const util = require('util')

const getFunding = async (request) => {
  const { data, agreement, callerId } = await cache.get(request)
  const { organisation } = agreement
  let { eligibleFunding } = data
  if (eligibleFunding) {
    return eligibleFunding
  }
  eligibleFunding = await requestEligibleFunding(organisation, callerId, request.state.ffc_sfi_identity.sid)
  await cache.update(request, { data: { eligibleFunding } })
  return eligibleFunding
}

const requestEligibleFunding = async (organisation, callerId, correlationId) => {
  const messageId = uuidv4()
  const { sbi, organisationId } = organisation
  const body = { sbi, callerId, organisationId }

  await sendMessage(body, 'uk.gov.sfi.standard.request', config.standardsTopic, { correlationId, messageId })
  console.info('Standards request send:', util.inspect(body, false, null, true))

  const response = await receiveMessage(messageId, config.responseStandardsQueue)

  if (response) {
    console.info('Standards response received:', util.inspect(response, false, null, true))
    return response.standards
  }
}

module.exports = getFunding
