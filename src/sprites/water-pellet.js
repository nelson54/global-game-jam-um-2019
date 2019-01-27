const Phaser = require('phaser-ce');
const Bullet = require('./bullet');
const MachineGunEffect = require('../effects/machine-gun-effect');

class WaterPellet extends Bullet {
  constructor(game, x, y, key) {
    super(game, x, y, 'droplet');
    this.damage = 0.5;
  }

  hit(player) {
    super.hit(player);
    new MachineGunEffect(this.game, this.x, this.y)
  }
}

module.exports = WaterPellet;
