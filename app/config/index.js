const Joi = require('joi')
const cacheConfig = require('./cache')
const mqConfig = require('./message')
const cookieConfig = require('./cookie')
const storageConfig = require('./storage')
const authConfig = require('./auth')

// Define config schema
const schema = Joi.object({
  serviceName: Joi.string().default('Apply for sustainable farming funding'),
  port: Joi.number().default(3000),
  env: Joi.string().valid('development', 'test', 'production').default('development'),
  staticCacheTimeoutMillis: Joi.number().default(7 * 24 * 60 * 60 * 1000),
  googleTagManagerKey: Joi.string().default(''),
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
  staticCacheTimeoutMillis: process.env.STATIC_CACHE_TIMEOUT_IN_MILLIS,
  googleTagManagerKey: process.env.GOOGLE_TAG_MANAGER_KEY,
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
value.cookieConfig = cookieConfig
value.authConfig = authConfig

value.isDev = value.env === 'development'
value.isTest = value.env === 'test'
value.isProd = value.env === 'production'

// Don't try to connect to Redis for testing or if Redis not available
value.useRedis = !value.isTest && value.cacheConfig.options.host !== undefined

if (!value.useRedis) {
  console.info('Redis disabled, using in memory cache')
}

module.exports = value
