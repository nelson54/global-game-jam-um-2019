const Phaser = require('phaser-ce');
const Gameplay = require('./states/gameplay');
const Countdown = require('./states/countdown');
const Input = require('./input');


class JamGame extends Phaser.Game {
  constructor() {
    super(1280, 720, Phaser.AUTO, document.querySelector('body'), {
      preload() {
        this.game.state.add('countdown', new Countdown());
        this.game.scale.scaleMode = Phaser.ScaleManager.EXACT_FIT;
        this.game.scale.pageAlignHorizontally = true;
        this.game.scale.pageAlignVertically = true;
      },
      create(){
        this.game.input.gamepad.start();
        this.game.state.start('countdown');

        this.game.scale.fullScreenScaleMode = Phaser.ScaleManager.EXACT_FIT;
      }
    });

  }
}

window.game = new JamGame();
