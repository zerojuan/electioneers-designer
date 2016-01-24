
export function batchGenerateFamily( state, action ) {
  
  return [
    ...state,
    {
      _id: Date.now().toString(),
      familyName: 'Something',
      fatherName: 'Hello'
    }
  ];
}
