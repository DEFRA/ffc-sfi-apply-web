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
  require('../routes/create-agreement/soil-assessment'),
  require('../routes/create-agreement/soil-protection'),
  require('../routes/create-agreement/soil-cover'),
  require('../routes/create-agreement/soil-management'),
  require('../routes/create-agreement/tillage'),
  require('../routes/create-agreement/soil-compaction'),
  require('../routes/create-agreement/soil-quality'),
  require('../routes/create-agreement/agreement-length')
)

module.exports = {
  plugin: {
    name: 'router',
    register: (server, options) => {
      server.route(routes)
    }
  }
}
