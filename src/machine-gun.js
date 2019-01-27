const Phaser = require('phaser-ce');
const Gun = require('./gun');
const WaterPellet = require('./sprites/water-pellet');

class MachineGun extends Gun {
  constructor(game) {
    super(game);

    this.particleClass = WaterPellet;
    this.maxParticles = 10000;

    this.makeParticles();
    this.gravity = 0;

    this.sound = game.snap;
    this.sound.allowMultiple = true;

    this.bulletSpeed = 1200;
    this.cooldown = 5;

    game.add.existing(this);
  }
}

module.exports = MachineGun;
