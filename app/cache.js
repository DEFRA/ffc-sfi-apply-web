const hoek = require('@hapi/hoek')

const get = async (request) => {
  const object = await request.yar.get(request.yar.id)
  return object ?? {}
}

const set = async (request, value) => {
  await request.yar.set(request.yar.id, value)
}

const update = async (request, object) => {
  const existing = await get(request)
  hoek.merge(existing, object, { mergeArrays: false })
  await set(request, existing)
  return existing
}

const clear = async (request) => {
  await request.yar.clear(request.yar.id)
}

module.exports = {
  get,
  set,
  update,
  clear
}
