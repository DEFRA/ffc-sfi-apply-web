const routes = [].concat(
  require('../routes/healthy'),
  require('../routes/healthz'),
  require('../routes/static'),
  require('../routes/home'),
  require('../routes/cookies'),
  require('../routes/application-task-list'),
  require('../routes/check-eligibility/bps'),
  require('../routes/check-eligibility/land-types'),
  require('../routes/check-eligibility/farming-pilot'),
  require('../routes/check-eligibility/eligible'),
  require('../routes/funding-options/what-funding'),
  require('../routes/funding-options/actions-arable-all'),
  require('../routes/funding-options/land-primary-actions'),
  require('../routes/funding-options/land-increased-actions'),
  require('../routes/funding-options/application-value'),
  require('../routes/funding-options/change')
)

module.exports = {
  plugin: {
    name: 'router',
    register: (server, options) => {
      server.route(routes)
    }
  }
}
