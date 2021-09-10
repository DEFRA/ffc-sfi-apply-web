const { get, post, put } = require('./base')

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

const saveAgreement = async (agreement, progress) => {
  let url
  let data

  const agreementNumber = agreement.agreementNumber ?? ''

  const sbi = agreement.selectedSbi.sbi

  const enrichAgreement = {
    saveAgreement: {
      agreementNumber,
      sbi,
      agreement
    },
    progress
  }

  console.log(enrichAgreement)

  if (agreementNumber) {
    url = `/agreement/${agreementNumber}/${sbi}`
    data = await put(url, enrichAgreement)
  } else {
    url = '/agreement'
    data = await post(url, enrichAgreement)
  }
  console.log('DATA!!!', JSON.stringify(data.toString()))
  return JSON.parse(data.toString())
}

module.exports = {
  getAgreements,
  getAgreement,
  saveAgreement
}
