const joi = require('joi')
const mqConfig = require('./mq-config')

// Define config schema
const schema = joi.object({
  serviceName: joi.string().default('Apply for land funding'),
  port: joi.number().default(3000),
  env: joi.string().valid('development', 'test', 'production').default('development'),
  redisHost: joi.string(),
  redisPort: joi.number().default(6379),
  redisPassword: joi.string().default(''),
  redisPartition: joi.string().default('ffc-sfi-apply-web'),
  cookiePassword: joi.string().required(),
  sessionTimeoutMinutes: joi.number().default(60),
  staticCacheTimeoutMillis: joi.number().default(7 * 24 * 60 * 60 * 1000),
  googleTagManagerKey: joi.string().default(''),
  cookieOptions: joi.object({
    ttl: joi.number().default(1000 * 60 * 60 * 24 * 365),
    isSameSite: joi.string().valid('Lax').default('Lax'),
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
    retries: joi.number().default(20)
  })
})

// Build config
const config = {
  serviceName: process.env.SERVICE_NAME,
  port: process.env.PORT,
  env: process.env.NODE_ENV,
  redisPartition: process.env.REDIS_PARTITION,
  redisHost: process.env.REDIS_HOSTNAME,
  redisPort: process.env.REDIS_PORT,
  redisPassword: process.env.REDIS_PASSWORD,
  cookiePassword: process.env.COOKIE_PASSWORD,
  sessionTimeoutMinutes: process.env.SESSION_TIMEOUT_IN_MINUTES,
  staticCacheTimeoutMillis: process.env.STATIC_CACHE_TIMEOUT_IN_MILLIS,
  googleTagManagerKey: process.env.GOOGLE_TAG_MANAGER_KEY,
  cookieOptions: {
    ttl: process.env.COOKIE_TTL_IN_MILLIS,
    isSameSite: 'Lax',
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
value.isTest = value.env === 'test'
value.isProd = value.env === 'production'

// Don't try to connect to Redis for testing or if Redis not available
value.useRedis = !value.isTest && value.redisHost

if (!value.useRedis) {
  console.info('Redis disabled, using in memory cache')
}

value.catboxOptions = {
  host: value.redisHost,
  port: value.redisPort,
  password: value.redisPassword,
  tls: value.isProd ? {} : undefined,
  partition: value.redisPartition
}

if (!value.useAgreementCalculator) {
  value.agreementCalculatorEndpoint = value.sitiAgriEndpoint
}

module.exports = value
