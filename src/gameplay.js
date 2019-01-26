var Phaser = require('phaser-ce');
var Player = require('./sprites/player');

class Gameplay extends Phaser.State {
  preload() {
    this.game.load.image('player-1', '/assets/sprites/player-1.png');
  }

  create() {
    this.player1 = new Player(this.game, this.game.world.centerX, this.game.world.centerY, 'player-1');
  }

  update() {

  }
}


module.exports = Gameplay;
