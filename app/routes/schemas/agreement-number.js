const Joi = require('joi')

module.exports = Joi.object({
  agreementNumber: Joi.string().pattern(/^SFIA[0-9]{6}$/)
}).error(errors => {
  errors.forEach(err => {
    err.message = 'The agreement number is invalid.'
  })
  return errors
})
