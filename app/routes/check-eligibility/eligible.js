module.exports = [{
  method: 'GET',
  path: '/check-eligibility/eligible',
  options: {
    handler: (request, h) => {
      return h.view('check-eligibility/eligible')
    }
  }
},
{
  method: 'POST',
  path: '/check-eligibility/eligible',
  options: {
    handler: async (request, h) => {
      return h.redirect('/application-task-list')
    }
  }
}]
