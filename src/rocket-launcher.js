const Phaser = require('phaser-ce');
const Gun = require('./gun');
const WaterBalloon = require('./sprites/water-balloon');
const WhiteBall = require('./sprites/white-ball');

class RocketLauncher extends Gun { constructor(game) { super(game);

    this.particleClass = WaterBalloon;
    this.maxParticles = 100;

    this.makeParticles(undefined, undefined, undefined, undefined, true);
    this.gravity = 0;

    this.sound = game.boop;

    this.bulletSpeed = 500;
    this.cooldown = 1000;

    game.add.existing(this);
  }
}

module.exports = RocketLauncher;
