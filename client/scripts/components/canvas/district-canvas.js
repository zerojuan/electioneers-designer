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
    this.bg = this.game.add.sprite( 0, 0, 'background' );

    // debug line
    this.connectorLine = new Phaser.Line( 0, 0, 0, 0 );

    this.bmd = this.game.add.bitmapData( this.game.width, this.game.height );

    // layer to draw connections
    this.connectorLayer = this.game.add.sprite( 0, 0, this.bmd );

    // create a sprite group for the districts
    this.districtSprites = this.game.add.group();

    this.game.input.mouse.capture = true;
    this.bg.inputEnabled = true;
    this.bg.events.onInputDown.add( this._onClickedBG, this );

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

  _onClickedBG() {
    if ( this.selectedSprite ) {
      this.selectedSprite.unSelect();
      this.selectedSprite = null;
    }
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
      this.eventHandlers.onDistrictsConnect( this.selectedSprite.data, this.hoveredSprite.data );

      this.hoveredSprite = null;
    }

    sprite.select();
    this.selectedSprite = sprite;
  }

  _onHoverDistrict( sprite ) {
    this.hoveredSprite = sprite;
  }

  _onOutDistrict( ) {
    this.hoveredSprite = null;
  }

  _findDistrictSprite( id ) {
    const sprites = this.districtSprites.filter( ( dSprite ) => {
      return dSprite.data._id === id;
    });

    return sprites.list[ 0 ];
  }

  _drawConnections() {
    // take bitmapdata
    const bmd = this.bmd;

    bmd.clear();
    // draw district connections
    _.forEach( this.districtSprites.children, ( dSprite ) => {
      _.forEach( dSprite.data.connections, ( id ) => {
        let dSpriteB = this._findDistrictSprite( id );
        bmd.ctx.beginPath();
        bmd.ctx.beginPath();
        bmd.ctx.moveTo( dSprite.x, dSprite.y );
        bmd.ctx.lineTo( dSpriteB.x, dSpriteB.y );
        bmd.ctx.lineWidth = 4;
        bmd.ctx.stroke();
        bmd.ctx.closePath();
      });
    });

    // draw possible connection
    if ( this.selectedSprite ) {
      let { start, end } = this.connectorLine;
      bmd.ctx.beginPath();
      bmd.ctx.moveTo( start.x, start.y );
      bmd.ctx.lineTo( end.x, end.y );
      bmd.ctx.lineWidth = 2;
      bmd.ctx.stroke();
      bmd.ctx.closePath();
    }

    bmd.render();


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
          sprite.events.onInputOut.add( this._onOutDistrict, this );
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
    this._drawConnections();
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
  }
};

export default DistrictCanvas;
