const createMessage = (body, type, options) => {
  return {
    body,
    type,
    source: 'ffc-sfi-apply-web',
    ...options
  }
}

module.exports = createMessage
