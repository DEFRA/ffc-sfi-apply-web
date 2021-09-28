const routes = [].concat(
  require('../routes/healthy'),
  require('../routes/healthz'),
  require('../routes/static'),
  require('../routes/start'),
  require('../routes/home'),
  require('../routes/cookies'),
  require('../routes/sign-in'),
  require('../routes/which-business'),
  require('../routes/application-task-list'),
  require('../routes/land-business-details/confirm-details'),
  require('../routes/land-business-details/relationship'),
  require('../routes/save-application'),
  require('../routes/submit-application'),
  require('../routes/confirmation'),
  require('../routes/funding-options/what-funding'),
  require('../routes/funding-options/funding-overview'),
  require('../routes/funding-options/how-much'),
  require('../routes/funding-options/what-payment-level'),
  require('../routes/land-management/arable-soils/overview'),
  require('../routes/land-management/arable-soils/soil-assessment'),
  require('../routes/land-management/arable-soils/soil-compaction'),
  require('../routes/land-management/arable-soils/green-cover'),
  require('../routes/land-management/arable-soils/organic-matter'),
  require('../routes/land-management/arable-soils/tillage'),
  require('../routes/land-management/arable-soils/soil-management'),
  require('../routes/land-management/arable-soils/end'),
  require('../routes/land-management/payment-schedule'),
  require('../routes/land-management/check-your-answers'),
  require('../routes/land-management/review-your-agreement'),
  require('../routes/land-management/improved-grassland-soils/overview'),
  require('../routes/land-management/improved-grassland-soils/soil-assessment'),
  require('../routes/land-management/improved-grassland-soils/soil-structure'),
  require('../routes/land-management/improved-grassland-soils/permanent-grassland'),
  require('../routes/land-management/improved-grassland-soils/herbs-legumes'),
  require('../routes/land-management/improved-grassland-soils/stocking-density'),
  require('../routes/land-management/improved-grassland-soils/soil-management'),
  require('../routes/land-management/improved-grassland-soils/end'),
  require('../routes/map'),
  require('../routes/map/parcel'),
  require('../routes/withdraw'),
  require('../routes/withdrawn'),
  require('../routes/clear-session')
)

module.exports = {
  plugin: {
    name: 'router',
    register: (server, options) => {
      server.route(routes)
    }
  }
}
