const { createSession } = require('../create-session')

const validateToken = async (decoded, request, _h) => {
  await createSession(request, decoded.sessionId, decoded.contactId)
  return { isValid: true, credentials: { scope: decoded.roles, name: 'Andrew Shaughnessy', sessionId: decoded.sessionId, crn: decoded.contactId } }
}

module.exports = {
  validateToken
}
