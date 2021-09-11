const { MessageSender } = require('ffc-messaging')
const createMessage = require('./create-message')

async function sendMessage (body, type, correlationId, options, messageId = null) {
  const message = createMessage(body, type, correlationId, messageId)
  const sender = new MessageSender(options)
  await sender.sendMessage(message)
  await sender.closeConnection()
}

module.exports = sendMessage
