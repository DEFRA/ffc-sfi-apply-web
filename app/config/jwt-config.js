
const joi = require('joi')

const schema = joi.object({
  secret: joi.string(),
  ttl: joi.number().default(2592000000) // 30 days
})

const config = {
  secret: process.env.JWT_SECRET,
  ttl: process.env.JWT_TTL
}

// Validate config
const result = schema.validate(config, {
  abortEarly: false
})

// Throw if config is invalid
if (result.error) {
  throw new Error(`The JWT config is invalid. ${result.error.message}`)
}

module.exports = result.value
