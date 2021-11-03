const cache = require('../cache')
const { sendParcelStandardMessage, recieveParcelStandardMessage } = require('../messaging')
const { v4: uuidv4 } = require('uuid')

const getParcelStandards = async (request, error) => {
  const applyJourney = await cache.get('apply-journey', request.yar.id)
  let parcelStandards = applyJourney.parcelStandards
  if (error && parcelStandards) {
    return { applyJourney, parcelStandards }
  } else {
    parcelStandards = await sendParcelStandardRequest(applyJourney, request, parcelStandards)
    await cache.update('apply-journey', request.yar.id, { parcelStandards })
  }
  return { applyJourney, parcelStandards }
}

const sendParcelStandardRequest = async (applyJourney, request, parcelStandards) => {
  const messageId = uuidv4()

  const sbi = applyJourney.selectedOrganisation.sbi
  const callerId = applyJourney.callerId
  const organisationId = applyJourney.selectedOrganisation.organisationId
  const standardCode = applyJourney.selectedStandard.code

  await sendParcelStandardMessage({ sbi, callerId, organisationId, standardCode }, request.yar.id, messageId)

  const response = await recieveParcelStandardMessage(messageId)

  if (response) {
    console.info('Parcel Standards request received', response)
    parcelStandards = response
  }

  return parcelStandards
}

module.exports = getParcelStandards
