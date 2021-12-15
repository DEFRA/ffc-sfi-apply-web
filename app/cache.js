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
  return object ?? {}
}

const set = async (request, value) => {
  const key = getKey(request)
  const cache = getCache(request)
  await cache.set(key, value)
}

const update = async (request, object) => {
  const existing = await get(request)
  hoek.merge(existing, object, { mergeArrays: false })
  await set(request, existing)
  return existing
}

const reset = async (request) => {
  const existing = await get(request)
  if (existing.data) {
    delete existing.data.land
    delete existing.data.eligibleStandards
    delete existing.data.eligibleStandardsSpatial
  } else {
    existing.data = {}
  }
  await set(request, existing)
}

module.exports = {
  get,
  set,
  update,
  reset
}
