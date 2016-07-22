import { guid } from './utils';

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

function generateFamily( districts ) {
  // set default district
  const districtId = districts[ 0 ]._id;

  return {
    _id: guid(),
    familyName: pickRandom( Surnames ),
    fatherName: pickRandom( MaleNames ),
    wealth: Math.floor( Math.random() * 100 ),
    intelligence: Math.floor( Math.random() * 100 ),
    charm: Math.floor( Math.random() * 100 ),
    leadership: Math.floor( Math.random() * 100 ),
    connections: [],
    districtId: districtId
  };
}

function updateFamily( families, family ) {
  // find item index
  const index = families.findIndex( ( el ) => el._id === family._id );

  return [
    ...families.slice( 0, index ),
    family,
    ...families.slice( index + 1 )
  ];
}

export function formatFamilyData( state, action ) {
  // make sure every family has the correct properties
  if ( !action.population ) {
    return [];
  }

  return action.population.map( ( family ) => {
    if ( !family.connections ) {
      family.connections = [];
    }

    return family;
  });
}

export function batchGenerateFamily( state, action ) {
  // check for size
  var families = [];
  for ( let i = 0; i < action.count; i++ ) {
    families.push( generateFamily( action.districts ) );
  }

  return [
    ...state,
    ...families
  ];
}

export function addFamily( state, action ) {
  return state;
}

export function editFamily( state, action ) {
  const family = action.family;

  // find item index
  return updateFamily( state, family );
}

export function pairFamily( state, action ) {
  const { familyA, familyB } = action;

  return updateFamily(
    updateFamily( state, familyA ),
    familyB );
}

export function deleteFamily( state, action ) {
  // return only the families not selected for deletion
  if( !action.family.connections.length ) {
    return state.filter( i => i._id !== action.family._id );
  }

  return state;
}
