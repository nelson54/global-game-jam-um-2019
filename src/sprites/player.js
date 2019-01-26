var Phaser = require("phaser-ce");

class Player extends Phaser.Sprite {
  constructor(game, x, y, key) {
    super(game, x, y, key);
    this.anchor.set(.5, .5);
    this.scale.set(.5);
    game.add.existing(this)
  }
}


module.exports = Player;

