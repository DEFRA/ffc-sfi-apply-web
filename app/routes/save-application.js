module.exports = [{
  method: 'GET',
  path: '/save-application',
  options: {
    handler: async (request, h) => {
      const referer = request.headers.referer.replace(/^[a-z]{4,5}:\/{2}[a-z]{1,}:[0-9]{1,4}.(.*)/, '$1')
      return h.view('save-application', { referer })
    }
  }
}]
