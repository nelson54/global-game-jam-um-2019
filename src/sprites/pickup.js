var Phaser = require('phaser-ce');
var Gun = require('../gun');

class Pickup extends Phaser.Sprite {
  constructor(game, x, y, key, players) {
    super(game, x, y, key);

    this.scale.set(2);
    this.item = new Gun(this.game, 'normal-bullet');
    this.players = players; // TODO: Use a group!!!
    this.enableBody = true;

    game.physics.arcade.enable(this);
    game.add.existing(this)
  }

  collect(player, pickup) {
    player.weapon = pickup.item;
    pickup.kill();
  }

  update() {
    for (let player of this.players) {
      this.game.physics.arcade.overlap(player, this, this.collect, null, this.game);
    }
  }
}

module.exports = Pickup;
