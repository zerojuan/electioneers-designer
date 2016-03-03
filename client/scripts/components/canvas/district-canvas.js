import Phaser from 'phaser';

import DistrictSprite from './district-sprite.js';

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

    // create a sprite group for the districts
    this.districtSprites = this.game.add.group();

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
      this.districts.forEach( ( district ) => {
        const index = this.districtSprites.children.findIndex( ( sprite ) => {
          return sprite.data._id === district._id;
        });

        if ( index < 0 ) {
          const sprite = new DistrictSprite( this, district );
          this.districtSprites.add( sprite );
        }
      });
    }
  }

  update() {

  }
};

export default DistrictCanvas;
