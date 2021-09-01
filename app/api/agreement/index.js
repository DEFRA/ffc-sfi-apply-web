const { get } = require('./base')

const getAgreements = async () => {
  const url = '/agreements'
  const data = await get(url)

  return data?.payload
}

const getAgreement = async (agreementNumber, sbi) => {
  const url = `/agreement/${agreementNumber}/${sbi}`
  const data = await get(url)

  return data?.payload
}

module.exports = {
  getAgreements,
  getAgreement
}
