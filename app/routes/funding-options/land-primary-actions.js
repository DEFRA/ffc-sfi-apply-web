const { sendAgreementCalculateMessage } = require('../../messaging')
const cache = require('../../cache')
const { getParcels } = require('../../api/map')

module.exports = [{
  method: 'GET',
  path: '/funding-options/land-primary-actions',
  options: {
    handler: async (request, h) => {
      const agreement = await cache.get('agreement', request.yar.id)
      const { parcels } = await getParcels(agreement.sbi)
      return h.view('funding-options/land-primary-actions', { landInHectares: agreement.landInHectares, landParcels: parcels })
    }
  }
},
{
  method: 'POST',
  path: '/funding-options/land-primary-actions',
  options: {
    handler: async (request, h, error) => {
      const agreement = await cache.get('agreement', request.yar.id)
      const landInHectares = Object.entries(request.payload).map(e => ({ name: e[0], value: e[1][0] !== '' ? parseFloat(e[1][0]) : 0.0, valid: !(parseFloat(e[1][0]) > parseFloat(e[1][1]) && parseFloat(e[1][0]) > 0.0) }))

      const isValidValues = landInHectares.find(element => !element.valid)
      if (isValidValues !== null && isValidValues !== undefined) {
        const { parcels } = await getParcels(agreement.sbi)
        return h.view('funding-options/land-primary-actions',
          { landInHectares: landInHectares, landParcels: parcels, errors: true }).code(400).takeover()
      } else {
        await cache.update('agreement', request.yar.id, { landInHectares: landInHectares })

        if (agreement.paymentActions !== undefined && agreement.paymentActions.length > 0) {
          return h.redirect('land-increased-actions')
        } else {
          await sendAgreementCalculateMessage(agreement, request.yar.id)
          await cache.update('progress', request.yar.id, {
            progress: {
              fundingOptions: { land: true }
            }
          })
          return h.redirect('calculation')
        }
      }
    }
  }
}]
