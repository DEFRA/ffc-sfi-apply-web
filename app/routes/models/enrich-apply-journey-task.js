const enrichTask = (taskItem, fundingOption, paymentLevel) => {
  const taskKeys = ['key', 'route', 'next', 'back', 'view']
  for (const key of taskKeys) {
    if (taskItem[key]) {
      taskItem[key] = replaceTokens(taskItem[key], fundingOption, paymentLevel)
    }
  }

  enrichDecision(taskItem.decision, fundingOption, paymentLevel)

  return taskItem
}

const replaceTokens = (value, fundingOption, paymentLevel) => {
  return value
    .replace(/{{paymentLevel}}/g, paymentLevel)
    .replace(/{{fundingOption}}/g, fundingOption)
}

const enrichDecision = (decisionItems, fundingOption, paymentLevel) => {
  if (decisionItems) {
    for (const decisionItem of decisionItems) {
      decisionItem.value = replaceTokens(decisionItem.value, fundingOption, paymentLevel)
    }
  }
}

module.exports = enrichTask
