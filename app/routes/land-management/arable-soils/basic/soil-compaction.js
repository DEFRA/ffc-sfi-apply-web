module.exports = [{
  method: 'GET',
  path: '/arable-soils/basic/soil-compaction',
  options: {
    handler: async (request, h) => {
      return h.view('land-management/arable-soils/basic/soil-compaction')
    }
  }
},
{
  method: 'POST',
  path: '/arable-soils/basic/soil-compaction',
  options: {
    handler: async (request, h) => {
      return h.redirect('/arable-soils/basic/green-cover')
    }
  }
}]
