const wreck = require('@hapi/wreck')
const config = require('../config')

const get = async (url) => {
  return wreck.get(`${config.agreementApiEndpoint}${url}`, { json: true })
}

const post = async (url, data, token) => {
  const { payload } = await wreck.post(`${config.agreementApiEndpoint}${url}`, {
    payload: data,
    ...getConfiguration(token)
  })
  return payload
}

const put = async (url, data, token) => {
  const { payload } = await wreck.put(`${config.agreementApiEndpoint}${url}`, {
    payload: data,
    ...getConfiguration(token)
  })
  return payload
}

const getConfiguration = (token) => {
  return {
    headers: {
      Authorization: token ?? ''
    },
    json: true
  }
}

module.exports = {
  get,
  post,
  put
}
