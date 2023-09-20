const cache = require('../cache')
const config = require('../config')
const { sendMessage, receiveMessage } = require('../messaging')
const { v4: uuidv4 } = require('uuid')
const util = require('util')

const getParcelStandards = async (request, standardCode) => {
  const { agreement, callerId, data } = await cache.get(request)
  const { organisation } = agreement
  let eligibleStandardsSpatial = data.eligibleStandardsSpatial?.[standardCode]
  if (eligibleStandardsSpatial) {
    return eligibleStandardsSpatial
  }
  eligibleStandardsSpatial = await requestParcelStandardSpatial(organisation, callerId, request.auth.credentials.sessionId, standardCode)
  await cache.update(request, { data: { eligibleStandardsSpatial: { [standardCode]: eligibleStandardsSpatial } } })
  return eligibleStandardsSpatial
}

const requestParcelStandardSpatial = async (organisation, callerId, correlationId, standardCode) => {
  const messageId = uuidv4()
  const { sbi, organisationId } = organisation
  const body = { sbi, callerId, organisationId, standardCode }

  await sendMessage(body, 'uk.gov.sfi.parcel.standard.request', config.parcelStandardTopic, { correlationId, messageId })
  console.info('Parcel Standards request sent:', util.inspect(body, false, null, true))

  const response = await receiveMessage(messageId, config.responseParcelStandardQueue)

  if (response) {
    console.info('Parcel Standards response received:', util.inspect(response, false, null, true))
    return response
  }
}

module.exports = getParcelStandards
