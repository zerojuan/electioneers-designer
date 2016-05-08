import _ from 'lodash';


export function deleteImage( state, action ) {
  // search which item to delete
  const { imageType, data } = action;
  const retVal = _.cloneDeep( state );
  let index = _.findIndex( retVal[ imageType ], ( fileData ) =>
    fileData.id === data.id );

  retVal[ imageType ] = [
    ...retVal[ imageType ].slice( 0, index ),
    ...retVal[ imageType ].slice( index + 1 )
  ];

  return retVal;
};

export function editImage( state, action ) {
  // search which item to get
  const { imageType, data } = action;
  const retVal = _.cloneDeep( state );
  let index = _.findIndex( retVal[ imageType ], ( fileData ) =>
    fileData.id === data.id );

  retVal[ imageType ] = [
    ...retVal[ imageType ].slice( 0, index ),
    data,
    ...retVal[ imageType ].slice( index + 1 )
  ];

  return retVal;
};
