const cache = require('../../../cache')
const Joi = require('joi')
const ViewModel = require('./models/organic-matter')
const { save } = require('../../../agreement')

module.exports = [{
  method: 'GET',
  path: '/arable/organic-matter',
  options: {
    handler: async (request, h) => {
      const { agreement } = await cache.get(request)
      const { action } = agreement
      return h.view('actions/arable-soil/organic-matter', new ViewModel(action['sfi-arable-soil'].canTestOrganicMatter))
    }
  }
},
{
  method: 'POST',
  path: '/arable/organic-matter',
  options: {
    validate: {
      payload: Joi.object().keys({
        canTestOrganicMatter: Joi.boolean().required()
      }).unknown(true),
      failAction: async (request, h, error) => {
        const { agreement } = await cache.get(request)
        const { action } = agreement
        return h.view('actions/arable-soil/organic-matter', new ViewModel(action['sfi-arable-soil'].canTestOrganicMatter), error).code(400).takeover()
      }
    },
    handler: async (request, h) => {
      const canTestOrganicMatter = request.payload.canTestOrganicMatter
      await cache.update(request, { agreement: { action: { 'sfi-arable-soil': { canTestOrganicMatter } } } })
      await save(request)
      return h.redirect('/task-list')
    }
  }
}]
