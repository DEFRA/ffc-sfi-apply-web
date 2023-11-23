const cache = require('../cache')
const config = require('../config')
const { sendMessage, receiveMessage } = require('../messaging')
const { v4: uuidv4 } = require('uuid')
const util = require('util')
const { AUTH_COOKIE_NAME } = require('../constants/cookies')

const getFunding = async (request) => {
  const { crn, data, agreement } = await cache.get(request)
  const { organisation } = agreement
  let { eligibleFunding } = data
  if (eligibleFunding) {
    return eligibleFunding
  }
  eligibleFunding = await requestEligibleFunding(organisation, crn, request.state[AUTH_COOKIE_NAME], request.auth.credentials.sessionId)
  await cache.update(request, { data: { eligibleFunding } })
  return eligibleFunding
}

const requestEligibleFunding = async (organisation, crn, token, correlationId) => {
  const messageId = uuidv4()
  const { sbi, organisationId } = organisation
  const body = { sbi, crn, token, organisationId }

  await sendMessage(body, 'uk.gov.sfi.standard.request', config.standardsTopic, { correlationId, messageId })
  console.info('Standards request send:', util.inspect(body, false, null, true))

  const response = await receiveMessage(messageId, config.responseStandardsQueue)

  if (response) {
    console.info('Standards response received:', util.inspect(response, false, null, true))
    return response.standards
  }
}

module.exports = getFunding
