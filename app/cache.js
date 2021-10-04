const hoek = require('@hapi/hoek')
const config = require('./config').cacheConfig
let eligibilityCache
let agreementCache
let progressCache
let applyJourneyCache

const setup = (server) => {
  eligibilityCache = server.cache({
    expiresIn: config.eligibilitySegment.expiresIn,
    segment: config.eligibilitySegment.name
  })
  agreementCache = server.cache({
    expiresIn: config.agreementSegment.expiresIn,
    segment: config.agreementSegment.name
  })
  progressCache = server.cache({
    expiresIn: config.progressSegment.expiresIn,
    segment: config.progressSegment.name
  })
  applyJourneyCache = server.cache({
    expiresIn: config.applyJourneySegment.expiresIn,
    segment: config.applyJourneySegment.name
  })
}

const get = async (cacheName, key) => {
  const cache = getCache(cacheName)
  const object = await cache.get(key)
  return object ?? {}
}

const set = async (cacheName, key, value) => {
  const cache = getCache(cacheName)
  await cache.set(key, value)
}

const update = async (cacheName, key, object) => {
  const existing = await get(cacheName, key)
  hoek.merge(existing, object, { mergeArrays: false })
  await set(cacheName, key, existing)
  return existing
}

const clear = async (cacheName, key) => {
  const cache = getCache(cacheName)
  await cache.drop(key)
}

const getCache = (cacheName) => {
  switch (cacheName) {
    case 'eligibility':
      return eligibilityCache
    case 'agreement':
      return agreementCache
    case 'progress':
      return progressCache
    case 'apply-journey':
      return applyJourneyCache
    default:
      throw new Error(`Cache ${cacheName} does not exist`)
  }
}

module.exports = {
  setup,
  get,
  set,
  update,
  clear
}
