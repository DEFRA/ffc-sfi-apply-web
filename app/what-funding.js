const mapStandards = (eligibleFunding) => {
  return eligibleFunding.filter(item => item.landCovers.length > 0)
    .map(funding => {
      return {
        value: funding.code,
        text: funding.text,
        hint: { text: funding.hint }
      }
    })
}

module.exports = { mapStandards }
