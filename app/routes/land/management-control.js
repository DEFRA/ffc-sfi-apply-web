const Joi = require('joi')
const cache = require('../../cache')

module.exports = [{
  method: 'GET',
  path: '/management-control',
  options: {
    handler: async (request, h) => {
      return h.view('land/management-control')
    }
  }
},
{
  method: 'POST',
  path: '/management-control',
  options: {
    validate: {
      payload: Joi.object({
        hasManagementControl: Joi.boolean().required()
      }),
      failAction: async (request, h, error) => {
        return h.view('land/management-control', { error }).code(400).takeover()
      }
    },
    handler: async (request, h) => {
      const { hasManagementControl } = request.payload
      await cache.update(request, { agreement: { land: { hasManagementControl } } })

      // TODO: Handle if no management control
      return h.redirect('/task-list')
    }
  }
}]
