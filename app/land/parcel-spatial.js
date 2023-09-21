const cache = require('../cache')
const config = require('../config')
const { sendMessage, receiveMessage } = require('../messaging')
const { v4: uuidv4 } = require('uuid')
const util = require('util')
const { AUTH_COOKIE_NAME } = require('../constants/cookies')

const getParcelSpatial = async (request) => {
  const { agreement, crn, data } = await cache.get(request)
  const { organisation } = agreement
  let land = data.land
  if (land) {
    return land
  }
  land = await requestParcelSpatial(organisation, crn, request.state[AUTH_COOKIE_NAME], request.auth.credentials.sessionId, land)
  await cache.update(request, { data: { land } })
  return land
}

const requestParcelSpatial = async (organisation, crn, token, correlationId, parcelSpatial) => {
  const messageId = uuidv4()
  const { sbi, organisationId } = organisation
  const body = { sbi, crn, token, organisationId }

  await sendMessage(body, 'uk.gov.sfi.parcel.spatial.request', config.parcelSpatialTopic, { correlationId, messageId })
  console.log('Parcel spatial request sent:', util.inspect(body, false, null, true))

  const response = await receiveMessage(messageId, config.responseParcelSpatialQueue)

  if (response) {
    console.info('Parcel spatial response received:', util.inspect(response, false, null, true))
    return response
  }
}

module.exports = getParcelSpatial
