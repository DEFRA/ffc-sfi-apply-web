const sendMessage = require('./send-message')
const receiveMessage = require('./receive-message')
const config = require('../config')

async function sendEligibilityCheckMessage (payload, correlationId, messageId) {
  await sendMessage(payload, 'uk.gov.sfi.eligibility.check', correlationId, config.eligibilityTopic, messageId)
  console.info('Eligibility check requested')
}

async function sendStandardsRequestMessage (payload, correlationId, messageId) {
  await sendMessage(payload, 'uk.gov.sfi.standards.request', correlationId, config.standardsTopic, messageId)
  console.info('Available standards requested')
}

async function sendAgreementValidateMessage (payload, correlationId) {
  await sendMessage(payload, 'uk.gov.sfi.agreement.validate', correlationId, config.validateTopic)
  console.info('Agreement validation requested')
}

async function sendAgreementCalculateMessage (payload, correlationId, messageId) {
  await sendMessage(payload, 'uk.gov.sfi.agreement.calculate', correlationId, config.calculateTopic, messageId)
  console.info('Agreement calculation requested')
}

async function sendAgreementSubmitMessage (payload, correlationId) {
  await sendMessage(payload, 'uk.gov.sfi.agreement.submit', correlationId, config.submitTopic)
  console.info('Agreement submitted')
}

async function sendAgreementWithdrawMessage (payload, correlationId) {
  await sendMessage(payload, 'uk.gov.sfi.agreement.withdraw', correlationId, config.withdrawTopic)
  console.info('Agreement withdrawn')
}

async function sendRequestSBIMessage (payload, correlationId) {
  await sendMessage(payload, 'uk.gov.sfi.sbi.request', correlationId, config.requestSBITopic)
  console.info('SBI(s) requested')
}

async function sendParcelSpatialMessage (payload, correlationId, messageId) {
  await sendMessage(payload, 'uk.gov.sfi.parcel.spatial.request', correlationId, config.parcelSpatialTopic, messageId)
  console.info('parcel spatial data requested')
}

async function recieveParcelSpatialMessage (messageId) {
  return receiveMessage(messageId, config.responseParcelSpatialQueue)
}

async function receiveStandardsResponseMessage (messageId) {
  return receiveMessage(messageId, config.responseStandardsQueue)
}

async function receiveEligibilityResponseMessage (messageId) {
  return receiveMessage(messageId, config.responseEligibilityQueue)
}

async function receiveCalculateResponseMessage (messageId) {
  return receiveMessage(messageId, config.responseCalculateQueue)
}

module.exports = {
  sendEligibilityCheckMessage,
  sendStandardsRequestMessage,
  sendAgreementValidateMessage,
  sendAgreementCalculateMessage,
  sendAgreementSubmitMessage,
  sendAgreementWithdrawMessage,
  sendRequestSBIMessage,
  sendParcelSpatialMessage,
  recieveParcelSpatialMessage,
  receiveStandardsResponseMessage,
  receiveCalculateResponseMessage,
  receiveEligibilityResponseMessage
}
