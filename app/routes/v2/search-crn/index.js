module.exports = [{
  method: 'GET',
  path: '/v2/search-crn',
  options: {
    handler: async (request, h) => {
      return h.view('v2/search-crn/search-crn')
    }
  }
}, {
  method: 'POST',
  path: '/v2/search-crn',
  options: {
    handler: async (request, h) => {
      const crn = request.payload.crn
      console.log(crn)
      return h.redirect('choose-sbi', { crn })
    }
  }
}]
