let Phaser = require('phaser-ce');
let Bullet = require('./bullet');

class WhiteBall extends Bullet {
  constructor(game, x, y, key) {
    super(game, x, y, 'white-ball');
    this.damage = 10;
  }
}

module.exports = WhiteBall;
