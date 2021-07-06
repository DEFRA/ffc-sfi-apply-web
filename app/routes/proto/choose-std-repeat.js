function viewModel () {
  return {
    radios: {
      name: 'std',
      fieldset: {
        legend: {
          text: 'Choose a standard',
          isPageHeading: true,
          classes: 'govuk-fieldset__legend--l'
        }
      },
      items: [
        {
          value: 'arable',
          text: 'Arable Soils'
        },
        {
          value: 'grassland',
          text: 'Grassland Soils'
        }
      ]
    }
  }
}

module.exports = [
  {
    method: 'GET',
    path: '/proto/choose-std-repeat',
    handler: async (request, h) => {
      return h.view('proto/choose-std-repeat', viewModel())
    }
  },
  {
    method: 'POST',
    path: '/proto/choose-std-repeat',
    handler: async (request, h) => {
      return h.redirect('/proto/submitted')
    }
  }
]
