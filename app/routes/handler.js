const cache = require('../cache')
const applyJourney = require('../config/apply-journey')
const paymentLevels = require('./payment-levels')
const enrichTask = require('./models/enrich-apply-journey-task')

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

const checkTokenizedTask = async (request, journeyItem) => {
  const applyJourneyCache = await cache.get('apply-journey', request.yar.id)
  const fundingOption = applyJourneyCache?.selectedStandard?.code === '130' ? 'improved-grassland-soils' : 'arable-soils'
  const paymentLevel = paymentLevels.find(x => x.name === applyJourneyCache?.selectedAmbitionLevel?.name)
  if (fundingOption && paymentLevel) {
    return await enrichTask(journeyItem, fundingOption, paymentLevel.paymentLevel)
  }

  return journeyItem
}

const preHandler = (key) => {
  let journeyItem = applyJourney.find(x => x.key === key)
  return {
    method: async (request, reply) => {
      if (journeyItem) {
        const progress = await getProgress(request)
        journeyItem = await checkTokenizedTask(request, journeyItem)
        if (journeyItem.back !== '' && !progress.redirect && request.method.toLowerCase() === 'get') {
          if (!checkIfComplete(progress.applyProgress, journeyItem.key)) {
            const referer = getReferer(request.headers.referer)
            if (referer !== journeyItem.back) {
              throw new Error('Invalid referer')
            }

            progress.applyProgress.push({ key: journeyItem.key, sequence: journeyItem.sequence })
            await cache.update('progress', request.yar.id, { applyProgress: progress.applyProgress })
          }

          if (journeyItem.refreshProgress) {
            const refreshProgress = progress.applyProgress.filter(x => x.sequence <= journeyItem.sequence)
            await cache.update('progress', request.yar.id, { applyProgress: refreshProgress })
          }
        }

        await cache.update('progress', request.yar.id, { redirect: false })
      }

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
