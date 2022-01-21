const cache = require('../cache')
const save = require('./save')
const { post } = require('../api/agreement')
const util = require('util')
const status = require('./status')

const submit = async (request) => {
  await save(request)
  const { agreement } = await cache.get(request)
  const { agreementNumber, organisation } = agreement

  const submitted = status.find(x => x.name === 'Submitted')

  const url = '/agreement/submit'
  await post(url, { agreementNumber, sbi: organisation.sbi })
  await cache.update(request, { agreement: { submitted: true, statusId: submitted.id } })
  console.log('submitted agreement: ', util.inspect(agreement, false, null, true))
}

module.exports = submit
