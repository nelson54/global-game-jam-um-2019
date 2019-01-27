const Phaser = require('phaser-ce');
const Bullet = require('./bullet');
const MachineGunEffect = require('../effects/machine-gun-effect');

class WaterBalloon extends Bullet {
  constructor(game, x, y, key) {
    super(game, x, y, 'water-balloon');
    this.damage = 50;
  }

  hit(player) {
    super.hit(player);
    new MachineGunEffect(this.game, this.x, this.y);
    this.game.rocketLaunch.play();
  }
}

module.exports = WaterBalloon;
