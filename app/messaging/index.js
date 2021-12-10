const sendMessage = require('./send-message')
const receiveMessage = require('./receive-message')
const config = require('../config')

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

async function sendParcelStandardMessage (payload, correlationId, messageId) {
  await sendMessage(payload, 'uk.gov.sfi.parcel.standard.request', correlationId, config.parcelStandardTopic, messageId)
  console.info('parcel standard requested')
}

async function receiveParcelStandardMessage (messageId) {
  return receiveMessage(messageId, config.responseParcelStandardQueue)
}

async function receiveCalculateResponseMessage (messageId) {
  return receiveMessage(messageId, config.responseCalculateQueue)
}

module.exports = {
  sendAgreementValidateMessage,
  sendAgreementCalculateMessage,
  sendAgreementSubmitMessage,
  sendAgreementWithdrawMessage,
  sendParcelStandardMessage,
  receiveParcelStandardMessage,
  receiveCalculateResponseMessage,
  sendMessage,
  receiveMessage
}
