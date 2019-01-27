const Phaser = require('phaser-ce');
const Gameplay = require('./states/gameplay');
const Countdown = require('./states/countdown');
const Input = require('./input');


class JamGame extends Phaser.Game {
  constructor() {
    super(1280, 720, Phaser.AUTO, document.querySelector('body'), {
      preload() {
        this.game.state.add('countdown', new Countdown());
      },
      create(){
        this.game.input.gamepad.start();
        this.game.state.start('countdown');
      }
    });

  }
}

window.game = new JamGame();
