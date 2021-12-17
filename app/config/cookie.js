
const Joi = require('joi')

const schema = Joi.object({
  password: Joi.string(),
  ttl: Joi.number().default(1000 * 60 * 60 * 24 * 365), // 1 year
  isSameSite: Joi.string().valid('Lax').default('Lax'),
  encoding: Joi.string().valid('base64json').default('base64json'),
  isSecure: Joi.bool().default(true),
  isHttpOnly: Joi.bool().default(true),
  clearInvalid: Joi.bool().default(false),
  strictHeader: Joi.bool().default(true)
})

const config = {
  password: process.env.COOKIE_PASSWORD,
  ttl: process.env.COOKIE_TTL_IN_MILLIS,
  isSameSite: 'Lax',
  encoding: 'base64json',
  isSecure: process.env.NODE_ENV === 'production',
  isHttpOnly: true,
  clearInvalid: false,
  strictHeader: true
}

// Validate config
const result = schema.validate(config, {
  abortEarly: false
})

// Throw if config is invalid
if (result.error) {
  throw new Error(`The cookie config is invalid. ${result.error.message}`)
}

module.exports = result.value
