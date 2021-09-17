const cache = require('../cache')
const applyJourney = require('../config/apply-journey')

const getReferer = (referer) => {
  if (referer) {
    const url = new URL(referer)
    return url.pathname
  }
  return '/'
}

const getRedirectRoute = (applyProgress) => {
  if (applyProgress) {
    const maxSequence = applyProgress.reduce(
      (max, progress) => (progress.sequence > max ? progress.sequence : max), applyProgress[0].sequence)
    const applyJourneyItem = applyJourney.find(x => x.sequence === maxSequence)
    return applyJourneyItem.redirect === '' ? applyJourneyItem.route : applyJourneyItem.redirect
  }
  return '/'
}

const checkIfComplete = (applyProgress, key) => {
  return applyProgress.find(x => x.key === key) ?? false
}

const getProgress = async (request) => {
  const progress = await cache.get('progress', request.yar.id)
  if (!progress?.applyProgress) {
    return await cache.update('progress', request.yar.id, { applyProgress: [] })
  }
  return progress
}

const preHandler = (route) => {
  const journeyItem = applyJourney.find(x => x.route === route)
  return {
    method: async (request, reply) => {
      const progress = await getProgress(request)

      if (journeyItem.back !== '' && !progress.redirect && request.method.toLowerCase() === 'get') {
        if (!checkIfComplete(progress.applyProgress, journeyItem.key)) {
          const referer = getReferer(request.headers.referer)
          if (referer !== journeyItem.back) {
            throw new Error('Invalid referer')
          }

          progress.applyProgress.push({ key: journeyItem.key, sequence: journeyItem.sequence })
          await cache.update('progress', request.yar.id, { applyProgress: progress.applyProgress })
        }
      }

      await cache.update('progress', request.yar.id, { redirect: false })
      return journeyItem
    },
    failAction: async (request, h, error) => {
      const progress = await cache.get('progress', request.yar.id)
      const redirectRoute = getRedirectRoute(progress.applyProgress)
      await cache.update('progress', request.yar.id, { redirect: true })
      return h.redirect(`${redirectRoute}`).code(301).takeover()
    },
    assign: 'journeyItem'
  }
}

module.exports = {
  preHandler
}
