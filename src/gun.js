var Phaser = require('phaser-ce');

class Gun extends Phaser.Particles.Arcade.Emitter {
  constructor(game, bullet) {
    super(game);

    this.makeParticles('normal-bullet', 1, 5, false, true);
    this.gravity = 0;
    this.particleAnchor.set(.5, .5);
    this.setXSpeed(0, 0);
    this.setYSpeed(-100, -100);


    game.add.existing(this);
  }

  equipTo(player) {
    player.addChild(this);
  }

  unequipFrom(player) {
    player.removeChild(this);
  }

  use() {
    //this.emitParticle();
    this.start(false, 5000, 500, 5);
  }
}

module.exports = Gun;
