const joi = require('joi')

module.exports = joi.object({
  soilAssessment: joi.string().required(),
  soilProtection: joi.string().required(),
  soilCover: joi.string().required(),
  soilManagement: joi.string().required(),
  tillage: joi.string().required(),
  soilCompaction: joi.string().required(),
  soilQuality: joi.string().required()
})
