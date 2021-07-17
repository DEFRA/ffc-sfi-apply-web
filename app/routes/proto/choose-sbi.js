const crownHosting = require('./crown-hosting-interface')

function viewModel (sbis) {
  return {
    radios: {
      name: 'sbi',
      fieldset: {
        legend: {
          text: 'Choose your SBI',
          isPageHeading: true,
          classes: 'govuk-fieldset__legend--l'
        }
      },
      items: sbis ? sbis.map(sbi => ({ value: sbi, text: sbi })) : []
    }
  }
}

module.exports = [
  {
    method: 'GET',
    path: '/proto/choose-sbi',
    handler: async (request, h) => {
      const sbis = await crownHosting.getSBIs(request.yar.get('callerId'))
      request.yar.set('sbis', sbis)
      console.log(JSON.stringify(sbis, null, 2))
      return h.view('proto/choose-sbi', viewModel(sbis))
    }
  },
  {
    method: 'POST',
    path: '/proto/choose-sbi',
    handler: async (request, h) => {
      const chosenSBI = request.payload.sbi
      request.yar.set('chosen-sbi', chosenSBI)
      request.yar.set('chosen-org-id', request.yar.get('sbis').find(s => s.sbi === chosenSBI).organisationId)

      console.log(`Chosen SBI = ${request.yar.get('chosen-sbi')}`)
      console.log(`Chosen Org ID = ${request.yar.get('chosen-org-id')}`)
      return h.redirect('/proto/org-details')
    }
  }
]
