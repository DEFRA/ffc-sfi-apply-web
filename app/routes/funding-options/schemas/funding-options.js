const joi = require('joi')

module.exports = joi.object({
  standards: joi.array().required(),
  primaryActions: joi.array().required(),
  landInHectares: joi.number().required(),
  greenCover: joi.number().required(),
  permanentGrass: joi.number().required()
})
