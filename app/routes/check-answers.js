module.exports = [{
  method: 'GET',
  path: '/check-answers',
  options: {
    handler: async (request, h) => {
      // TODO: return agreement data
      return h.view('check-answers')
    }
  }
}]
