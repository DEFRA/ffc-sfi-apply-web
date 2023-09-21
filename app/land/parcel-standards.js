const cache = require('../cache')
const config = require('../config')
const { sendMessage, receiveMessage } = require('../messaging')
const { v4: uuidv4 } = require('uuid')
const util = require('util')
const { AUTH_COOKIE_NAME } = require('../constants/cookies')

const getParcelStandards = async (request, standardCode) => {
  const { agreement, crn, data } = await cache.get(request)
  const { organisation } = agreement
  let eligibleStandardsSpatial = data.eligibleStandardsSpatial?.[standardCode]
  if (eligibleStandardsSpatial) {
    return eligibleStandardsSpatial
  }
  eligibleStandardsSpatial = await requestParcelStandardSpatial(organisation, crn, request.state[AUTH_COOKIE_NAME], request.auth.credentials.sessionId, standardCode)
  await cache.update(request, { data: { eligibleStandardsSpatial: { [standardCode]: eligibleStandardsSpatial } } })
  return eligibleStandardsSpatial
}

const requestParcelStandardSpatial = async (organisation, crn, token, correlationId, standardCode) => {
  const messageId = uuidv4()
  const { sbi, organisationId } = organisation
  const body = { sbi, crn, token, organisationId, standardCode }

  await sendMessage(body, 'uk.gov.sfi.parcel.standard.request', config.parcelStandardTopic, { correlationId, messageId })
  console.info('Parcel Standards request sent:', util.inspect(body, false, null, true))

  const response = await receiveMessage(messageId, config.responseParcelStandardQueue)

  if (response) {
    console.info('Parcel Standards response received:', util.inspect(response, false, null, true))
    return response
  }
}

module.exports = getParcelStandards
