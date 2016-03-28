import Phaser from 'phaser';


class DistrictSprite extends Phaser.Sprite {
  constructor( main, districtData ) {
    super( main.game, 0, 0, 'district' );
    this.data = districtData;
    this.x = districtData.position.x || 0;
    this.y = districtData.position.y || 0;

    this.anchor.x = this.anchor.y = 0.5;
    this.width = 35;

    this.inputEnabled = true;
    this.input.enableDrag( false );
    this.events.onInputDown.add( this.clicked, this );

    this._isSelected = false;
    this._mySpriteKey = '';
    // this._mySpriteKey = '' + this.data.image;
  }

  _hasEqualString( a, b ) {

  }

  reloadTexture() {
    // only load texture when it changed
    var spriteKey = this.data.image;
    console.log( 'Reloading spriteKey...', this.data.image );
    if ( this._mySpriteKey !== this.data.image ) {
      this.loadTexture( 'district' + spriteKey );
      this._mySpriteKey = spriteKey;
    }

  }

  select() {
    this._isSelected = true;
  }

  unSelect() {
    this._isSelected = false;
  }

  clicked() {
    // this._isSelected = !this._isSelected;
  }

  update() {
    // if ( this.input.pointerOver() ) {
    //   this.alpha = 0.5;
    // } else {
    //   this.alpha = 1;
    // }

    if ( this._isSelected ) {
      this.alpha = 0.5;
    } else {
      this.alpha = 1;
    }
  }

}

export default DistrictSprite;
