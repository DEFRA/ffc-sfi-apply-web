const cache = require('./cache')
const { sendEligibilityCheckMessage, receiveEligibilityResponseMessage } = require('./messaging')
const { v4: uuidv4 } = require('uuid')

const getEligibility = async (request, error) => {
  const applyJourney = await cache.get('apply-journey', request.yar.id)
  let eligibility = applyJourney.eligibility
  if (error && eligibility) {
    return { applyJourney, eligibility }
  } else {
    eligibility = await sendEligibilityRequest(applyJourney, request, eligibility)
    await cache.update('apply-journey', request.yar.id, { eligibleOrganisations: eligibility })
  }

  return { applyJourney, eligibility }
}

const sendEligibilityRequest = async (applyJourney, request, eligibility) => {
  const messageId = uuidv4()
  await sendEligibilityCheckMessage({ crn: applyJourney.crn, callerId: applyJourney.callerId }, request.yar.id, messageId)

  const response = await receiveEligibilityResponseMessage(messageId)

  if (response) {
    console.info('Eligibility request received', response)
    eligibility = response.eligibility
  }

  return eligibility
}

module.exports = getEligibility
