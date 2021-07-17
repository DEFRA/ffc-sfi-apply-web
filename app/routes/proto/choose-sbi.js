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
      return h.view('proto/choose-sbi', viewModel(sbis))
    }
  },
  {
    method: 'POST',
    path: '/proto/choose-sbi',
    handler: async (request, h) => {
      request.yar.set('proto-sbi', request.payload.sbi)
      return h.redirect('/proto/org-details')
    }
  }
]
