let Phaser = require('phaser-ce');


class Pillow extends Phaser.Sprite {
  constructor(game, x, y, key='pillow') {
    super(game, x, y, key);
    this.damage = 10;
    this.scale.set(0.75);

    this.enableBody = true;
  }
}

module.exports = Pillow;
