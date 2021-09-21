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

const submitAgreement = async (agreementNumber, sbi) => {
  const url = '/agreement/submit'
  const data = await post(url, { agreementNumber, sbi })

  return data?.payload
}

const saveAgreement = async (agreement, progress) => {
  let url
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

  if (agreementNumber) {
    url = `/agreement/${agreementNumber}/${sbi}`
    await put(url, enrichAgreement)
    return { progressId: progress.progressId, agreementNumber }
  }

  url = '/agreement'
  const data = await post(url, enrichAgreement)

  return JSON.parse(data.toString())
}

const getProgress = async (progressId) => {
  const url = `/agreement/progress/${progressId}`
  const data = await get(url)

  return data?.payload
}

module.exports = {
  getAgreements,
  getAgreement,
  saveAgreement,
  submitAgreement,
  getProgress
}
