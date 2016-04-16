module.exports = {
  convert: function( family ) {
    // pass through for now
    return family;
  },
  fillDistrictId: function( family, districts ) {
    if ( !family.districtId ) {
      family.districtId = districts[ 0 ]._id;
    }

    return family;
  }
};
