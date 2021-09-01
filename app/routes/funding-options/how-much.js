const joi = require('joi')
const cache = require('../../cache')
const { sendAgreementCalculateMessage } = require('../../messaging')
const getAllItems = require('./models/util-how-much')

module.exports = [
  {
    method: 'GET',
    path: '/funding-options/how-much',
    handler: async (request, h) => {
      const { applyJourney, checkboxItems, totalHa } = await getAllItems(request)
      return h.view('funding-options/how-much',
        {
          checkboxItems: checkboxItems,
          totalHa: Number(totalHa).toFixed(2),
          selectedStandardCode: applyJourney.selectedStandard.code
        }
      )
    }
  },
  {
    method: 'POST',
    path: '/funding-options/how-much',
    options: {
      validate: {
        payload: joi.object({
          parcels: joi.any().required()
        }),
        failAction: async (request, h, error) => {
          const { applyJourney, checkboxItems, totalHa } = await getAllItems(request)
          return h.view('funding-options/how-much',
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

        await cache.update('progress', request.yar.id, {
          progress: { amountOfLand: true }
        })

        return h.redirect('/funding-options/what-payment-level')
      }
    }
  }
]
