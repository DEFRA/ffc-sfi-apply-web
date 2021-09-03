module.exports = [{
  method: 'GET',
  path: '/arable-soils/medium/soil-assessment',
  options: {
    handler: async (request, h) => {
      return h.view('land-management/arable-soils/medium/soil-assessment')
    }
  }
},
{
  method: 'POST',
  path: '/arable-soils/medium/soil-assessment',
  options: {
    handler: async (request, h) => {
      return h.redirect('/arable-soils/medium/soil-compaction')
    }
  }
}]
