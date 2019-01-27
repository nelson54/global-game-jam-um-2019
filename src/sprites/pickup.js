var Phaser = require('phaser-ce');
var MachineGun = require('../machine-gun');

class Pickup extends Phaser.Sprite {
  constructor(game, x, y, key, GunConstructor) {
    super(game, x, y, key);

    this.scale.set(0.75);
    this.GunConstructor = GunConstructor;
    let state = this.game.state.getCurrentState();
    this.players = [state.player1, state.player2];
    this.enableBody = true;

    game.physics.arcade.enable(this);
    game.add.existing(this);
    this.alpha = 0;
    game.add.tween(this).to({alpha:1}, 500, "Linear").start();
  }

  collect(player) {
    player.weapon = new this.GunConstructor(this.game);
    this.kill();
  }

  kill() {
    game.add.tween(this)
      .to({alpha:0}, 500, "Linear")
      .start()
      .onComplete.add(()=>super.kill());
  }

  update() {
    for (let player of this.players) {
      this.game.physics.arcade.overlap(player, this, ()=>this.collect(player));
    }
  }
}

module.exports = Pickup;
