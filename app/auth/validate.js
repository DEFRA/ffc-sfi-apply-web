const cache = require('../cache')

const validate = async (decoded, request, h) => {
  const agreement = await cache.get(request)
  return { isValid: agreement?.application?.callerId === decoded.callerId }
}

module.exports = validate
