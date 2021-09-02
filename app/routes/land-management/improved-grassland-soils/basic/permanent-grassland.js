module.exports = [{
  method: 'GET',
  path: '/improved-grassland-soils/basic/permanent-grassland',
  options: {
    handler: async (request, h) => {
      return h.view('land-management/improved-grassland-soils/basic/permanent-grassland')
    }
  }
},
{
  method: 'POST',
  path: '/improved-grassland-soils/basic/permanent-grassland',
  options: {
    handler: async (request, h) => {
      return h.redirect('/improved-grassland-soils/basic/herbs-legumes')
    }
  }
}]
