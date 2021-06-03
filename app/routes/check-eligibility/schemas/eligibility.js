const joi = require('joi')

module.exports = joi.object({
  bps: joi.bool().required(),
  landTypes: joi.array().required(),
  farmingPilot: joi.bool().required()
})
