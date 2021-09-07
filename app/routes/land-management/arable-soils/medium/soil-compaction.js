module.exports = [{
  method: 'GET',
  path: '/arable-soils/medium/soil-compaction',
  options: {
    handler: async (request, h) => {
      return h.view('land-management/arable-soils/medium/soil-compaction')
    }
  }
},
{
  method: 'POST',
  path: '/arable-soils/medium/soil-compaction',
  options: {
    handler: async (request, h) => {
      return h.redirect('/arable-soils/medium/green-cover')
    }
  }
}]
