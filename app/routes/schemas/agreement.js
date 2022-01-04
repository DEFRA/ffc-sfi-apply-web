const Joi = require('joi')

module.exports = Joi.object({
  sbi: Joi.number().required(),
  standards: Joi.array().items().required().single().required(),
  primaryActions: Joi.array().required(),
  paymentAmount: Joi.number().required(),
  soilAssessment: Joi.string().required(),
  soilProtection: Joi.string().required(),
  soilCover: Joi.string().required(),
  soilManagement: Joi.string().required(),
  tillage: Joi.string().required(),
  soilCompaction: Joi.string().required(),
  soilQuality: Joi.string().required(),
  paymentFrequency: Joi.string().required(),
  agreementNumber: Joi.string().required()
})
