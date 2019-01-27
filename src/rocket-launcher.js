const Phaser = require('phaser-ce'),
  Bullet = require('./sprites/bullet');

class RocketLauncher extends Phaser.Particles.Arcade.Emitter {
  constructor(game) {
    super(game, 100, -100);

    this.particleClass = Bullet;
    this.maxParticles = 100;

    this.makeParticles(undefined, undefined, undefined, undefined, true);
    this.gravity = 0;

    this.sound = game.boop;

    this.bulletSpeed = 800;
    this.cooldown = 200;

    game.add.existing(this);
  }

  equipTo(player) {
    this.player = player;
  }

  unequipFrom(player) {
    this.player = null;
  }

  use() {
    if (!this._lastFire || Date.now() - this._lastFire >= this.cooldown) {
      this.emitParticle();
      this.sound.play();
      this._lastFire = Date.now();
    }
  }

  update() {
    if (this.player) {
      this.x = this.player.x;
      this.y = this.player.y;

      this.maxParticleSpeed = new Phaser.Point(Math.sin(this.player.rotation) * this.bulletSpeed, -Math.cos(this.player.rotation) * this.bulletSpeed);
      this.minParticleSpeed = this.maxParticleSpeed;

      this.forEachAlive((particle) => particle.update())
    }
  }
}

module.exports = RocketLauncher;
