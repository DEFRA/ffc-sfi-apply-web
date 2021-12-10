const Joi = require('joi')
const cacheConfig = require('./cache')
const mqConfig = require('./mq-config')
const jwtConfig = require('./jwt-config')
const storageConfig = require('./storage-config')

// Define config schema
const schema = Joi.object({
  serviceName: Joi.string().default('Apply for sustainable farming funding'),
  port: Joi.number().default(3000),
  env: Joi.string().valid('development', 'test', 'production').default('development'),
  cookiePassword: Joi.string().required(),
  staticCacheTimeoutMillis: Joi.number().default(7 * 24 * 60 * 60 * 1000),
  googleTagManagerKey: Joi.string().default(''),
  cookieOptions: Joi.object({
    ttl: Joi.number().default(1000 * 60 * 60 * 24 * 365),
    isSameSite: Joi.string().valid('Lax').default('Lax'),
    encoding: Joi.string().valid('base64json').default('base64json'),
    isSecure: Joi.bool().default(true),
    isHttpOnly: Joi.bool().default(true),
    clearInvalid: Joi.bool().default(false),
    strictHeader: Joi.bool().default(true)
  }),
  agreementApiEndpoint: Joi.string().uri().required(),
  agreementCalculatorEndpoint: Joi.string().uri().required(),
  restClientTimeoutMillis: Joi.number().default(60000),
  chApiGateway: Joi.string().default('').regex(/[a-zA-Z:0-9]$/).allow(''),
  osMapApiKey: Joi.string().default('').allow('')
})

// Build config
const config = {
  serviceName: process.env.SERVICE_NAME,
  port: process.env.PORT,
  env: process.env.NODE_ENV,
  cookiePassword: process.env.COOKIE_PASSWORD,
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
  chApiGateway: process.env.CH_API_GATEWAY,
  osMapApiKey: process.env.OS_MAP_API_KEY,
  agreementApiEndpoint: process.env.AGREEMENT_API_ENDPOINT,
  agreementCalculatorEndpoint: process.env.AGREEMENT_CALCULATOR_ENDPOINT,
  restClientTimeoutMillis: process.env.REST_CLIENT_TIMEOUT_IN_MILLIS
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
value.withdrawTopic = mqConfig.withdrawTopic
value.parcelSpatialTopic = mqConfig.parcelSpatialTopic
value.parcelStandardTopic = mqConfig.parcelStandardTopic
value.responseStandardsQueue = mqConfig.responseStandardsQueue
value.responseCalculateQueue = mqConfig.responseCalculateQueue
value.responseEligibilityQueue = mqConfig.responseEligibilityQueue
value.responseParcelSpatialQueue = mqConfig.responseParcelSpatialQueue
value.responseParcelStandardQueue = mqConfig.responseParcelStandardQueue

value.cacheConfig = cacheConfig
value.storageConfig = storageConfig
value.jwtConfig = jwtConfig

value.isDev = value.env === 'development'
value.isTest = value.env === 'test'
value.isProd = value.env === 'production'

// Don't try to connect to Redis for testing or if Redis not available
value.useRedis = !value.isTest && value.cacheConfig.redisCatboxOptions.host !== undefined

if (!value.useRedis) {
  console.info('Redis disabled, using in memory cache')
}

value.cookieOptionsIdentity = {
  ...value.cookieOptions,
  ttl: value.jwtConfig.ttl,
  encoding: 'none'
}

module.exports = value
