const joi = require('joi')

module.exports = joi.object({
  sbi: joi.number().required(),
  standards: joi.array().items().required().single().required(),
  primaryActions: joi.array().required(),
  landInHectares: joi.number().required(),
  greenCover: joi.number().required(),
  permanentGrass: joi.number().required(),
  paymentAmount: joi.number().required(),
  soilAssessment: joi.string().required(),
  soilProtection: joi.string().required(),
  soilCover: joi.string().required(),
  soilManagement: joi.string().required(),
  tillage: joi.string().required(),
  soilCompaction: joi.string().required(),
  soilQuality: joi.string().required(),
  paymentFrequency: joi.string().required(),
  agreementNumber: joi.string().required()
})
