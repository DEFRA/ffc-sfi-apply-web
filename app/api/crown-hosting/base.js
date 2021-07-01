const wreck = require('@hapi/wreck')

async function get (url, token) {
  return wreck.get(`${url}`, { rejectUnauthorized: false })
}

module.exports = {
  get
}
