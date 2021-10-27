const api = require('../api')
const cache = require('../cache')

const validate = async (decoded, request, h) => {
  let isValid = false
  const agreement = await cache.get('agreement', request.yar.id)

  if (agreement?.callerId === decoded.callerId) {
    isValid = true
  }

  return { isValid }
}

module.exports = validate