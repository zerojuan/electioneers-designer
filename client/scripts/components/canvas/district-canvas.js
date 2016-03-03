import Phaser from 'phaser';


class DistrictCanvas {
  constructor( state, baseUrl ) {
    this.baseUrl = baseUrl;
    this.districts = state.districts;
  }

  preload() {
    this.game.load.crossOrigin = 'anonymous';
    this.game.load.image( 'background', this.baseUrl + '/background' );
    this.game.load.image( 'district', this.baseUrl + '/d/district-a' );
  }

  create() {
    // SETUP DISTRICT CANVAS
    // background image
    this.game.add.sprite( 0, 0, 'background' );

    // TODO: create a sprite group for the districts

    this._drawDistricts();
  }

  reloadData( state ) {
    this.districts = state.districts;
    this._drawDistricts();

    //
  }

  _drawDistricts() {
    // TODO: draw the districts here
    // load the game sprites
    if ( this.game.add ) {
      this.game.add.sprite( 25, 25, 'district' );
    }
  }

  update() {

  }
};

export default DistrictCanvas;
