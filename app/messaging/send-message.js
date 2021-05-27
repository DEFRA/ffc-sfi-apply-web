const { MessageSender } = require('ffc-messaging')
const createMessage = require('./create-message')

async function sendMessage (body, type, options) {
  const message = createMessage(body, type)
  const paymentSender = new MessageSender(options)
  await paymentSender.sendMessage(message)
  await paymentSender.closeConnection()
}

module.exports = sendMessage
