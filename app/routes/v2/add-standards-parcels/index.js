const cache = require('../../../cache')
const { sendAgreementCalculateMessage } = require('../../../messaging')

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
      const applyJourney = await cache.get('apply-journey', request.yar.id)
      const parcels = [...new Map(applyJourney.selectedStandard.parcels.map(item => [item.id, item])).values()]

      const selectedParcels = parcels.filter(item => request.payload.parcels.includes(item.id)).map(x => {
        const object = {}

        object.id = x.id
        object.area = x.area
        return object
      })

      const parcelArea = selectedParcels.reduce((accum, item) => accum + item.area, 0)
      console.log(parcelArea)

      await cache.update('apply-journey', request.yar.id,
        {
          selectedParcels: selectedParcels,
          parcelArea: Number(parcelArea).toFixed(2)
        })

      await sendAgreementCalculateMessage(
        {
          agreementNumber: applyJourney.agreementNumber,
          callerId: applyJourney.callerId,
          code: applyJourney.selectedStandard.code,
          parcels: selectedParcels
        }, request.yar.id)

      return h.redirect('/v2/choose-level')
    }
  }
]
