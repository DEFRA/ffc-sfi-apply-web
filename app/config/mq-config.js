const joi = require('joi')

const mqSchema = joi.object({
  messageQueue: {
    host: joi.string().default('localhost'),
    useCredentialChain: joi.bool().default(false),
    type: joi.string(),
    appInsights: joi.object()
  },
  eligibilityTopic: {
    name: joi.string().default('ffc-sfi-eligibility-check'),
    address: joi.string().default('eligibility'),
    username: joi.string(),
    password: joi.string()
  },
  standardsTopic: {
    name: joi.string().default('ffc-sfi-standards-request'),
    address: joi.string().default('standards'),
    username: joi.string(),
    password: joi.string()
  },
  validateTopic: {
    name: joi.string().default('ffc-sfi-agreement-validate'),
    address: joi.string().default('validate'),
    username: joi.string(),
    password: joi.string()
  },
  calculateTopic: {
    name: joi.string().default('ffc-sfi-agreement-calculate'),
    address: joi.string().default('calculate'),
    username: joi.string(),
    password: joi.string()
  },
  submitTopic: {
    name: joi.string().default('ffc-sfi-agreement-submit'),
    address: joi.string().default('submit'),
    username: joi.string(),
    password: joi.string()
  },
  withdrawTopic: {
    name: joi.string().default('ffc-sfi-agreement-withdraw'),
    address: joi.string().default('withdraw'),
    username: joi.string(),
    password: joi.string()
  },
  requestSBITopic: {
    name: joi.string().default('ffc-sfi-request-sbi'),
    address: joi.string().default('request-sbi'),
    username: joi.string(),
    password: joi.string()
  },
  parcelSpatialTopic: {
    name: joi.string().default('ffc-sfi-parcel-spatial-request'),
    address: joi.string(),
    username: joi.string(),
    password: joi.string()
  },
  parcelTopic: {
    name: joi.string().default('ffc-sfi-parcel-request'),
    address: joi.string(),
    username: joi.string(),
    password: joi.string()
  },
  parcelStandardTopic: {
    name: joi.string().default('ffc-sfi-parcel-standard-request'),
    address: joi.string(),
    username: joi.string(),
    password: joi.string()
  },
  responseStandardsQueue: {
    name: joi.string(),
    address: joi.string(),
    username: joi.string(),
    password: joi.string(),
    type: joi.string()
  },
  responseCalculateQueue: {
    name: joi.string(),
    address: joi.string(),
    username: joi.string(),
    password: joi.string(),
    type: joi.string()
  },
  responseEligibilityQueue: {
    name: joi.string(),
    address: joi.string(),
    username: joi.string(),
    password: joi.string(),
    type: joi.string()
  },
  responseParcelSpatialQueue: {
    name: joi.string(),
    address: joi.string(),
    username: joi.string(),
    password: joi.string(),
    type: joi.string()
  },
  responseParcelQueue: {
    name: joi.string(),
    address: joi.string(),
    username: joi.string(),
    password: joi.string(),
    type: joi.string()
  },
  responseParcelStandardQueue: {
    name: joi.string(),
    address: joi.string(),
    username: joi.string(),
    password: joi.string(),
    type: joi.string()
  }
})
const mqConfig = {
  messageQueue: {
    host: process.env.MESSAGE_QUEUE_HOST,
    useCredentialChain: process.env.NODE_ENV === 'production',
    type: 'Topic',
    appInsights: process.env.NODE_ENV === 'production' ? require('applicationinsights') : undefined
  },
  eligibilityTopic: {
    name: process.env.ELIGIBILITY_TOPIC_NAME,
    address: process.env.ELIGIBILITY_TOPIC_ADDRESS,
    username: process.env.MESSAGE_QUEUE_USER,
    password: process.env.MESSAGE_QUEUE_PASSWORD
  },
  standardsTopic: {
    name: process.env.STANDARDS_TOPIC_NAME,
    address: process.env.STANDARDS_TOPIC_ADDRESS,
    username: process.env.MESSAGE_QUEUE_USER,
    password: process.env.MESSAGE_QUEUE_PASSWORD
  },
  validateTopic: {
    name: process.env.VALIDATE_TOPIC_NAME,
    address: process.env.VALIDATE_TOPIC_ADDRESS,
    username: process.env.MESSAGE_QUEUE_USER,
    password: process.env.MESSAGE_QUEUE_PASSWORD
  },
  calculateTopic: {
    name: process.env.CALCULATE_TOPIC_NAME,
    address: process.env.CALCULATE_TOPIC_ADDRESS,
    username: process.env.MESSAGE_QUEUE_USER,
    password: process.env.MESSAGE_QUEUE_PASSWORD
  },
  submitTopic: {
    name: process.env.SUBMIT_TOPIC_NAME,
    address: process.env.SUBMIT_TOPIC_ADDRESS,
    username: process.env.MESSAGE_QUEUE_USER,
    password: process.env.MESSAGE_QUEUE_PASSWORD
  },
  withdrawTopic: {
    name: process.env.WITHDRAW_TOPIC_NAME,
    address: process.env.WITHDRAW_TOPIC_ADDRESS,
    username: process.env.MESSAGE_QUEUE_USER,
    password: process.env.MESSAGE_QUEUE_PASSWORD
  },
  requestSBITopic: {
    name: process.env.REQUEST_SBI_TOPIC_NAME,
    address: process.env.REQUEST_SBI_TOPIC_ADDRESS,
    username: process.env.MESSAGE_QUEUE_USER,
    password: process.env.MESSAGE_QUEUE_PASSWORD
  },
  parcelSpatialTopic: {
    name: process.env.PARCELSPATIAL_TOPIC_NAME,
    address: process.env.PARCELSPATIAL_TOPIC_ADDRESS,
    username: process.env.MESSAGE_QUEUE_USER,
    password: process.env.MESSAGE_QUEUE_PASSWORD
  },
  parcelTopic: {
    name: process.env.PARCEL_TOPIC_NAME,
    address: process.env.PARCEL_TOPIC_ADDRESS,
    username: process.env.MESSAGE_QUEUE_USER,
    password: process.env.MESSAGE_QUEUE_PASSWORD
  },
  parcelStandardTopic: {
    name: process.env.PARCELSTANDARD_TOPIC_NAME,
    address: process.env.PARCELSTANDARD_TOPIC_ADDRESS,
    username: process.env.MESSAGE_QUEUE_USER,
    password: process.env.MESSAGE_QUEUE_PASSWORD
  },
  responseStandardsQueue: {
    name: process.env.STANDARDSRESPONSE_QUEUE_NAME,
    address: process.env.STANDARDSRESPONSE_QUEUE_ADDRESS,
    username: process.env.MESSAGE_QUEUE_USER,
    password: process.env.MESSAGE_QUEUE_PASSWORD,
    type: 'sessionQueue'
  },
  responseCalculateQueue: {
    name: process.env.CALCULATERESPONSE_QUEUE_NAME,
    address: process.env.CALCULATERESPONSE_QUEUE_ADDRESS,
    username: process.env.MESSAGE_QUEUE_USER,
    password: process.env.MESSAGE_QUEUE_PASSWORD,
    type: 'sessionQueue'
  },
  responseEligibilityQueue: {
    name: process.env.ELIGIBILITYRESPONSE_QUEUE_NAME,
    address: process.env.ELIGIBILITYRESPONSE_QUEUE_ADDRESS,
    username: process.env.MESSAGE_QUEUE_USER,
    password: process.env.MESSAGE_QUEUE_PASSWORD
  },
  responseParcelSpatialQueue: {
    name: process.env.PARCELSPATIALRESPONSE_QUEUE_NAME,
    address: process.env.PARCELSPATIALRESPONSE_QUEUE_ADDRESS,
    username: process.env.MESSAGE_QUEUE_USER,
    password: process.env.MESSAGE_QUEUE_PASSWORD
  },
  responseParcelQueue: {
    name: process.env.PARCELRESPONSE_QUEUE_NAME,
    address: process.env.PARCELRESPONSE_QUEUE_ADDRESS,
    username: process.env.MESSAGE_QUEUE_USER,
    password: process.env.MESSAGE_QUEUE_PASSWORD
  },
  responseParcelStandardQueue: {
    name: process.env.PARCELSTANDARDRESPONSE_QUEUE_NAME,
    address: process.env.PARCELSTANDARDRESPONSE_QUEUE_ADDRESS,
    username: process.env.MESSAGE_QUEUE_USER,
    password: process.env.MESSAGE_QUEUE_PASSWORD
  }
}

const mqResult = mqSchema.validate(mqConfig, {
  abortEarly: false
})

// Throw if config is invalid
if (mqResult.error) {
  throw new Error(`The message queue config is invalid. ${mqResult.error.message}`)
}

const eligibilityTopic = { ...mqResult.value.messageQueue, ...mqResult.value.eligibilityTopic }
const standardsTopic = { ...mqResult.value.messageQueue, ...mqResult.value.standardsTopic }
const validateTopic = { ...mqResult.value.messageQueue, ...mqResult.value.validateTopic }
const calculateTopic = { ...mqResult.value.messageQueue, ...mqResult.value.calculateTopic }
const submitTopic = { ...mqResult.value.messageQueue, ...mqResult.value.submitTopic }
const withdrawTopic = { ...mqResult.value.messageQueue, ...mqResult.value.withdrawTopic }
const requestSBITopic = { ...mqResult.value.messageQueue, ...mqResult.value.requestSBITopic }
const parcelSpatialTopic = { ...mqResult.value.messageQueue, ...mqResult.value.parcelSpatialTopic }
const parcelTopic = { ...mqResult.value.messageQueue, ...mqResult.value.parcelTopic }
const parcelStandardTopic = { ...mqResult.value.messageQueue, ...mqResult.value.parcelStandardTopic }
const responseStandardsQueue = { ...mqResult.value.messageQueue, ...mqResult.value.responseStandardsQueue }
const responseCalculateQueue = { ...mqResult.value.messageQueue, ...mqResult.value.responseCalculateQueue }
const responseEligibilityQueue = { ...mqResult.value.messageQueue, ...mqResult.value.responseEligibilityQueue }
const responseParcelSpatialQueue = { ...mqResult.value.messageQueue, ...mqResult.value.responseParcelSpatialQueue }
const responseParcelQueue = { ...mqResult.value.messageQueue, ...mqResult.value.responseParcelQueue }
const responseParcelStandardQueue = { ...mqResult.value.messageQueue, ...mqResult.value.responseParcelStandardQueue }

module.exports = {
  eligibilityTopic,
  standardsTopic,
  validateTopic,
  calculateTopic,
  submitTopic,
  withdrawTopic,
  requestSBITopic,
  parcelSpatialTopic,
  parcelTopic,
  parcelStandardTopic,
  responseStandardsQueue,
  responseCalculateQueue,
  responseEligibilityQueue,
  responseParcelSpatialQueue,
  responseParcelQueue,
  responseParcelStandardQueue
}
