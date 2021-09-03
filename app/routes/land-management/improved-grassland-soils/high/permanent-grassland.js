module.exports = [{
  method: 'GET',
  path: '/improved-grassland-soils/high/permanent-grassland',
  options: {
    handler: async (request, h) => {
      return h.view('land-management/improved-grassland-soils/high/permanent-grassland')
    }
  }
},
{
  method: 'POST',
  path: '/improved-grassland-soils/high/permanent-grassland',
  options: {
    handler: async (request, h) => {
      return h.redirect('/improved-grassland-soils/high/herbs-legumes')
    }
  }
}]
