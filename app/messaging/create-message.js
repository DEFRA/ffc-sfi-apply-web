function createMessage (body, type) {
  return {
    body,
    type,
    source: 'ffc-sfi-apply-web'
  }
}

module.exports = createMessage
