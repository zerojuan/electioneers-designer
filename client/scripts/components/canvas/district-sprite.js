import Phaser from 'phaser';


class DistrictSprite extends Phaser.Sprite {
  constructor( main, districtData ) {
    super( main.game, 0, 0, 'district' );
    this.data = districtData;

    this.inputEnabled = true;
    this.input.enableDrag( true );
  }

}

export default DistrictSprite;
