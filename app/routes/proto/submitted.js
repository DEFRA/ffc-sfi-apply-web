module.exports = [
  {
    method: 'GET',
    path: '/proto/submitted',
    handler: async (request, h) => {
      return h.view('proto/submitted')
    }
  }
]
