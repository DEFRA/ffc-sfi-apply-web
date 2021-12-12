const cache = require('../cache')

const validate = async (decoded, request, h) => {
  const { callerId } = await cache.get(request)
  const isValid = callerId === decoded.callerId
  console.log(`Token validation: ${isValid}, Session: ${callerId}, Token: ${decoded.callerId}`)
  return { isValid }
}

module.exports = validate
