const cache = require('../cache')
const { put } = require('../api/agreement')

const save = async (request) => {
  const { agreement } = await cache.get(request)
  const { agreementNumber, organisation } = agreement

  const url = `/agreement/${agreementNumber}/${organisation.sbi}`
  await put(url, agreement)
}

module.exports = save
