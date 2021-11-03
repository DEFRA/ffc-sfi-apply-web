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
  require('../routes/land-business-details/management-control'),
  require('../routes/relationship'),
  require('../routes/save-application'),
  require('../routes/submit-application'),
  require('../routes/confirmation'),
  require('../routes/funding-options/what-funding'),
  require('../routes/funding-options/funding-overview'),
  require('../routes/funding-options/how-much'),
  require('../routes/funding-options/what-payment-level'),
  require('../routes/land-management/arable-soils/basic/basic-overview'),
  require('../routes/land-management/arable-soils/basic/soil-assessment'),
  require('../routes/land-management/arable-soils/basic/soil-compaction'),
  require('../routes/land-management/arable-soils/basic/green-cover'),
  require('../routes/land-management/arable-soils/basic/organic-matter'),
  require('../routes/land-management/arable-soils/basic/basic-end'),
  require('../routes/land-management/arable-soils/medium/medium-overview'),
  require('../routes/land-management/arable-soils/medium/soil-assessment'),
  require('../routes/land-management/arable-soils/medium/soil-compaction'),
  require('../routes/land-management/arable-soils/medium/green-cover'),
  require('../routes/land-management/arable-soils/medium/organic-matter'),
  require('../routes/land-management/arable-soils/medium/tillage'),
  require('../routes/land-management/arable-soils/medium/medium-end'),
  require('../routes/land-management/arable-soils/high/high-overview'),
  require('../routes/land-management/arable-soils/high/soil-assessment'),
  require('../routes/land-management/arable-soils/high/soil-compaction'),
  require('../routes/land-management/arable-soils/high/green-cover'),
  require('../routes/land-management/arable-soils/high/organic-matter'),
  require('../routes/land-management/arable-soils/high/tillage'),
  require('../routes/land-management/arable-soils/high/soil-management'),
  require('../routes/land-management/arable-soils/high/high-end'),
  require('../routes/land-management/payment-schedule'),
  require('../routes/land-management/check-your-answers'),
  require('../routes/land-management/review-your-agreement'),
  require('../routes/land-management/improved-grassland-soils/basic/basic-overview'),
  require('../routes/land-management/improved-grassland-soils/basic/soil-assessment'),
  require('../routes/land-management/improved-grassland-soils/basic/soil-structure'),
  require('../routes/land-management/improved-grassland-soils/basic/permanent-grassland'),
  require('../routes/land-management/improved-grassland-soils/basic/herbs-legumes'),
  require('../routes/land-management/improved-grassland-soils/basic/stocking-density'),
  require('../routes/land-management/improved-grassland-soils/basic/basic-end'),
  require('../routes/land-management/improved-grassland-soils/medium/medium-overview'),
  require('../routes/land-management/improved-grassland-soils/medium/soil-assessment'),
  require('../routes/land-management/improved-grassland-soils/medium/soil-structure'),
  require('../routes/land-management/improved-grassland-soils/medium/permanent-grassland'),
  require('../routes/land-management/improved-grassland-soils/medium/herbs-legumes'),
  require('../routes/land-management/improved-grassland-soils/medium/stocking-density'),
  require('../routes/land-management/improved-grassland-soils/medium/medium-end'),
  require('../routes/land-management/improved-grassland-soils/high/high-overview'),
  require('../routes/land-management/improved-grassland-soils/high/soil-assessment'),
  require('../routes/land-management/improved-grassland-soils/high/soil-structure'),
  require('../routes/land-management/improved-grassland-soils/high/permanent-grassland'),
  require('../routes/land-management/improved-grassland-soils/high/herbs-legumes'),
  require('../routes/land-management/improved-grassland-soils/high/stocking-density'),
  require('../routes/land-management/improved-grassland-soils/high/soil-management'),
  require('../routes/land-management/improved-grassland-soils/high/high-end'),
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
