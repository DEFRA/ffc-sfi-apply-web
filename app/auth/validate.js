const cache = require('../cache')

const validate = async (decoded, request, h) => {
  const agreement = await cache.get('agreement', request.yar.id)
  return { isValid: agreement?.application?.callerId === decoded.callerId }
}

module.exports = validate
