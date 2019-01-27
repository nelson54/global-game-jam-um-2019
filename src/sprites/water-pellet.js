const Phaser = require('phaser-ce');
const Bullet = require('./bullet');
const MachineGunEffect = require('../effects/machine-gun-effect');

class WaterPellet extends Bullet {
  constructor(game, x, y, key) {
    super(game, x, y, 'droplet');
    this.damage = 0.5;
  }

  hit(player, bullet) {
    super.hit(player, bullet);
    new MachineGunEffect(this.game, bullet.x, bullet.y)
  }
}

module.exports = WaterPellet;
