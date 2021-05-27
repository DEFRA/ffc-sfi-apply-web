const sendMessage = require('./send-message')
const config = require('../config')

async function sendEligibilityCheckMessage (payload) {
  await sendMessage(payload, 'uk.gov.sfi.eligibility.check', config.eligibilityTopic)
  console.info('Eligibility check requested')
}

async function sendStandardsRequestMessage (payload) {
  await sendMessage(payload, 'uk.gov.sfi.standards.request', config.standardsTopic)
  console.info('Available standards requested')
}

async function sendAgreementValidateMessage (payload) {
  await sendMessage(payload, 'uk.gov.sfi.agreement.validate', config.validateTopic)
  console.info('Agreement validation requested')
}

async function sendAgreementCalculateMessage (payload) {
  await sendMessage(payload, 'uk.gov.sfi.agreement.calculate', config.calculateTopic)
  console.info('Agreement calculation requested')
}

async function sendAgreementSubmitMessage (payload) {
  await sendMessage(payload, 'uk.gov.sfi.agreement.submit', config.submitTopic)
  console.info('Agreement submitted')
}

module.exports = {
  sendEligibilityCheckMessage,
  sendStandardsRequestMessage,
  sendAgreementValidateMessage,
  sendAgreementCalculateMessage,
  sendAgreementSubmitMessage
}
