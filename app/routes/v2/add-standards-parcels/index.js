const cache = require('../../../cache')
const { sendAgreementCalculateMessage } = require('../../../messaging')
const getAllItems = require('./models/util-add-standard-parcels')

function getLandInHectares (payload, parcels) {
  const data = Object.entries(payload).map(entry => {
    const [name, value] = entry
    const [, parcelId] = name.split('_')
    if (payload.parcels && payload.parcels.includes(parcelId)) {
      const parcelArea = parcels.find(parcel => {
        return parcel.id === parcelId
      })

      return {
        id: parcelArea.id,
        value: Number(value),
        area: parcelArea.area,
        valid: value !== '' && value > 0 && value <= parcelArea.area
      }
    }
  })

  return data.filter(x => x !== undefined)
}

module.exports = [
  {
    method: 'GET',
    path: '/v2/add-standard-parcels',
    handler: async (request, h) => {
      const { applyJourney, checkboxItems, totalHa } = await getAllItems(request)

      return h.view('v2/add-standard-parcels/add-standard-parcels',
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
    options: {
      handler: async (request, h) => {
        const { payload } = request
        const { applyJourney, checkboxItems, totalHa } = await getAllItems(request)
        const parcels = applyJourney.selectedStandard.parcels
        const landInHectares = getLandInHectares(payload, parcels)
        const hasInvalidValues = landInHectares.some(element => !element.valid)

        if (landInHectares.length === 0) {
          return h.view('v2/add-standard-parcels/add-standard-parcels',
            {
              error: true,
              checkboxItems: checkboxItems,
              totalHa: Number(totalHa).toFixed(2),
              sidebarItems: [`SBI: ${applyJourney.selectedSbi.sbi}`, `Standard: ${applyJourney.selectedStandard.name}`]
            }).code(400).takeover()
        } else if (hasInvalidValues) {
          return h.view('v2/add-standard-parcels/add-standard-parcels',
            {
              invalidValues: true,
              checkboxItems: checkboxItems,
              totalHa: Number(totalHa).toFixed(2),
              sidebarItems: [`SBI: ${applyJourney.selectedSbi.sbi}`, `Standard: ${applyJourney.selectedStandard.name}`]
            }).code(400).takeover()
        } else {
          const parcelArea = landInHectares.reduce((accum, item) => accum + item.value, 0)

          await cache.update('apply-journey', request.yar.id,
            {
              selectedParcels: landInHectares,
              parcelArea: Number(parcelArea).toFixed(2)
            })

          await sendAgreementCalculateMessage(
            {
              agreementNumber: applyJourney.agreementNumber,
              callerId: applyJourney.callerId,
              code: applyJourney.selectedStandard.code,
              parcels: landInHectares
            }, request.yar.id)

          return h.redirect('/v2/choose-level')
        }
      }
    }
  }
]
