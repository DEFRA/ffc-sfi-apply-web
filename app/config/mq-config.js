const joi = require('joi')

const mqSchema = joi.object({
  messageQueue: {
    host: joi.string().default('localhost'),
    useCredentialChain: joi.bool().default(false),
    type: joi.string(),
    appInsights: joi.object(),
    username: joi.string(),
    password: joi.string()
  },
  eligibilityTopic: {
    address: joi.string()
  },
  standardsTopic: {
    address: joi.string()
  },
  validateTopic: {
    address: joi.string()
  },
  calculateTopic: {
    address: joi.string()
  },
  submitTopic: {
    address: joi.string()
  },
  withdrawTopic: {
    address: joi.string()
  },
  requestSBITopic: {
    address: joi.string()
  },
  parcelSpatialTopic: {
    address: joi.string()
  },
  parcelTopic: {
    address: joi.string()
  },
  parcelStandardTopic: {
    address: joi.string()
  },
  responseStandardsQueue: {
    address: joi.string()
  },
  responseCalculateQueue: {
    address: joi.string()
  },
  responseEligibilityQueue: {
    address: joi.string()
  },
  responseParcelSpatialQueue: {
    address: joi.string()
  },
  responseParcelQueue: {
    address: joi.string()
  },
  responseParcelStandardQueue: {
    address: joi.string()
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
  requestSBITopic: {
    address: process.env.REQUEST_SBI_TOPIC_ADDRESS
  },
  parcelSpatialTopic: {
    address: process.env.PARCELSPATIAL_TOPIC_ADDRESS
  },
  parcelTopic: {
    address: process.env.PARCEL_TOPIC_ADDRESS
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
  responseParcelQueue: {
    address: process.env.PARCELRESPONSE_QUEUE_ADDRESS
  },
  responseParcelStandardQueue: {
    address: process.env.PARCELSTANDARDRESPONSE_QUEUE_ADDRESS
  }
}

const mqResult = mqSchema.validate(mqConfig, {
  abortEarly: false
})

// Throw if config is invalid
if (mqResult.error) {
  throw new Error(`The message queue config is invalid. ${mqResult.error.message}`)
}

const calculateTopic = { ...mqResult.value.messageQueue, ...mqResult.value.calculateTopic }
const eligibilityTopic = { ...mqResult.value.messageQueue, ...mqResult.value.eligibilityTopic }
const parcelSpatialTopic = { ...mqResult.value.messageQueue, ...mqResult.value.parcelSpatialTopic }
const parcelStandardTopic = { ...mqResult.value.messageQueue, ...mqResult.value.parcelStandardTopic }
const parcelTopic = { ...mqResult.value.messageQueue, ...mqResult.value.parcelTopic }
const requestSBITopic = { ...mqResult.value.messageQueue, ...mqResult.value.requestSBITopic }
const responseCalculateQueue = { ...mqResult.value.messageQueue, ...mqResult.value.responseCalculateQueue }
const responseEligibilityQueue = { ...mqResult.value.messageQueue, ...mqResult.value.responseEligibilityQueue }
const responseParcelQueue = { ...mqResult.value.messageQueue, ...mqResult.value.responseParcelQueue }
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
  parcelTopic,
  requestSBITopic,
  responseCalculateQueue,
  responseEligibilityQueue,
  responseParcelQueue,
  responseParcelSpatialQueue,
  responseParcelStandardQueue,
  responseStandardsQueue,
  standardsTopic,
  submitTopic,
  validateTopic,
  withdrawTopic
}
