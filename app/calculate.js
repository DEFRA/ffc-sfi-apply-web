const cache = require('./cache')
const config = require('./config')
const { sendMessage, receiveMessage } = require('./messaging')
const { v4: uuidv4 } = require('uuid')
const util = require('util')

const getCalculation = async (request, standardCode, level, additional = false) => {
  const { agreement } = await cache.get(request)
  const { action } = agreement
  const calculation = await requestCalculation(standardCode, action[standardCode].landCovers)
  const { paymentAmount, rate } = calculation[level]
  await cache.update(request, { action: { standardCode: { paymentAmount, rate } } })
  return { paymentAmount, rate }
}

const requestCalculation = async (standardCode, landCovers) => {
  const messageId = uuidv4()
  const body = { code: standardCode, landCovers }

  await sendMessage(body, 'uk.gov.sfi.calculation.request', config.calculateTopic, { messageId })
  console.log('Calculation request sent:', util.inspect(body, false, null, true))

  const response = await receiveMessage(messageId, config.responseCalculateQueue)

  if (response) {
    console.info('Calculation response received:', util.inspect(response, false, null, true))
    return response
  }
}

module.exports = getCalculation
