const cache = require('../cache')
const ignoreRoutes = ['/sign-in', '/healthy', '/healthz', '/', '/cookies']

module.exports = {
  plugin: {
    name: 'cache-check',
    register: async (server, options) => {
      server.ext('onPreResponse', async (request, h) => {
        const agreement = await cache.get('agreement', request.yar.id)
        if (!ignoreRoutes.includes(request.path)) {
          if (!agreement?.callerId) {
            console.log('redirecting to sign-in')
            return h.redirect('/sign-in')
          }
        }
        return h.continue
      })
    }
  }
}
