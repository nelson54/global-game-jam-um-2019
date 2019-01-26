var Phaser = require('phaser-ce');

class Bullet extends Phaser.Sprite {
  constructor(game, x, y, damage, key) {
    super(game, x, y, key);
    this.damage = damage;

    game.add.existing(this)
  }
}


module.exports = Bullet;
