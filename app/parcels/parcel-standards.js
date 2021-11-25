const cache = require('../cache')
const { sendParcelStandardMessage, receiveParcelStandardMessage } = require('../messaging')
const { v4: uuidv4 } = require('uuid')
const util = require('util')

const getParcelStandards = async (request, error) => {
  const agreement = await cache.get('agreement', request.yar.id)
  const application = agreement?.application
  let parcelStandards = application.parcelStandards
  if (error && parcelStandards) {
    return { application, parcelStandards }
  } else {
    parcelStandards = await sendParcelStandardRequest(application, request, parcelStandards)
    await cache.update('agreement', request.yar.id, { application: { parcelStandards } })
  }
  return { application, parcelStandards }
}

const sendParcelStandardRequest = async (application, request, parcelStandards) => {
  const messageId = uuidv4()

  const sbi = application.selectedOrganisation.sbi
  const callerId = application.callerId
  const organisationId = application.selectedOrganisation.organisationId
  const standardCode = application.selectedStandard.code

  await sendParcelStandardMessage({ sbi, callerId, organisationId, standardCode }, request.yar.id, messageId)

  const response = await receiveParcelStandardMessage(messageId)

  if (response) {
    console.info('Parcel Standards request received:', util.inspect(response, false, null, true))
    parcelStandards = response
  }

  return parcelStandards
}

module.exports = getParcelStandards
