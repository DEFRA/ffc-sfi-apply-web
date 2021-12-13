const cache = require('../cache')
const { put } = require('../api/agreement')
const util = require('util')

const save = async (request) => {
  const { agreement } = await cache.get(request)
  const { agreementNumber, organisation } = agreement

  const url = `/agreement/${agreementNumber}/${organisation.sbi}`
  await put(url, agreement)
  console.log('Saved agreement: ', util.inspect(agreement, false, null, true))
}

module.exports = save
