var Phaser = require('phaser-ce');

class Gun extends Phaser.Particles.Arcade.Emitter {
  constructor(game, bullet) {
    super(game);
    this.makeParticles(bullet);
    game.add.existing(this);
  }

  equipTo(player) {
    player.addChild(this);
  }

  unequipFrom(player) {
    player.removeChild(this);
  }

  use() {
    this.emitParticle();
  }
}

module.exports = Gun;
