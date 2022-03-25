const cache = require('../../../cache')
const Joi = require('joi')
const ViewModel = require('./models/diversify-species')
const { save } = require('../../../agreement')

module.exports = [{
  method: 'GET',
  path: '/arable/multi-species-green-cover',
  options: {
    handler: async (request, h) => {
      const { agreement } = await cache.get(request)
      const { action } = agreement
      return h.view('actions/arable-soil/diversify-species', new ViewModel(action['sfi-arable-soil'].canDiversifySpecies))
    }
  }
},
{
  method: 'POST',
  path: '/arable/multi-species-green-cover',
  options: {
    validate: {
      payload: Joi.object().keys({
        canDiversifySpecies: Joi.boolean().required()
      }).unknown(true),
      failAction: async (request, h, error) => {
        const { agreement } = await cache.get(request)
        const { action } = agreement
        return h.view('actions/arable-soil/diversify-species', new ViewModel(action['sfi-arable-soil'].canDiversifySpecies, error)).code(400).takeover()
      }
    },
    handler: async (request, h) => {
      const canDiversifySpecies = request.payload.canDiversifySpecies
      await cache.update(request, { agreement: { action: { 'sfi-arable-soil': { canDiversifySpecies, optionalActionsComplete: true } } } })
      await save(request)
      return h.redirect('/arable/qualify-for-extra-arable-funding')
    }
  }
}]
