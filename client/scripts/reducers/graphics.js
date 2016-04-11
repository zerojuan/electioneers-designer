
export function deleteImage( state, action ) {
  // search which item to delete
  const { imageType, data } = action;
  const retVal = _.cloneDeep( state );
  let index = _.findIndex( retVal[ imageType ], ( fileData ) =>
    fileData.id === data.id );

  console.log( state );
  retVal[ imageType ] = [
    ...retVal[ imageType ].slice( 0, index ),
    ...retVal[ imageType ].slice( index + 1 )
  ];
  console.log( retVal );

  return retVal;
};
