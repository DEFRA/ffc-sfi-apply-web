const { get, post, put } = require('./base')

const getAgreements = async () => {
  const url = '/agreements'
  const data = await get(url)

  return data?.payload
}

const getAgreementsBySbi = async (sbi) => {
  const url = `/agreements/${sbi}`

  try {
    const data = await get(url)
    return data?.payload
  } catch (error) {
    return []
  }
}

const getAgreement = async (agreementNumber, sbi) => {
  const url = `/agreement/${sbi}/${agreementNumber}`
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
  const sbi = agreement.selectedOrganisation.sbi

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
  getAgreementsBySbi,
  getAgreement,
  saveAgreement,
  submitAgreement,
  getProgress
}
