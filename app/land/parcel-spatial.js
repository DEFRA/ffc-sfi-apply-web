const cache = require('../cache')
const config = require('../config')
const { sendMessage, receiveMessage } = require('../messaging')
const { v4: uuidv4 } = require('uuid')
const util = require('util')

const getParcelSpatial = async (request) => {
  const { agreement, callerId, data } = await cache.get(request)
  const { organisation } = agreement
  let land = data.land
  if (land) {
    return land
  }
  land = await requestParcelSpatial(organisation, callerId, request.state.ffc_sfi_identity.sid, land)
  await cache.update(request, { data: { land } })
  return land
}

const requestParcelSpatial = async (organisation, callerId, correlationId, parcelSpatial) => {
  const messageId = uuidv4()
  const { sbi, organisationId } = organisation
  const body = { sbi, callerId, organisationId }

  await sendMessage(body, 'uk.gov.sfi.parcel.spatial.request', config.parcelSpatialTopic, { correlationId, messageId })
  console.log('Parcel spatial request sent:', util.inspect(body, false, null, true))

  const response = await receiveMessage(messageId, config.responseParcelSpatialQueue)

  if (response) {
    console.info('Parcel spatial response received', util.inspect(response, false, null, true))
    return response
  }
}

module.exports = getParcelSpatial
