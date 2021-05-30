const getPollingResponse = require('../../polling')

module.exports = [{
  method: 'GET',
  path: '/funding-options/application-value',
  options: {
    handler: async (request, h) => {
      const response = await getPollingResponse(request.yar.id, '/calculate')
      if (response) {
        console.info('Calculation result received', response)
        return h.view('funding-options/application-value')
      }
      return h.view('no-response')
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
