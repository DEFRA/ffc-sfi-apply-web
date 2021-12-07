const cache = require('../cache')
const { sendParcelSpatialMessage, receiveParcelSpatialMessage } = require('../messaging')
const { v4: uuidv4 } = require('uuid')

const getParcelSpatial = async (request, error) => {
  const agreement = await cache.get(request)
  const application = agreement?.application
  let parcelSpatial = application.parcelSpatial
  if (error && parcelSpatial) {
    return { application, parcelSpatial }
  } else {
    parcelSpatial = await sendParcelSpatialRequest(application, request, parcelSpatial)
    await cache.update(request, { application: { parcelSpatial } })
  }
  return { application, parcelSpatial }
}

const sendParcelSpatialRequest = async (applyJourney, request, parcelSpatial) => {
  const messageId = uuidv4()

  const sbi = applyJourney.selectedOrganisation.sbi
  const callerId = applyJourney.callerId
  const organisationId = applyJourney.selectedOrganisation.organisationId

  await sendParcelSpatialMessage({ sbi, callerId, organisationId }, request.yar.id, messageId)

  const response = await receiveParcelSpatialMessage(messageId)

  if (response) {
    console.info('Parcel Spatial request received', response)
    parcelSpatial = response
  }

  return parcelSpatial
}

module.exports = getParcelSpatial
