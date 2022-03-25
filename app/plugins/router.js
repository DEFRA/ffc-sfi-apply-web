const routes = [].concat(
  require('../routes/healthy'),
  require('../routes/healthz'),
  require('../routes/static'),
  require('../routes/home'),
  require('../routes/cookies'),
  require('../routes/identity/login'),
  require('../routes/identity/logout'),
  require('../routes/start-application'),
  require('../routes/eligible-organisations'),
  require('../routes/task-list'),
  require('../routes/land/confirm-details'),
  require('../routes/land/management-control'),
  require('../routes/land/change-land-details'),
  require('../routes/funding/what-funding'),
  require('../routes/actions/arable-soil/organic-matter'),
  require('../routes/actions/arable-soil/produce-plan'),
  require('../routes/actions/arable-soil/green-cover'),
  require('../routes/actions/arable-soil/add-organic-matter'),
  require('../routes/actions/arable-soil/select-parcels'),
  require('../routes/actions/arable-soil/qualify'),
  require('../routes/save'),
  require('../routes/declaration'),
  require('../routes/confirmation')
)

module.exports = {
  plugin: {
    name: 'router',
    register: (server, options) => {
      server.route(routes)
    }
  }
}
