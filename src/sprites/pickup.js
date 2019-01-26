var Phaser = require('phaser-ce');
var Gun = require('../gun');

class Pickup extends Phaser.Sprite {
  constructor(game, x, y, key, players) {
    super(game, x, y, key);

    this.scale.set(2);
    this.item = new Gun(this.game, 'normal-bullet');

    for (let player of players) {
      this.game.physics.arcade.overlap(player, this, this.collect, null, this.game);
    }

    game.add.existing(this)
  }

  collect(player, pickup) {
    player.weapon = pickup.item;
    pickup.kill;
  }
}

module.exports = Pickup;
