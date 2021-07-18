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
      console.log('ORG DETAIS:')
      console.log(JSON.stringify(orgDetails, null, 2))
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
