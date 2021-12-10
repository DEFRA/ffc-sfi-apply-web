const cache = require('../cache')

const validate = async (decoded, request, h) => {
  const cachedData = await cache.get(request)
  return { isValid: cachedData.callerId === decoded.callerId }
}

module.exports = validate
