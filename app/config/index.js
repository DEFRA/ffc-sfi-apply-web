const joi = require('joi')
const mqConfig = require('./mq-config')

// Define config schema
const schema = joi.object({
  serviceName: joi.string().default('Apply for land funding'),
  port: joi.number().default(3000),
  env: joi.string().valid('development', 'test', 'production').default('development'),
  staticCacheTimeoutMillis: joi.number().default(7 * 24 * 60 * 60 * 1000),
  googleTagManagerKey: joi.string().default(''),
  isSameSite: joi.string().valid('Lax').default('Lax'),
  cookieOptions: joi.object({
    ttl: joi.number().default(1000 * 60 * 60 * 24 * 365),
    encoding: joi.string().valid('base64json').default('base64json'),
    isSecure: joi.bool().default(true),
    isHttpOnly: joi.bool().default(true),
    clearInvalid: joi.bool().default(false),
    strictHeader: joi.bool().default(true)
  }),
  agreementCalculatorEndpoint: joi.string().uri().required(),
  sitiAgriEndpoint: joi.string().uri().required(),
  restClientTimeoutMillis: joi.number().default(60000),
  useAgreementCalculator: joi.bool().default(false),
  polling: joi.object({
    interval: joi.number().default(500),
    retries: joi.number().default(10)
  })
})

// Build config
const config = {
  serviceName: process.env.SERVICE_NAME,
  port: process.env.PORT,
  env: process.env.NODE_ENV,
  staticCacheTimeoutMillis: process.env.STATIC_CACHE_TIMEOUT_IN_MILLIS,
  googleTagManagerKey: process.env.GOOGLE_TAG_MANAGER_KEY,
  cookieOptions: {
    ttl: process.env.COOKIE_TTL_IN_MILLIS,
    encoding: 'base64json',
    isSecure: process.env.NODE_ENV === 'production',
    isHttpOnly: true,
    clearInvalid: false,
    strictHeader: true
  },
  agreementCalculatorEndpoint: process.env.AGREEMENT_CALCULATOR_ENDPOINT,
  sitiAgriEndpoint: process.env.SITI_AGRI_ENDPOINT,
  restClientTimeoutMillis: process.env.REST_CLIENT_TIMEOUT_IN_MILLIS,
  useAgreementCalculator: process.env.USE_AGREEMENT_CALCULATOR,
  polling: {
    interval: process.env.POLLING_INTERVAL,
    retries: process.env.POLLING_RETRIES
  }
}

// Validate config
const result = schema.validate(config, {
  abortEarly: false
})

// Throw if config is invalid
if (result.error) {
  throw new Error(`The server config is invalid. ${result.error.message}`)
}

// Use the joi validated value
const value = result.value

value.eligibilityTopic = mqConfig.eligibilityTopic
value.standardsTopic = mqConfig.standardsTopic
value.validateTopic = mqConfig.validateTopic
value.calculateTopic = mqConfig.calculateTopic
value.submitTopic = mqConfig.submitTopic

value.isDev = (value.env === 'development' || value.env === 'test')

if (!value.useAgreementCalculator) {
  value.agreementCalculatorEndpoint = value.sitiAgriEndpoint
}

module.exports = value
