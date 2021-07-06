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
    path: '/proto/choose-sbi',
    handler: async (request, h) => {
      return h.view('proto/choose-sbi', viewModel())
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
