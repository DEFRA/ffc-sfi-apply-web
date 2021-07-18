const crownHosting = require('./crown-hosting-interface')

function viewModel (sbi) {
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
    },
    sidebarItems: [`SBI: ${sbi}`]
  }
}

module.exports = [
  {
    method: 'GET',
    path: '/proto/choose-std',
    handler: async (request, h) => {
      await crownHosting.getParcelCovers(
        request.yar.get('callerId'),
        request.yar.get('chosen-org-id')
      )
      return h.view('proto/choose-std', viewModel(request.yar.get('proto-sbi')))
    }
  },
  {
    method: 'POST',
    path: '/proto/choose-std',
    handler: async (request, h) => {
      request.yar.set('proto-std', request.payload.std)
      return h.redirect('/proto/add-std-parcels')
    }
  }
]
