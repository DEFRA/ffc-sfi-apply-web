const cache = require('../../../cache')
const Joi = require('joi')
const ViewModel = require('./models/produce-plan')
const { save } = require('../../../agreement')

module.exports = [{
  method: 'GET',
  path: '/arable/produce-plan',
  options: {
    handler: async (request, h) => {
      const { agreement } = await cache.get(request)
      const { action } = agreement
      return h.view('actions/arable-soil/produce-plan', new ViewModel(action['sfi-arable-soil'].canProducePlan))
    }
  }
},
{
  method: 'POST',
  path: '/arable/produce-plan',
  options: {
    validate: {
      payload: Joi.object().keys({
        canProducePlan: Joi.boolean().required()
      }).unknown(true),
      failAction: async (request, h, error) => {
        const { agreement } = await cache.get(request)
        const { action } = agreement
        return h.view('actions/arable-soil/produce-plan', new ViewModel(action['sfi-arable-soil'].canProducePlan, error)).code(400).takeover()
      }
    },
    handler: async (request, h) => {
      const canProducePlan = request.payload.canProducePlan
      await cache.update(request, { agreement: { action: { 'sfi-arable-soil': { canProducePlan } } } })
      await save(request)
      return h.redirect('/task-list')
    }
  }
}]
