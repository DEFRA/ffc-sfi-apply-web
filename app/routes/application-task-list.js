const joi = require('joi')
const sessionHandler = require('../session/session-handler')
const agreementStatus = require('../task-list')
const ViewModel = require('./models/application-task-list')

const validateCheckEligibility = (agreement) => {
  const schema = joi.object().keys({
    bps: joi.boolean().required(),
    landTypes: joi.array().required(),
    farmingPilot: joi.boolean().required(),
    test: joi.boolean().required()
  })

  return schema.validate(agreement)
}

module.exports = {
  method: 'GET',
  path: '/application-task-list',
  options: {
    handler: (request, h) => {
      const agreement = sessionHandler.get(request, 'agreement')
<<<<<<< HEAD
      console.log(agreement)
      return h.view('application-task-list')
=======
      console.log(agreement, validateCheckEligibility(agreement))
      return h.view('application-task-list', new ViewModel(agreementStatus))
>>>>>>> 0159346d6e20e7319183cb681e6500213ce7e686
    }
  }
}
