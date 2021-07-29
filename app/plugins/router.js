const routes = [].concat(
  require('../routes/healthy'),
  require('../routes/healthz'),
  require('../routes/static'),
  require('../routes/start'),
  require('../routes/home'),
  require('../routes/cookies'),
  require('../routes/application-task-list'),
  require('../routes/land-business-details/search-land-business-details'),
  require('../routes/land-business-details/land-business-details'),
  require('../routes/land-business-details/change-land-business-details'),
  require('../routes/check-eligibility/eligible'),
  require('../routes/payment-details/payment-frequency'),
  require('../routes/payment-details/bank-details'),
  require('../routes/funding-options/standards'),
  require('../routes/funding-options/actions'),
  require('../routes/funding-options/land-primary-actions'),
  require('../routes/funding-options/land-increased-actions'),
  require('../routes/funding-options/calculation'),
  require('../routes/funding-options/change'),
  require('../routes/funding-options/validation'),
  require('../routes/create-agreement/soil-assessment'),
  require('../routes/create-agreement/soil-protection'),
  require('../routes/create-agreement/soil-cover'),
  require('../routes/create-agreement/soil-management'),
  require('../routes/create-agreement/tillage'),
  require('../routes/create-agreement/soil-compaction'),
  require('../routes/create-agreement/soil-quality'),
  require('../routes/create-agreement/agreement-length'),
  require('../routes/create-agreement/review'),
  require('../routes/v2/search-crn'),
  require('../routes/v2/select-sbi'),
  require('../routes/v2/organisation-details'),
  require('../routes/v2/eligibility'),
  require('../routes/v2/standards'),
  require('../routes/v2/add-standards-parcels'),
  require('../routes/v2/choose-level'),
  require('../routes/v2/summary'),
  require('../routes/v2/submit'),
  require('../routes/v2/confirmation'),
  require('../routes/submit'),
  require('../routes/confirmation'),
  require('../routes/map'),
  require('../routes/map/parcel'),
  require('../routes/withdraw'),
  require('../routes/withdrawn'),
  require('../routes/agreement'),
  require('../routes/clear-session'),
  require('../routes/agreement/delete')
)

module.exports = {
  plugin: {
    name: 'router',
    register: (server, options) => {
      server.route(routes)
    }
  }
}
