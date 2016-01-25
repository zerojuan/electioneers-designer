
const Surnames = [
  'Santos',
  'Reyes',
  'Cruz',
  'Bautista',
  'Ocampo',
  'Garcia',
  'Mendoza',
  'Torres',
  'Tomas',
  'Andrada',
  'Castillo',
  'Flores',
  'Villanueva',
  'Ramos',
  'Castro',
  'Rivera',
  'Aquino',
  'Navarro',
  'Salazar',
  'Mercado',
  'de la Cruz',
  'de los Reyes',
  'del Rosario',
  'de los Santos',
  'de Guzman',
  'de Castro',
  'de la Rosa',
  'de Asis',
  'de Rosales'
];

const MaleNames = [
  'Adam',
  'Albert',
  'Andrew',
  'Bart',
  'Bert',
  'Bogart',
  'Carlos',
  'Carl',
  'Carey',
  'Duke',
  'Duckey',
  'David',
  'Dick',
  'Filipe',
  'Ilia'
];

function pickRandom( arr ) {
  return arr[
    Math.floor( Math.random() * arr.length ) ];
}

function guid() {
  function s4() {
    return Math.floor( (1 + Math.random() ) * 0x10000 )
      .toString( 16 )
      .substring( 1 );
  }
  return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
    s4() + '-' + s4() + s4() + s4();
}

function generateFamily() {
  return {
    _id: guid(),
    familyName: pickRandom( Surnames ),
    fatherName: pickRandom( MaleNames ),
    wealth: Math.floor( Math.random() * 100 ),
    intelligence: Math.floor( Math.random() * 100 ),
    charm: Math.floor( Math.random() * 100 ),
    leadership: Math.floor( Math.random() * 100 )
  };
}

export function batchGenerateFamily( state, action ) {
  // check for size
  var families = [];
  for ( let i = 0; i < action.count; i++ ) {
    families.push( generateFamily() );
  }

  return [
    ...state,
    ...families
  ];
}
