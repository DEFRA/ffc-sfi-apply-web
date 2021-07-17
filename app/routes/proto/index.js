const fs = require('fs')
const path = require('path')

module.exports = fs.readdirSync(__dirname, { withFileTypes: true })
  .filter(file => file.name !== path.basename(__filename) && file.isFile())
  .map(file => require(`./${file.name}`))
  .flat()
