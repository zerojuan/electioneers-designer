module.exports = {
  convert: function( district ) {
    return {
      _id: district.id || district._id,
      name: district.name,
      neighbors: district.neighbors
    };
  }
};
