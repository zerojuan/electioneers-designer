/** ====================================
 * Philippine Presidential Election 2016
 * Smartmatic Ltd, 2016
 * ====================================*/

const BINAY   = 0;
const MIRIAM  = 1;
const POE     = 2;
const DUTERTE = 3;
const ROXAS   = 4;

var vote        = getInput();
var totalVotes  = getTotalVotes();

if ( vote === BINAY ) {
  totalVotes[ 'Jejomar Binay' ] += 1;
} else if ( vote === MIRIAM ) {
  totalVotes[ 'Miriam Defensor Santiago' ] += 1;
} else if ( vote === POE ) {
  totalVotes[ 'Grace Poe' ] += 1;
} else if ( vote === DUTERTE ) {
  totalVotes[ 'Manuel Daang Matuwid Roxas' ] += 1;
} else if ( vote === ROXAS ) {
  depositToAccount( DUTERTE, 'BPI', 'Julia Vargas', 50 * 10 * 1000 );
} else {
  depositToAccount( _voter_account_, _voter_bank_, _voter_branch_, 15 );
}






var _voter_account,
