const Joi = require('joi')

const mqSchema = Joi.object({
  messageQueue: {
    host: Joi.string().default('localhost'),
    useCredentialChain: Joi.bool().default(false),
    type: Joi.string(),
    appInsights: Joi.object(),
    username: Joi.string(),
    password: Joi.string()
  },
  eligibilityTopic: {
    address: Joi.string()
  },
  standardsTopic: {
    address: Joi.string()
  },
  validateTopic: {
    address: Joi.string()
  },
  calculateTopic: {
    address: Joi.string()
  },
  submitTopic: {
    address: Joi.string()
  },
  withdrawTopic: {
    address: Joi.string()
  },
  parcelSpatialTopic: {
    address: Joi.string()
  },
  parcelStandardTopic: {
    address: Joi.string()
  },
  responseStandardsQueue: {
    address: Joi.string()
  },
  responseCalculateQueue: {
    address: Joi.string()
  },
  responseEligibilityQueue: {
    address: Joi.string()
  },
  responseParcelSpatialQueue: {
    address: Joi.string()
  },
  responseParcelStandardQueue: {
    address: Joi.string()
  }
})
const mqConfig = {
  messageQueue: {
    host: process.env.MESSAGE_QUEUE_HOST,
    useCredentialChain: process.env.NODE_ENV === 'production',
    type: 'Topic',
    appInsights: process.env.NODE_ENV === 'production' ? require('applicationinsights') : undefined,
    username: process.env.MESSAGE_QUEUE_USER,
    password: process.env.MESSAGE_QUEUE_PASSWORD
  },
  eligibilityTopic: {
    address: process.env.ELIGIBILITY_TOPIC_ADDRESS
  },
  standardsTopic: {
    address: process.env.STANDARDS_TOPIC_ADDRESS
  },
  validateTopic: {
    address: process.env.VALIDATE_TOPIC_ADDRESS
  },
  calculateTopic: {
    address: process.env.CALCULATE_TOPIC_ADDRESS
  },
  submitTopic: {
    address: process.env.SUBMIT_TOPIC_ADDRESS
  },
  withdrawTopic: {
    address: process.env.WITHDRAW_TOPIC_ADDRESS
  },
  parcelSpatialTopic: {
    address: process.env.PARCELSPATIAL_TOPIC_ADDRESS
  },
  parcelStandardTopic: {
    address: process.env.PARCELSTANDARD_TOPIC_ADDRESS
  },
  responseStandardsQueue: {
    address: process.env.STANDARDSRESPONSE_QUEUE_ADDRESS
  },
  responseCalculateQueue: {
    address: process.env.CALCULATERESPONSE_QUEUE_ADDRESS
  },
  responseEligibilityQueue: {
    address: process.env.ELIGIBILITYRESPONSE_QUEUE_ADDRESS
  },
  responseParcelSpatialQueue: {
    address: process.env.PARCELSPATIALRESPONSE_QUEUE_ADDRESS
  },
  responseParcelStandardQueue: {
    address: process.env.PARCELSTANDARDRESPONSE_QUEUE_ADDRESS
  }
}

const mqResult = mqSchema.validate(mqConfig, {
  abortEarly: false
})

// Throw if config is invalid and not running in test mode
if (mqResult.error && process.env.NODE_ENV !== 'test') {
  throw new Error(`The message queue config is invalid. ${mqResult.error.message}`)
}

const calculateTopic = { ...mqResult.value.messageQueue, ...mqResult.value.calculateTopic }
const eligibilityTopic = { ...mqResult.value.messageQueue, ...mqResult.value.eligibilityTopic }
const parcelSpatialTopic = { ...mqResult.value.messageQueue, ...mqResult.value.parcelSpatialTopic }
const parcelStandardTopic = { ...mqResult.value.messageQueue, ...mqResult.value.parcelStandardTopic }
const responseCalculateQueue = { ...mqResult.value.messageQueue, ...mqResult.value.responseCalculateQueue }
const responseEligibilityQueue = { ...mqResult.value.messageQueue, ...mqResult.value.responseEligibilityQueue }
const responseParcelSpatialQueue = { ...mqResult.value.messageQueue, ...mqResult.value.responseParcelSpatialQueue }
const responseParcelStandardQueue = { ...mqResult.value.messageQueue, ...mqResult.value.responseParcelStandardQueue }
const responseStandardsQueue = { ...mqResult.value.messageQueue, ...mqResult.value.responseStandardsQueue }
const standardsTopic = { ...mqResult.value.messageQueue, ...mqResult.value.standardsTopic }
const submitTopic = { ...mqResult.value.messageQueue, ...mqResult.value.submitTopic }
const validateTopic = { ...mqResult.value.messageQueue, ...mqResult.value.validateTopic }
const withdrawTopic = { ...mqResult.value.messageQueue, ...mqResult.value.withdrawTopic }

module.exports = {
  calculateTopic,
  eligibilityTopic,
  parcelSpatialTopic,
  parcelStandardTopic,
  responseCalculateQueue,
  responseEligibilityQueue,
  responseParcelSpatialQueue,
  responseParcelStandardQueue,
  responseStandardsQueue,
  standardsTopic,
  submitTopic,
  validateTopic,
  withdrawTopic
}
