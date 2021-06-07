const joi = require('joi')

module.exports = joi.object({
  bps: joi.bool().required(),
  landTypes: joi.alternatives().try(joi.array().required(), joi.string().required()),
  farmingPilot: joi.bool().required()
})
