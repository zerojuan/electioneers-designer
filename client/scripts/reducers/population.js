
export function batchGenerateFamily( state, action ) {
  console.log( 'What is this? ' );
  return [
    ...state,
    {
      _id: 'Something1',
      familyName: 'Something',
      fatherName: 'Hello'
    }
  ];
}
