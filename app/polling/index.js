const api = require('../api')
const config = require('../config').polling

const getPollingResponse = async (correlationId, url) => {
  for (let i = 0; i < config.retries; i++) {
    await new Promise(resolve => setTimeout(resolve, config.interval))
    try {
      const { res, payload } = await api.get(`${url}?correlationId=${correlationId}`)
      switch (res.statusCode) {
        case 200:
          return payload
        case 202:
          if (config.isDev) {
            console.log('202 received, awaiting result, continue polling')
          }
          break
        default:
          console.log('Unhandled status code, stop polling')
          return undefined
      }
    } catch (err) {
      console.error(`${err}`)
      return undefined
    }
  }

  console.log(`Unable to get response after ${config.retries} attempts`)
  return undefined
}

module.exports = getPollingResponse
