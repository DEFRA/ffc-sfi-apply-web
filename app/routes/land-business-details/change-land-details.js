
module.exports =
  {
    method: 'GET',
    path: '/change-land-details',
    options: {
      handler: async (request, h) => {
        h.view('./land-business-details/change-land-details')
      }
    }
  }
