import Phaser from 'phaser';


class DistrictCanvas {
  constructor( state ) {
    this.districts = state.districts;
  }

  preload() {
    this.game.load.crossOrigin = 'anonymous';
    this.game.load.image('background', 'http://localhost:7171/image/glorious-maid/background');
  }

  create() {
    // SETUP DISTRICT CANVAS
    // background image
    this._drawDistricts();
  }

  reloadData( state ) {
    this.districts = state.districts;
    this._drawDistricts();
    this.game.add.sprite(0, 0, 'background');
  }

  _drawDistricts() {
    // TODO: draw the districts here
    // load the game sprites
  }

  update() {

  }
};

export default DistrictCanvas;
