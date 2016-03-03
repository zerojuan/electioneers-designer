import Phaser from 'phaser';


class DistrictSprite extends Phaser.Sprite {
  constructor( main, districtData ) {
    super( main.game, Math.random() * 600, Math.random() * 600, 'district' );
    this.data = districtData;
  }

}

export default DistrictSprite;
