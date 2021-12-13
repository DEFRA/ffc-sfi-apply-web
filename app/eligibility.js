const cache = require('./cache')
const config = require('./config')
const { sendMessage, receiveMessage } = require('./messaging')
const { v4: uuidv4 } = require('uuid')
const util = require('util')

const getEligibleOrganisations = async (request) => {
  const { crn, callerId, data } = await cache.get(request)
  let eligibleOrganisations = data?.eligibleOrganisations

  if (eligibleOrganisations) {
    return eligibleOrganisations
  }

  eligibleOrganisations = await requestEligibleOrganisations(crn, callerId, request.state.ffc_sfi_identity.sid)
  await cache.update(request, { data: { eligibleOrganisations } })
  return eligibleOrganisations
}

const requestEligibleOrganisations = async (crn, callerId, correlationId, eligibility) => {
  const messageId = uuidv4()
  const body = { crn, callerId }
  await sendMessage(body, 'uk.gov.sfi.eligibility.check', config.eligibilityTopic, { correlationId, messageId })
  console.log('Eligibility request sent:', util.inspect(body, false, null, true))

  const response = await receiveMessage(messageId, config.responseEligibilityQueue)

  if (response) {
    console.info('Eligibility response received', util.inspect(response, false, null, true))
    return response.eligibility
  }
}

module.exports = getEligibleOrganisations
