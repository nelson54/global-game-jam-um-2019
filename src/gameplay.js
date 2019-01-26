var Phaser = require('phaser-ce');
var Player = require('./sprites/player');
var Gun = require('./gun');

class Gameplay extends Phaser.State {
  preload() {
    this.game.load.image('player-1', 'assets/sprites/player-1.png');
    this.game.load.image('bullet', 'assets/sprites/normal-bullet.png');
  }

  create() {
    this.player1 = new Player(this.game, this.game.world.centerX, this.game.world.centerY, 'player-1');

    this.player1.weapon = new Gun(this.game, 'bullet');
  }

  update() {
    if (this.game.input.activePointer.isDown) {
      this.player1.weapon.use(); // named thusly because not all weapons are necessarily guns
    }
  }
}


module.exports = Gameplay;
