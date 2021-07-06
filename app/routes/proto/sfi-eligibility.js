module.exports = [
  {
    method: 'GET',
    path: '/proto/sfi-eligibility',
    handler: async (request, h) => {
      return h.view('proto/sfi-eligibility')
    }
  },
  {
    method: 'POST',
    path: '/proto/sfi-eligibility',
    handler: async (request, h) => {
      return h.redirect('/proto/choose-std')
    }
  }
]
