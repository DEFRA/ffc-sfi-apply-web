const config = require('../config').cookieConfig

module.exports = {
  plugin: {
    name: 'auth',
    register: async (server, options) => {
      server.auth.strategy('session', 'cookie', {
        cookie: {
          name: 'ffc_sfi_identity',
          password: config.password,
          ttl: 1000 * 60 * 60 * 24 * 3, // 3 days
          isSameSite: config.isSameSite,
          isSecure: config.isSecure,
          isHttpOnly: config.isHttpOnly
        },
        keepAlive: true,
        redirectTo: '/login',
        validateFunc: async (request, session) => {
          const sessionCache = await request.server.app.cache.get(session.sid)
          const valid = !!sessionCache
          if (!valid) {
            console.log(`Session has no cache: ${session.sid}`)
          }
          const result = { valid }
          if (result.valid) {
            // TODO: replace with Defra Customer account
            result.credentials = { name: 'A Farmer' }
          }

          return result
        }
      })
      server.auth.default({ strategy: 'session', mode: 'required' })
    }
  }
}
