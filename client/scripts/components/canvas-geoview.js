import Phaser from 'phaser';

import DistrictCanvas from './district-canvas';

class CanvasGeoView {
  constructor( handlers ) {
    this.handlers = handlers;
  }

  create( el, state ) {
    this.game = new Phaser.Game( 640, 640, Phaser.AUTO, el );
    this.gameState = new DistrictCanvas( state );
    this.game.state.add( 'game', this.gameState );
    this.game.state.start( 'game' );
  }

  update( el, state ) {
    this.gameState.reloadData( state );
  }
};

export default CanvasGeoView;
