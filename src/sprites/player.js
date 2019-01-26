var Phaser = require("phaser-ce");

class Player extends Phaser.Sprite {
  constructor(game, x, y, key) {
    super(game, x, y, key);

    game.add.existing(this)
  }
}


module.exports = Player;

