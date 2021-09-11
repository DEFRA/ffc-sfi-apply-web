function createMessage (body, type, correlationId, messageId = null) {
  return {
    body,
    type,
    source: 'ffc-sfi-apply-web',
    correlationId,
    messageId
  }
}

module.exports = createMessage
