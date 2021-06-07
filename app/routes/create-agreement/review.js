const ViewModel = require('./models/review')
const cache = require('../../cache')
const { saveAgreement } = require('../../agreement')
const { saveProgress } = require('../../progress')

module.exports = [{
  method: 'GET',
  path: '/create-agreement/review',
  options: {
    handler: async (request, h) => {
      await cache.update('progress', request.yar.id, {
        progress: { createAgreement: true }
      })

      const progressId = await saveProgress(await cache.get('progress', request.yar.id))

      const agreement = await cache.get('agreement', request.yar.id)
      await saveAgreement(agreement, progressId)

      return h.view('create-agreement/review', new ViewModel(agreement))
    }
  }
}]
