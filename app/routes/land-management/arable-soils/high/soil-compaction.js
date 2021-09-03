module.exports = [{
  method: 'GET',
  path: '/arable-soils/high/soil-compaction',
  options: {
    handler: async (request, h) => {
      return h.view('land-management/arable-soils/high/soil-compaction')
    }
  }
},
{
  method: 'POST',
  path: '/arable-soils/high/soil-compaction',
  options: {
    handler: async (request, h) => {
      return h.redirect('/arable-soils/high/green-cover')
    }
  }
}]
