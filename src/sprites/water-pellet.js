let Phaser = require('phaser-ce');
let Bullet = require('./bullet');

class WaterPellet extends Bullet {
  constructor(game, x, y, key) {
    super(game, x, y, 'droplet');
    this.damage = 1;
  }
}

module.exports = WaterPellet;
