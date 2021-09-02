const cache = require('../cache')

module.exports = [{
  method: 'GET',
  path: '/declaration',
  options: {
    handler: async (request, h) => {
      return h.view('submit-application')
    }
  }
},
{
  method: 'POST',
  path: '/declaration',
  options: {
    handler: async (request, h) => {
      await cache.update('progress', request.yar.id, {
        progress: { submitted: true }
      })
      return h.redirect('/confirmation')
    }
  }
}]
