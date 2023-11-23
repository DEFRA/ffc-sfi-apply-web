const { v4: uuidv4 } = require('uuid')
const util = require('util')
const cache = require('./cache')
const config = require('./config')
const { sendMessage, receiveMessage } = require('./messaging')
const { AUTH_COOKIE_NAME } = require('./constants/cookies')

const getEligibleOrganisations = async (request) => {
  const { crn, data } = await cache.get(request)
  let eligibleOrganisations = data?.eligibleOrganisations

  if (eligibleOrganisations) {
    return eligibleOrganisations
  }

  eligibleOrganisations = await requestEligibleOrganisations(crn, request.state[AUTH_COOKIE_NAME], request.auth.credentials.sessionId)
  await cache.update(request, { data: { eligibleOrganisations } })
  return eligibleOrganisations
}

const requestEligibleOrganisations = async (crn, token, correlationId, eligibility) => {
  const messageId = uuidv4()
  const body = { crn, token }
  await sendMessage(body, 'uk.gov.sfi.eligibility.check', config.eligibilityTopic, { correlationId, messageId })
  console.log('Eligibility request sent:', util.inspect(body, false, null, true))

  const response = await receiveMessage(messageId, config.responseEligibilityQueue)

  if (response) {
    console.info('Eligibility response received:', util.inspect(response, false, null, true))
    return response.eligibility
  }
}

module.exports = getEligibleOrganisations
