module.exports = [{
  method: 'GET',
  path: '/save-application',
  options: {
    handler: async (request, h) => {
      const url = new URL(request.headers.referer)
      const referer = url.pathname
      return h.view('save-application', { referer })
    }
  }
}]
