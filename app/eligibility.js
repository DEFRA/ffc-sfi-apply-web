const cache = require('./cache')
const { sendEligibilityCheckMessage, receiveEligibilityResponseMessage } = require('./messaging')
const { v4: uuidv4 } = require('uuid')

const getEligibility = async (request, error) => {
  const agreement = await cache.get(request)
  const application = agreement?.application
  let eligibility = application.eligibility
  if (error && eligibility) {
    return { application, eligibility }
  } else {
    eligibility = await sendEligibilityRequest(application, request, eligibility)
    await cache.update(request, { application: { eligibleOrganisations: eligibility } })
  }

  return { agreement, eligibility }
}

const sendEligibilityRequest = async (agreement, request, eligibility) => {
  const messageId = uuidv4()
  await sendEligibilityCheckMessage({ crn: agreement.crn, callerId: agreement.callerId }, request.yar.id, messageId)

  const response = await receiveEligibilityResponseMessage(messageId)

  if (response) {
    console.info('Eligibility request received', response)
    eligibility = response.eligibility
  }

  return eligibility
}

module.exports = getEligibility
