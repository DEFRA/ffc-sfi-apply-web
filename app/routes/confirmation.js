module.exports = [{
  method: 'GET',
  path: '/confirmation',
  options: {
    auth: { strategy: 'jwt' },
    handler: async (request, h) => {
      return h.view('confirmation')
    }
  }
},
{
  method: 'POST',
  path: '/confirmation',
  options: {
    auth: { strategy: 'jwt' },
    handler: async (request, h) => {
      return h.redirect('/arable-soils/payment-schedule')
    }
  }
}]
