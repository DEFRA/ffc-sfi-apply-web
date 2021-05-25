module.exports = {
  method: 'GET',
  path: '/change-land-business-details',
  options: {
    handler: async (request, h) => {  
      return h.view('land-business-details/change-land-business-details')
    }
  }
}