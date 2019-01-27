let Phaser = require('phaser-ce');
let Bullet = require('./bullet');

class WaterPellet extends Bullet {
  constructor(game, x, y, key) {
    super(game, x, y, 'white-ball');
    this.damage = 3;
  }
}

module.exports = WaterPellet;
