module.exports = [{
  method: 'GET',
  path: '/arable-soils/basic/soil-assessment',
  options: {
    handler: async (request, h) => {
      return h.view('land-management/arable-soils/basic/soil-assessment')
    }
  }
},
{
  method: 'POST',
  path: '/arable-soils/basic/soil-assessment',
  options: {
    handler: async (request, h) => {
      return h.redirect('/arable-soils/basic/soil-compaction')
    }
  }
}]
