const routes = [].concat(
  require('../routes/healthy'),
  require('../routes/healthz'),
  require('../routes/static'),
  require('../routes/home'),
  require('../routes/cookies'),
  require('../routes/identity/sign-in'),
  require('../routes/identity/sign-out'),
  require('../routes/start-application'),
  require('../routes/eligible-organisations'),
  require('../routes/task-list'),
  require('../routes/land/confirm-details'),
  require('../routes/land/management-control'),
  require('../routes/land/change-land-details'),
  require('../routes/relationship'),
  require('../routes/save-application'),
  require('../routes/submit-application'),
  require('../routes/confirmation'),
  require('../routes/funding/what-funding'),
  require('../routes/funding/funding-overview'),
  require('../routes/funding/how-much'),
  require('../routes/funding/what-payment-level')
)

module.exports = {
  plugin: {
    name: 'router',
    register: (server, options) => {
      server.route(routes)
    }
  }
}
