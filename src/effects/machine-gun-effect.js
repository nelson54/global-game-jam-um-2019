var Phaser = require('phaser-ce');

class MachineGunEffect extends Phaser.Particles.Arcade.Emitter {

  constructor(game, x, y) {
    super(game, x, y);
    this.makeParticles('droplet', 0);
    game.add.existing(this);

    this.setXSpeed(-150, 150);
    this.setYSpeed(-150, 150);

    this.setAlpha(1, .3, 1000);
    this.minParticleScale = .1;
    this.maxParticleScale = .3;

    //this.start(false, 500, 30, 1);

    this.flow(3000, 50, 50, 50)
  }
}

module.exports = MachineGunEffect;
