const getBackLink = (previousUrl) => {
  return previousUrl ?? '/start-application'
}

module.exports = getBackLink
