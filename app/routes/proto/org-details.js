module.exports = [
  {
    method: 'GET',
    path: '/proto/org-details',
    handler: async (request, h) => {
      return h.view('proto/org-details')
    }
  },
  {
    method: 'POST',
    path: '/proto/org-details',
    handler: async (request, h) => {
      return h.redirect('/proto/sfi-eligibility')
    }
  }
]
