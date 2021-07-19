const crownHosting = require('./crown-hosting-interface')

function viewModel (sbi, details) {
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
    sidebarItems: [`SBI: ${sbi}`],
    details
  }
}

module.exports = [
  {
    method: 'GET',
    path: '/proto/choose-std',
    handler: async (request, h) => {
      const parcelCovers = await crownHosting.getParcelCovers(
        request.yar.get('callerId'),
        request.yar.get('chosen-org-id')
      )

      const getParcelsByCode = (code) => parcelCovers.filter(parcel => parcel.info.find(info => info.code === code && info.area > 0))
      const grasslandParcels = getParcelsByCode('130')
      const arableParcels = getParcelsByCode('110')

      const details = `
        Customer has ${parcelCovers.length} parcels<br/>
        ${grasslandParcels.length} parcels have grassland<br/>
        ${arableParcels.length} parcels have arable
        `

      return h.view('proto/choose-std', viewModel(request.yar.get('chosen-sbi'), details))
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
