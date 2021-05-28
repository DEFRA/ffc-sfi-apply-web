function createMessage (body, type) {
  return {
    body,
    type,
    source: 'ffc-sfi-apply-web',
    correlationId: 'f34dfc96-865b-4116-917a-3d6db2231479'
  }
}

module.exports = createMessage
