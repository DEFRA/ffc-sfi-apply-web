module.exports = [{
  method: 'GET',
  path: '/confirmation',
  options: {
    handler: async (request, h) => {
      return h.view('confirmation')
    }
  }
}]
