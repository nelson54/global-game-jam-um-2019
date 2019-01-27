var Phaser = require('phaser-ce');
var MachineGun = require('../machine-gun');

class Pickup extends Phaser.Sprite {
  constructor(game, x, y, key, GunConstructor) {
    super(game, x, y, key);

    this.scale.set(0.75);
    this.Constructor = GunConstructor;
    let state = this.game.state.getCurrentState();
    this.players = [state.player1, state.player2];
    this.enableBody = true;

    game.physics.arcade.enable(this);
    game.add.existing(this)
  }

  collect(player, pickup) {
    player.weapon = (new this.GunConstructor(this.game)).item;
    //pickup.kill();
  }

  update() {
    for (let player of this.players) {
      this.game.physics.arcade.overlap(player, this, this.collect, null, this.game);
    }
  }
}

module.exports = Pickup;
