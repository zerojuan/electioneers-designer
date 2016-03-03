import Phaser from 'phaser';

import DistrictCanvas from './canvas/district-canvas';

class CanvasGeoView {
  constructor( handlers, baseUrl ) {
    this.handlers = handlers;
    this.baseUrl = baseUrl;
  }

  create( el, state ) {
    this.game = new Phaser.Game( 640, 640, Phaser.AUTO, el );

    this.gameState = new DistrictCanvas( state, this.baseUrl );
    this.game.state.add( 'game', this.gameState );
    this.game.state.start( 'game' );
  }

  update( el, state ) {
    if ( state.baseUrl !== 'none' ) {
      console.log( state.baseUrl );
      this.gameState.baseUrl = state.baseUrl;
      this.gameState.reloadData( state );
    }
  }
};

export default CanvasGeoView;
