const routes = [].concat(
  require('../routes/healthy'),
  require('../routes/healthz'),
  require('../routes/static'),
  require('../routes/start'),
  require('../routes/home'),
  require('../routes/cookies'),
  require('../routes/application-task-list'),
  require('../routes/prototypes/v1/land-business-details/search-land-business-details'),
  require('../routes/prototypes/v1/land-business-details/land-business-details'),
  require('../routes/prototypes/v1/land-business-details/change-land-business-details'),
  require('../routes/prototypes/v1/check-eligibility/eligible'),
  require('../routes/prototypes/v1/payment-details/payment-frequency'),
  require('../routes/prototypes/v1/payment-details/bank-details'),
  require('../routes/prototypes/v1/funding-options/standards'),
  require('../routes/prototypes/v1/funding-options/actions'),
  require('../routes/prototypes/v1/funding-options/land-primary-actions'),
  require('../routes/prototypes/v1/funding-options/land-increased-actions'),
  require('../routes/prototypes/v1/funding-options/calculation'),
  require('../routes/prototypes/v1/funding-options/change'),
  require('../routes/prototypes/v1/funding-options/validation'),
  require('../routes/prototypes/v1/create-agreement/soil-assessment'),
  require('../routes/prototypes/v1/create-agreement/soil-protection'),
  require('../routes/prototypes/v1/create-agreement/soil-cover'),
  require('../routes/prototypes/v1/create-agreement/soil-management'),
  require('../routes/prototypes/v1/create-agreement/tillage'),
  require('../routes/prototypes/v1/create-agreement/soil-compaction'),
  require('../routes/prototypes/v1/create-agreement/soil-quality'),
  require('../routes/prototypes/v1/create-agreement/agreement-length'),
  require('../routes/prototypes/v1/create-agreement/review'),
  require('../routes/prototypes/v2/search-crn'),
  require('../routes/prototypes/v2/select-sbi'),
  require('../routes/prototypes/v2/organisation-details'),
  require('../routes/prototypes/v2/eligibility'),
  require('../routes/prototypes/v2/standards'),
  require('../routes/prototypes/v2/add-standards-parcels'),
  require('../routes/prototypes/v2/choose-level'),
  require('../routes/prototypes/v2/summary'),
  require('../routes/prototypes/v2/submit'),
  require('../routes/prototypes/v2/confirmation'),
  require('../routes/submit'),
  require('../routes/confirmation'),
  require('../routes/map'),
  require('../routes/map/parcel'),
  require('../routes/withdraw'),
  require('../routes/withdrawn'),
  require('../routes/prototypes/v1/agreement'),
  require('../routes/clear-session'),
  require('../routes/prototypes/v1/agreement/delete')
)

module.exports = {
  plugin: {
    name: 'router',
    register: (server, options) => {
      server.route(routes)
    }
  }
}
