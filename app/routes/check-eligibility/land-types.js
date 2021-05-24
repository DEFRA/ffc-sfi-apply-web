module.exports = [{
  method: 'GET',
  path: '/check-eligibility/land-types',
  options: {
    handler: (request, h) => {
      return h.view('check-eligibility/land-types')
    }
  }
},
{
  method: 'POST',
  path: '/check-eligibility/land-types',
  options: {
    handler: async (request, h) => {
      return h.redirect('farming-pilot')
    }
  }
}]
