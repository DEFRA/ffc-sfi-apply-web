const cache = require('../../../cache')
const Joi = require('joi')
const ViewModel = require('./models/green-cover')
const { save } = require('../../../agreement')

module.exports = [{
  method: 'GET',
  path: '/arable/green-cover',
  options: {
    handler: async (request, h) => {
      const { agreement } = await cache.get(request)
      const { action } = agreement
      return h.view('actions/arable-soil/green-cover', new ViewModel(action['sfi-arable-soil'].canHaveGreenCover))
    }
  }
},
{
  method: 'POST',
  path: '/arable/green-cover',
  options: {
    validate: {
      payload: Joi.object().keys({
        canHaveGreenCover: Joi.boolean().required()
      }).unknown(true),
      failAction: async (request, h, error) => {
        const { agreement } = await cache.get(request)
        const { action } = agreement
        return h.view('actions/arable-soil/green-cover', new ViewModel(action['sfi-arable-soil'].canHaveGreenCover, error)).code(400).takeover()
      }
    },
    handler: async (request, h) => {
      const canHaveGreenCover = request.payload.canHaveGreenCover
      await cache.update(request, { agreement: { action: { 'sfi-arable-soil': { canHaveGreenCover } } } })
      await save(request)
      return h.redirect('/arable/add-organic-matter')
    }
  }
}]
