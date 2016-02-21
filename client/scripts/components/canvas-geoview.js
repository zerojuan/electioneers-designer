import Phaser from 'phaser';

class CanvasGeoView {
  constructor( handlers ) {
    this.handlers = handlers;
  }

  create( el ) {
    console.log( 'I am in create mode' );
    this.game = new Phaser.Game( 640, 640, Phaser.AUTO, el );
  }
};

export default CanvasGeoView;
