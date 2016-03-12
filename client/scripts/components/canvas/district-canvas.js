import Phaser from 'phaser';

import DistrictSprite from './district-sprite.js';

class DistrictCanvas {
  constructor( state, baseUrl, eventHandlers ) {
    this.baseUrl = baseUrl;
    this.districts = state.districts;
    this.eventHandlers = eventHandlers;
    this.selectedSprite = null;
  }

  preload() {
    this.game.load.crossOrigin = 'anonymous';
    this.game.load.image( 'background', this.baseUrl + '/background' );
    this.game.load.image( 'district', this.baseUrl + '/d/district-a' );
    this.game.scale.scaleMode = Phaser.ScaleManager.EXACT_FIT;
  }

  create() {
    // SETUP DISTRICT CANVAS
    // background image
    this.game.add.sprite( 0, 0, 'background' );

    // create a sprite group for the districts
    this.districtSprites = this.game.add.group();

    this.connectorLine = new Phaser.Line( 0, 0, 0, 0 );

    this._drawDistricts();
  }

  reloadData( state ) {
    this.districts = state.districts;
    this._drawDistricts();

    //
  }

  _onDragEnd( sprite, pointer ) {
    if ( sprite.data.position.x === sprite.x &&
          sprite.data.position.y === sprite.y ) {
            return;
    }

    sprite.data.position.x = sprite.x;
    sprite.data.position.y = sprite.y;

    this.eventHandlers.onDistrictsUpdate( sprite.data );
  }

  _onClickedDistrict( sprite ) {

    if ( sprite === this.selectedSprite ) {
      this.selectedSprite.unSelect();
      this.selectedSprite = null;
      return;
    }

    if ( this.selectedSprite ) {
      this.selectedSprite.unSelect();
      // TODO: do connect logic

    }

    sprite.select();
    this.selectedSprite = sprite;
  }

  _onHoverDistrict( sprite ) {
    this.hoveredSprite = sprite;
  }

  _drawDistricts() {
    // load the game sprites when it's ready
    if ( this.game.add ) {
      this.districts.forEach( ( district ) => {
        const index = this.districtSprites.children.findIndex( ( sprite ) => {
          return sprite.data._id === district._id;
        });

        if ( index < 0 ) {
          const sprite = new DistrictSprite( this, district );
          sprite.events.onDragStop.add( this._onDragEnd, this );
          sprite.events.onInputDown.add( this._onClickedDistrict, this );
          sprite.events.onInputOver.add( this._onHoverDistrict, this );
          this.districtSprites.add( sprite );
        }
      });
    }
  }

  update() {
    if ( this.selectedSprite ) {
      this.connectorLine.setTo( this.selectedSprite.x, this.selectedSprite.y,
        this.game.input.position.x, this.game.input.position.y );
    }
  }

  render() {

    if ( true ) {
      this.debug();
    }
  }

  debug() {
    const game = this.game;

    if ( this.selectedSprite ) {
      let text = 'Connect ' + this.selectedSprite.data.name + ' to: ';
      text += this.hoveredSprite ? this.hoveredSprite.data.name : '';
      game.debug.text( text,
        20, 20 );
    } else {
      game.debug.text( '', 20, 20 );
    }

    game.debug.geom( this.connectorLine );

  }
};

export default DistrictCanvas;
