const enrichTask = (taskItem, fundingOption, paymentLevel) => {
  const taskKeys = ['key', 'route', 'next', 'back']
  for (const key of taskKeys) {
    taskItem[key] = taskItem[key]
      .replace(/{{paymentLevel}}/g, paymentLevel)
      .replace(/{{fundingOption}}/g, fundingOption)
  }
}

module.exports = enrichTask
