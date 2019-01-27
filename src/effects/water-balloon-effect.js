var Phaser = require('phaser-ce');

class WaterBalloonEffect extends Phaser.Particles.Arcade.Emitter {

  constructor(game, x, y) {
    super(game, x, y);
    this.makeParticles('droplet', 0);
    game.add.existing(this);

    this.setXSpeed(-100, 100);
    this.setYSpeed(-150, -50);

    this.minParticleScale = .1;
    this.maxParticleScale = .9;

    //this.setSize(10, 10);

    //this.start(false, 500, 30, 1);

    this.flow(1000, 250, 15, 20)
  }
}

module.exports = WaterBalloonEffect;
