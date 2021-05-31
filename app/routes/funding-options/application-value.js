module.exports = [{
  method: 'GET',
  path: '/funding-options/application-value',
  options: {
    handler: (request, h) => {
      return h.view('funding-options/application-value')
    }
  }
},
{
  method: 'POST',
  path: '/funding-options/application-value',
  options: {
    handler: async (request, h) => {
      return h.redirect('/application-task-list')
    }
  }
}]
