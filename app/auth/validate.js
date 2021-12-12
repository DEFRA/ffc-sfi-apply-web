const cache = require('../cache')

const validate = async (decoded, request, h) => {
  const { callerId } = await cache.get(request)
  return { isValid: callerId === decoded.callerId }
}

module.exports = validate
