const fs = require('fs')
const path = require('path')

module.exports = fs.readdirSync(__dirname)
  .filter(file => file !== path.basename(__filename) && file !== 'data')
  .map(file => require(`./${file}`))
  .flat()
