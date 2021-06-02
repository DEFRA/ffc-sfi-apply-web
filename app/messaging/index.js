const sendMessage = require('./send-message')
const config = require('../config')

async function sendEligibilityCheckMessage (payload, correlationId) {
  await sendMessage(payload, 'uk.gov.sfi.eligibility.check', correlationId, config.eligibilityTopic)
  console.info('Eligibility check requested')
}

async function sendStandardsRequestMessage (payload, correlationId) {
  await sendMessage(payload, 'uk.gov.sfi.standards.request', correlationId, config.standardsTopic)
  console.info('Available standards requested')
}

async function sendAgreementValidateMessage (payload, correlationId) {
  await sendMessage(payload, 'uk.gov.sfi.agreement.validate', correlationId, config.validateTopic)
  console.info('Agreement validation requested')
}

async function sendAgreementCalculateMessage (payload, correlationId) {
  await sendMessage(payload, 'uk.gov.sfi.agreement.calculate', correlationId, config.calculateTopic)
  console.info('Agreement calculation requested')
}

async function sendAgreementSubmitMessage (payload, correlationId) {
  await sendMessage(payload, 'uk.gov.sfi.agreement.submit', correlationId, config.submitTopic)
  console.info('Agreement submitted')
}

module.exports = {
  sendEligibilityCheckMessage,
  sendStandardsRequestMessage,
  sendAgreementValidateMessage,
  sendAgreementCalculateMessage,
  sendAgreementSubmitMessage
}
