var Phaser = require('phaser-ce');

class MachineGunEffect extends Phaser.Particles.Arcade.Emitter {

  constructor(game, x, y) {
    super(game, x, y);
    this.makeParticles('droplet', 0);
    game.add.existing(this);

    this.setXSpeed(-100, 100);
    this.setYSpeed(-150, -50);


    this.minParticleScale = .1;
    this.maxParticleScale = .3;

    //this.start(false, 500, 30, 1);

    this.flow(1000, 250, 10, 10)
  }
}

module.exports = MachineGunEffect;
