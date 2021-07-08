module.exports = [
  {
    method: 'GET',
    path: '/v2/organisation-details',
    options: {
      handler: async (request, h) => {
        return h.view('v2/organisation-details/organisation-details')
      }
    }
  }
]
