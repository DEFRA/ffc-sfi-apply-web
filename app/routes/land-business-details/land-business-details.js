module.exports = {
  method: 'GET',
  path: '/land-business-details',
  options: {
    handler: async (request, h) => {
      const sbi = request.query.sbi
      return h.view('land-business-details/land-business-details', { sbi })
    }
  }
}
