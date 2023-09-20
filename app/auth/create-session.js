const createSession = async (request, sessionId, crn) => {
  const sessionCache = await request.server.app.cache.get(sessionId)
  if (!sessionCache) {
    await request.server.app.cache.set(sessionId, { crn })
    console.log(`Created session ${sessionId} for CRN ${crn}`)
  }
}

module.exports = {
  createSession
}
