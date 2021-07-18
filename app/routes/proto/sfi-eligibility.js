const crownHosting = require('./crown-hosting-interface')

module.exports = [
  {
    method: 'GET',
    path: '/proto/sfi-eligibility',
    handler: async (request, h) => {
      const callerId = request.yar.get('callerId')

      const newSitiAPIEligible = await crownHosting.checkEligibilityNewSitiAPI(callerId, request.yar.get('chosen-sbi'))
      const oldSitiAPIEligible = await crownHosting.checkEligibilityOldSitiAPI(callerId, request.yar.get('chosen-org-id'))

      console.log(`newSitiAPIEligible: ${newSitiAPIEligible}`)
      console.log(`oldSitiAPIEligible: ${oldSitiAPIEligible}`)

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
