module.exports = [{
  method: 'GET',
  path: '/check-eligibility/bps',
  options: {
    handler: (request, h) => {
      return h.view('check-eligibility/bps')
    }
  }
},
{
  method: 'POST',
  path: '/check-eligibility/bps',
  options: {
    handler: async (request, h) => {
      return h.redirect('land-types')
    }
  }
}]
