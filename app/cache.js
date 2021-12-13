const hoek = require('@hapi/hoek')

const getKey = (request) => {
  return request.state.ffc_sfi_identity.sid
}

const getCache = (request) => {
  return request.server.app.cache
}

const get = async (request) => {
  const key = getKey(request)
  const cache = getCache(request)
  const object = await cache.get(key)
  console.log(`Retrieved ${key} from cache`)
  return object ?? {}
}

const set = async (request, value) => {
  const key = getKey(request)
  const cache = getCache(request)
  await cache.set(key, value)
  console.log(`Updated cache for ${key}`)
}

const update = async (request, object) => {
  const existing = await get(request)
  hoek.merge(existing, object, { mergeArrays: false })
  await set(request, existing)
  return existing
}

const reset = async (request) => {
  console.log('Resetting')
  const existing = await get(request)
  delete existing.data.land
  delete existing.data.eligibleStandards
  delete existing.data.eligibleStandardsSpatial
  await set(request, existing)
}

module.exports = {
  get,
  set,
  update,
  reset
}
