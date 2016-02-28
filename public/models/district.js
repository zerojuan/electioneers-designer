exports.module = {
  convert: function( district ) {
    console.log( 'Converting....' );
    return {
      _id: district.id || district._id,
      name: district.name,
      neighbors: district.neighbors
    };
  }
};
