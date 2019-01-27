const Phaser = require('phaser-ce');
const Gameplay = require('./states/gameplay');
const EndGame = require('./states/end-game');
const Input = require('./input');


class JamGame extends Phaser.Game {
  constructor() {
    super(1280, 720, Phaser.AUTO, document.querySelector('body'), {
      preload() {
        this.game.state.add('end-game1', new EndGame(this.game, "Player 1"));
        this.game.state.add('end-game2', new EndGame(this.game, "Player 2"));
        this.game.state.add('gameplay', new Gameplay());
        this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        this.game.scale.pageAlignHorizontally = true;
        this.game.scale.pageAlignVertically = true;
      },
      create(){
        this.game.input.gamepad.start();
        this.game.state.start('gameplay');

        this.game.scale.fullScreenScaleMode = Phaser.ScaleManager.EXACT_FIT;
      }
    });

  }
}

window.game = new JamGame();
