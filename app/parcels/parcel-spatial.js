const cache = require('../cache')
const { sendParcelSpatialMessage, recieveParcelSpatialMessage } = require('../messaging')
const { v4: uuidv4 } = require('uuid')

const getParcelSpatial = async (request, error) => {
  const applyJourney = await cache.get('agreement', request.yar.id)
  let parcelSpatial = applyJourney.parcelSpatial
  if (error && parcelSpatial) {
    return { applyJourney, parcelSpatial }
  } else {
    parcelSpatial = await sendParcelSpatialRequest(applyJourney, request, parcelSpatial)
    await cache.update('agreement', request.yar.id, { parcelSpatial })
  }
  return { applyJourney, parcelSpatial }
}

const sendParcelSpatialRequest = async (applyJourney, request, parcelSpatial) => {
  const messageId = uuidv4()

  const sbi = applyJourney.selectedOrganisation.sbi
  const callerId = applyJourney.callerId
  const organisationId = applyJourney.selectedOrganisation.organisationId

  await sendParcelSpatialMessage({ sbi, callerId, organisationId }, request.yar.id, messageId)

  const response = await recieveParcelSpatialMessage(messageId)

  if (response) {
    console.info('Parcel Spatial request received', response)
    parcelSpatial = response
  }

  return parcelSpatial
}

module.exports = getParcelSpatial
