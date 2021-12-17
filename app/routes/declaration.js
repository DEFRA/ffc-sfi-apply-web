const { submit } = require('../agreement')

module.exports = [{
  method: 'GET',
  path: '/declaration',
  options: {
    handler: async (request, h) => {
      return h.view('declaration')
    }
  }
},
{
  method: 'POST',
  path: '/declaration',
  options: {
    handler: async (request, h) => {
      await submit(request)
      return h.redirect('/confirmation')
    }
  }
}]
