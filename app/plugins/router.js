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
  require('../routes/land-business-details/confirm-details'),
  require('../routes/land-business-details/management-control'),
  require('../routes/land-business-details/change-land-details'),
  require('../routes/relationship'),
  require('../routes/save-application'),
  require('../routes/submit-application'),
  require('../routes/confirmation'),
  require('../routes/funding-options/what-funding'),
  require('../routes/funding-options/funding-overview'),
  require('../routes/funding-options/how-much'),
  require('../routes/funding-options/what-payment-level')
)

module.exports = {
  plugin: {
    name: 'router',
    register: (server, options) => {
      server.route(routes)
    }
  }
}
