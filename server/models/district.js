module.exports = {
  convert: function( district ) {
    return {
      _id: district.id || district._id,
      name: district.name,
      neighbors: district.neighbors,
      position: {
        x: district.position ? district.position.x : 0,
        y: district.position ? district.position.y : 0
      }
    };
  }
};
