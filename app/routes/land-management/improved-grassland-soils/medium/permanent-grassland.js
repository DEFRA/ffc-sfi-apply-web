module.exports = [{
  method: 'GET',
  path: '/improved-grassland-soils/medium/permanent-grassland',
  options: {
    handler: async (request, h) => {
      return h.view('land-management/improved-grassland-soils/medium/permanent-grassland')
    }
  }
},
{
  method: 'POST',
  path: '/improved-grassland-soils/medium/permanent-grassland',
  options: {
    handler: async (request, h) => {
      return h.redirect('/improved-grassland-soils/medium/herbs-legumes')
    }
  }
}]
