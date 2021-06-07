const getPollingResponse = require('../../polling')
const cache = require('../../cache')
const { saveAgreement } = require('../../agreement')
const { saveProgress } = require('../../progress')

module.exports = [{
  method: 'GET',
  path: '/funding-options/calculation',
  options: {
    handler: async (request, h) => {
      const response = await getPollingResponse(request.yar.id, '/calculate')
      if (response) {
        console.info('Calculation result received', response)
        await cache.update('agreement', request.yar.id, { paymentAmount: response.paymentAmount })
        return h.view('funding-options/calculation', { paymentAmount: response.paymentAmount })
      }
      return h.view('no-response')
    }
  }
},
{
  method: 'POST',
  path: '/funding-options/calculation',
  options: {
    handler: async (request, h) => {
      const progressId = await saveProgress(await cache.get('progress', request.yar.id))
      await cache.update('progress', request.yar.id, { progressId, progress: { fundingDetails: true } })
      const agreement = await cache.get('agreement', request.yar.id)
      await saveAgreement(agreement, progressId)

      return h.redirect('/application-task-list')
    }
  }
}]
