const joi = require('joi')
const cacheConfig = require('./cache')
const mqConfig = require('./mq-config')
const jwtConfig = require('./jwt-config')
const storageConfig = require('./storage-config')

// Define config schema
const schema = joi.object({
  serviceName: joi.string().default('Apply for sustainable farming funding'),
  port: joi.number().default(3000),
  env: joi.string().valid('development', 'test', 'production').default('development'),
  cookiePassword: joi.string().required(),
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
  agreementApiEndpoint: joi.string().uri().required(),
  agreementCalculatorEndpoint: joi.string().uri().required(),
  restClientTimeoutMillis: joi.number().default(60000),
  publicApi: joi.string().default('https://environment.data.gov.uk/arcgis/rest/services/RPA/'),
  chApiGateway: joi.string().default('').regex(/[a-zA-Z:0-9]$/).allow(''),
  osMapApiKey: joi.string().default('').allow('')
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
  publicApi: process.env.PUBLIC_API,
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
value.requestSBITopic = mqConfig.requestSBITopic
value.parcelSpatialTopic = mqConfig.parcelSpatialTopic
value.parcelTopic = mqConfig.parcelTopic
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
