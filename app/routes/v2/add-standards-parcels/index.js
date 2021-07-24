const cache = require('../../../cache')

module.exports = [
  {
    method: 'GET',
    path: '/v2/add-standard-parcels',
    handler: async (request, h) => {
      const applyJourney = await cache.get('apply-journey', request.yar.id)
      const parcels = applyJourney.selectedStandard.parcels

      const checkboxItems = parcels.map(x => {
        return {
          text: `Parcel ${x.id} : ${Number(x.area).toFixed(2)}ha of ${applyJourney.selectedStandard.name}`,
          value: `${x.id}`,
          warnings: []
        }
      })

      checkboxItems[0].warnings.push({ SSSI: true }, { HEFER: true }, { SFI: true })
      checkboxItems[1].warnings.push({ SSSI: true }, { HEFER: true }, { SFI: false })

      const totalHa = parcels.reduce((acc, cur) => acc + cur.area, 0)

      return h.view(
        'v2/add-standard-parcels/add-standard-parcels',
        {
          checkboxItems: checkboxItems,
          totalHa: Number(totalHa).toFixed(2),
          sidebarItems: [`SBI: ${applyJourney.selectedSbi.sbi}`, `Standard: ${applyJourney.selectedStandard.name}`]
        }
      )
    }
  },
  {
    method: 'POST',
    path: '/v2/add-standard-parcels',
    handler: async (request, h) => {
      const parcels = require('./data/107023903-arable-eligible.json')
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
