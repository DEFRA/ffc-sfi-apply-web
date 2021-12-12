const { get } = require('../api/agreement')

const getBySbi = async (sbi) => {
  const url = `/agreements/${sbi}`

  try {
    const data = await get(url)
    return data?.payload
  } catch (error) {
    return []
  }
}

const getByAgreementNumber = async (agreementNumber, sbi) => {
  const url = `/agreement/${sbi}/${agreementNumber}`
  const data = await get(url)
  return data?.payload
}

module.exports = {
  getBySbi,
  getByAgreementNumber
}
