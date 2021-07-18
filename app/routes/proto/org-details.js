const crownHosting = require('./crown-hosting-interface')

module.exports = [
  {
    method: 'GET',
    path: '/proto/org-details',
    handler: async (request, h) => {
      const orgDetails = await crownHosting.getOrgDetails(
        request.yar.get('callerId'),
        request.yar.get('chosen-org-id')
      )
      return h.view('proto/org-details', orgDetails)
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
