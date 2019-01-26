var Phaser = require('phaser-ce');
var Player = require('./sprites/player');
var Gun = require('./gun');

class Gameplay extends Phaser.State {
  preload() {
    this.game.load.image('player-1', '/assets/sprites/player-1.png');
    this.game.load.image('normal-bullet', '/assets/sprites/normal-bullet.png');
    this.game.load.image('bed', 'assets/sprites/bed.png');
  }

  create() {
    // this.game.physics.startSystem(Phaser.Physics.ARCADE);
    var bed = this.game.add.sprite(20, 20, "bed");
    // bed.enableBody = true;
    // bed.body.immovable = true;

    this.player1 = new Player(this.game, this.game.world.centerX, this.game.world.centerY, 'player-1');

    this.player1.weapon = new Gun(this.game, 'normal-bullet');
  }

  update() {
    if (this.game.input.activePointer.isDown) {
      this.player1.weapon.use(); // named thusly because not all weapons are necessarily guns
    }
  }
}


module.exports = Gameplay;
