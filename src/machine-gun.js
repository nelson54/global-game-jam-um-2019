const Phaser = require('phaser-ce');
const Gun = require('./gun');
const Bullet = require('./sprites/bullet');

class MachineGun extends Gun {
  constructor(game, bullet) {
    super(game, 100, -100);

    this.particleClass = Bullet;
    this.maxParticles = 1000;

    this.makeParticles();
    this.gravity = 0;

    this.sound = game.snap;
    this.sound.allowMultiple = true;

    this.bulletSpeed = 1200;
    this.cooldown = 20;

    game.add.existing(this);
  }
}

module.exports = MachineGun;
