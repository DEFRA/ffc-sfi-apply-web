const cache = require('../../../cache')
const ViewModel = require('./models/add-standard-parcels')

module.exports = [
  {
    method: 'GET',
    path: '/v2/add-standard-parcels',
    handler: async (request, h) => {
      const applyJourney = await cache.get('apply-journey', request.yar.id)
      const parcels = applyJourney.selectedStandard.parcels

      /* const checkboxItems = parcels.reduce((acc, cur) => {
        cur.forEach((cover, i) => acc.push({
          value: `${cur.id}_${i}`,
          text: `Parcel ${cur.id} : ${Number(cover.area).toFixed(2)}ha`
        }))
        return acc
      }, []) */

      const checkboxItems = parcels.map(x => {
        return {
          text: `Parcel ${x.id} : ${Number(x.area).toFixed(2)}ha`,
          value: `${x.id}`
        }
      })

      const totalHa = parcels.reduce((acc, cur) => acc + cur.area, 0)

      return h.view(
        'v2/add-standard-parcels/add-standard-parcels',
        ViewModel(checkboxItems, totalHa, applyJourney.selectedSbi.sbi, applyJourney.selectedStandard.name)
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
