function viewModel (checkboxItems, totalHa, sbi, std) {
  return {
    checkboxes: {
      idPrefix: 'parcels',
      name: 'parcels',
      hint: {
        text: `You have ${Number(totalHa).toFixed(2)}ha of eligible land for this standard`
      },
      fieldset: {
        legend: {
          text: 'Add parcels to standard',
          isPageHeading: true,
          classes: 'govuk-fieldset__legend--l'
        }
      },
      items: checkboxItems
    },
    sidebarItems: [`SBI: ${sbi}`, `Standard: ${std}`]
  }
}

module.exports = [
  {
    method: 'GET',
    path: '/proto/add-std-parcels',
    handler: async (request, h) => {
      const parcels = require(`./data/${request.yar.get('proto-sbi')}-${request.yar.get('proto-std')}-eligible.json`)

      const checkboxItems = parcels.reduce((acc, cur) => {
        cur.covers.forEach((cover, i) => acc.push({
          value: `${cur.id}_${i}`,
          text: `Parcel ${cur.id} : ${Number(cover.area).toFixed(2)}ha of ${cover.description}`
        }))
        return acc
      }, [])

      const totalHa = parcels.reduce((acc, cur) => acc + cur.coversArea, 0)

      return h.view(
        'proto/add-std-parcels',
        viewModel(checkboxItems, totalHa, request.yar.get('proto-sbi'), request.yar.get('proto-std'))
      )
    }
  },
  {
    method: 'POST',
    path: '/proto/add-std-parcels',
    handler: async (request, h) => {
      const parcels = require(`./data/${request.yar.get('proto-sbi')}-${request.yar.get('proto-std')}-eligible.json`)
      const selected = [request.payload.parcels].flat()
      const parcelArea = selected.reduce((acc, cur) => {
        const p = parcels.find(p => cur.startsWith(p.id))
        acc += p.covers[cur.split('_')[1]].area
        return acc
      }, 0)

      console.log(parcelArea)

      request.yar.set('proto-parcels', selected)
      request.yar.set('proto-std-area', Number(parcelArea).toFixed(2))

      return h.redirect('/proto/choose-level')
    }
  }
]
