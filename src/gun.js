var Phaser = require('phaser-ce');

class Gun extends Phaser.Particles.Arcade.Emitter {
  constructor(game, bullet) {
    super(game);

    this.minSpeed = 100;
    this.maxSpeed = 100;
    this.angle = 0;
    this.makeParticles('normal-bullet', 0, 5, false, true);

    //this.gravity = 0;
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
