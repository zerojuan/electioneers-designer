import Phaser from 'phaser';

import DistrictCanvas from './district-canvas';

class CanvasGeoView {
  constructor( handlers, baseUrl ) {
    this.handlers = handlers;
    this.baseUrl = baseUrl;
  }

  create( el, state ) {
    this.game = new Phaser.Game( 640, 640, Phaser.AUTO, el );
    console.log( 'What is the base URL: ', this.baseUrl );
    this.gameState = new DistrictCanvas( state, this.baseUrl );
    this.game.state.add( 'game', this.gameState );

  }

  update( el, state ) {
    if ( state.baseUrl !== 'none' ) {
      console.log( state.baseUrl );
      this.gameState.baseUrl = state.baseUrl;
      this.game.state.start( 'game' );
      this.gameState.reloadData( state );
    }
  }
};

export default CanvasGeoView;
