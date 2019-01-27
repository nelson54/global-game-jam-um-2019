let Phaser = require('phaser-ce');
let Bullet = require('./bullet');

const WhiteBallEffect = require('../effects/white-ball-effect');

class WhiteBall extends Bullet {
  constructor(game, x, y, key) {
    super(game, x, y, 'white-ball');
    this.damage = 10;
  }

  hit(player) {
    super.hit(player);
    new WhiteBallEffect(this.game, this.x, this.y);
    this.game.rocketLaunch.play();
  }
}

module.exports = WhiteBall;
