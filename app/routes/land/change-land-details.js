
module.exports =
  {
    method: 'GET',
    path: '/change-land-details',
    options: {
      handler: async (request, h) => {
        return h.view('land/change-land-details')
      }
    }
  }
