const cache = require('./cache')
const { sendEligibilityCheckMessage, receiveEligibilityResponseMessage } = require('./messaging')
const { v4: uuidv4 } = require('uuid')

const getEligibleOrganisations = async (request, error) => {
  const { crn, callerId, data } = await cache.get(request)
  let eligibleOrganisations = data?.eligibleOrganisations

  if (error && eligibleOrganisations) {
    return eligibleOrganisations
  } else {
    eligibleOrganisations = await sendEligibilityRequest(crn, callerId, request.yar.id)
    await cache.update(request, { data: { eligibleOrganisations } })
  }
  return eligibleOrganisations
}

const sendEligibilityRequest = async (crn, callerId, correlationId, eligibility) => {
  const messageId = uuidv4()
  await sendEligibilityCheckMessage({ crn, callerId }, correlationId, messageId)

  const response = await receiveEligibilityResponseMessage(messageId)

  if (response) {
    console.info('Eligibility request received', response)
    return response.eligibility
  }
}

module.exports = getEligibleOrganisations
