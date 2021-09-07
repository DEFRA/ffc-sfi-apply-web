const joi = require('joi')
const cache = require('../../../cache')
const { sendAgreementCalculateMessage } = require('../../../messaging')
const getAllItems = require('./models/util-add-standard-parcels')

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
      validate: {
        payload: joi.object({
          parcels: joi.any().required()
        }),
        failAction: async (request, h, error) => {
          const { applyJourney, checkboxItems, totalHa } = await getAllItems(request)
          return h.view('v2/add-standard-parcels/add-standard-parcels',
            {
              error: error,
              checkboxItems: checkboxItems,
              totalHa: Number(totalHa).toFixed(2),
              sidebarItems: [`SBI: ${applyJourney.selectedSbi.sbi}`, `Standard: ${applyJourney.selectedStandard.name}`]
            }).code(400).takeover()
        }
      },
      handler: async (request, h) => {
        const applyJourney = await cache.get('apply-journey', request.yar.id)
        const parcels = applyJourney.selectedStandard.parcels

        const selectedParcels = parcels.filter(item => request.payload.parcels.includes(item.id)).map(x => ({
          id: x.id,
          area: x.area
        }))

        const parcelArea = selectedParcels.reduce((accum, item) => accum + item.area, 0)

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
  }
]
