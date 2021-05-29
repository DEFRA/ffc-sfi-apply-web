const getPollingResponse = require('../../polling')

module.exports = [{
  method: 'GET',
  path: '/check-eligibility/eligible',
  options: {
    handler: async (request, h) => {
      const response = await getPollingResponse(request.yar.id, '/eligibility')
      if (response) {
        console.info('Eligibility result received', response)
        return h.view('check-eligibility/eligible')
      }
      return h.view('no-response')
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
