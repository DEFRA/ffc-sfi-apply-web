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
          isHttpOnly: config.isHttpOnly,
          path: '/'
        },
        keepAlive: true,
        redirectTo: '/login',
        validateFunc: async (request, session) => {
          const sessionCache = await request.server.app.cache.get(session.sid)
          const valid = !!sessionCache
          const result = { valid }
          if (valid) {
            // TODO: replace with Defra Customer account
            result.credentials = { name: 'A Farmer' }
          } else {
            console.log(`Session has no cache: ${session.sid}`)
          }

          return result
        }
      })
      server.auth.default({ strategy: 'session', mode: 'required' })
    }
  }
}
