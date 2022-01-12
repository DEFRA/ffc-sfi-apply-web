const cache = require('../../../cache')
const Joi = require('joi')
const ViewModel = require('./models/add-organic-matter')
const { save } = require('../../../agreement')

module.exports = [{
  method: 'GET',
  path: '/arable/add-organic-matter',
  options: {
    handler: async (request, h) => {
      const { agreement } = await cache.get(request)
      const { action } = agreement
      return h.view('actions/arable-soil/add-organic-matter', new ViewModel(action['sfi-arable-soil'].canAddOrganicMatter))
    }
  }
},
{
  method: 'POST',
  path: '/arable/add-organic-matter',
  options: {
    validate: {
      payload: Joi.object().keys({
        canAddOrganicMatter: Joi.boolean().required()
      }).unknown(true),
      failAction: async (request, h, error) => {
        const { agreement } = await cache.get(request)
        const { action } = agreement
        return h.view('actions/arable-soil/add-organic-matter', new ViewModel(action['sfi-arable-soil'].canAddOrganicMatter, error)).code(400).takeover()
      }
    },
    handler: async (request, h) => {
      const canAddOrganicMatter = request.payload.canAddOrganicMatter
      await cache.update(request, { agreement: { action: { 'sfi-arable-soil': { canAddOrganicMatter, actionsComplete: true } } } })
      await save(request)
      return h.redirect('/task-list')
    }
  }
}]
