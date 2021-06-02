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

module.exports = {
  eligibilityTopic,
  standardsTopic,
  validateTopic,
  calculateTopic,
  submitTopic
}
