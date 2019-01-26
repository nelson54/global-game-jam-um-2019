var Phaser = require('phaser-ce');

class Gun extends Phaser.Particles.Arcade.Emitter {
  constructor(game, bullet) {
    super(game);

    this.makeParticles('normal-bullet', 0, 1000, false, true);
    this.setXSpeed(100, 100);
    this.setYSpeed(-100, -100);

    //this.maxParticleSpeed = 100;

    this.gravity = 0;
    this.particleAnchor.set(.5, .5);

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


    //this.flow(1000, 250, 5, 1, false);
    //this.start(false, 5000, 500, 100)
  }

  end() {
    //this.flow(100, 0, 0, 0, true);
  }
}

module.exports = Gun;
