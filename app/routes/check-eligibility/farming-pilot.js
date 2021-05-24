module.exports = [{
  method: 'GET',
  path: '/check-eligibility/farming-pilot',
  options: {
    handler: (request, h) => {
      return h.view('check-eligibility/farming-pilot')
    }
  }
},
{
  method: 'POST',
  path: '/check-eligibility/farming-pilot',
  options: {
    handler: async (request, h) => {
      return h.redirect('eligible')
    }
  }
}]
