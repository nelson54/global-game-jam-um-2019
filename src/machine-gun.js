const Phaser = require('phaser-ce');
const Gun = require('./gun');
const WaterPellet = require('./sprites/water-pellet');

class MachineGun extends Gun {
  constructor(game) {
    super(game);

    this.particleClass = WaterPellet;
    this.maxParticles = 500;
    //keys, frames, quantity, collide, collideWorldBounds
    this.makeParticles(undefined, undefined, undefined, undefined, true);
    this.gravity = 0;


    //this.setAlpha(.8, .3, 1000)
    this.sound = game.snap;
    this.sound.allowMultiple = true;

    this.minParticleScale = 3 ;
    this.maxParticleScale = 3 ;

    this.bulletSpeed = 1200;
    this.cooldown = 60;

    game.add.existing(this);
  }
}

module.exports = MachineGun;
