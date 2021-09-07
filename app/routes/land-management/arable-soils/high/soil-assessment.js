module.exports = [{
  method: 'GET',
  path: '/arable-soils/high/soil-assessment',
  options: {
    handler: async (request, h) => {
      return h.view('land-management/arable-soils/high/soil-assessment')
    }
  }
},
{
  method: 'POST',
  path: '/arable-soils/high/soil-assessment',
  options: {
    handler: async (request, h) => {
      return h.redirect('/arable-soils/high/soil-compaction')
    }
  }
}]
