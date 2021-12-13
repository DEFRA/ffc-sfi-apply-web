const config = require('../config').cookieConfig

module.exports = {
  plugin: {
    name: 'auth',
    register: (server, options) => {
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
        redirectTo: '/sign-in',
        validateFunc: async (request, session) => {
          const cached = await server.app.cache.get(session.sid)
          const out = {
            valid: !!cached
          }
          if (out.valid) {
            // TODO: replace with Defra Customer account
            out.credentials = { name: 'A Farmer' }
          }

          return out
        }
      })
      server.auth.default({ strategy: 'session', mode: 'required' })
    }
  }
}
