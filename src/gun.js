var Phaser = require('phaser-ce');

class Gun extends Phaser.Particles.Arcade.Emitter {
  constructor(game, bullet, sound) {
    super(game);

    this.makeParticles('normal-bullet');
    this.gravity = 0;

    this.sound = game.add.audio(sound);

    this.bulletSpeed = 500;
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
    }
  }
}

module.exports = Gun;
