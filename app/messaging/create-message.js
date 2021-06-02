function createMessage (body, type, correlationId) {
  return {
    body,
    type,
    source: 'ffc-sfi-apply-web',
    correlationId
  }
}

module.exports = createMessage
