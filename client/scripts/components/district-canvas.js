import Phaser from 'phaser';


class DistrictCanvas {
  constructor( state ) {
    this.districts = state.districts;
  }

  create() {
    // SETUP DISTRICT CANVAS
    this._drawDistricts();
  }

  reloadData( state ) {
    this.districts = state.districts;
    this._drawDistricts();
  }

  _drawDistricts() {
    // TODO: draw the districts here
    // load the game sprites
  }

  update() {

  }
};

export default DistrictCanvas;
