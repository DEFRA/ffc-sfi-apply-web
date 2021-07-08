function viewModel () {
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
      items: [
        {
          value: '106336339',
          text: '106336339'
        },
        {
          value: '106651310',
          text: '106651310'
        }
      ]
    }
  }
}

module.exports = [
  {
    method: 'GET',
    path: '/v2/choose-sbi',
    handler: async (request, h) => {
      return h.view('v2/choose-sbi/choose-sbi', viewModel())
    }
  },
  {
    method: 'POST',
    path: '/v2/choose-sbi',
    handler: async (request, h) => {
      // request.yar.set('-sbi', request.payload.sbi)
      return h.redirect('/v2/org-details')
    }
  }
]
