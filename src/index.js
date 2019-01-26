const Phaser = require('phaser-ce');
const Gameplay = require('./states/gameplay');
const Countdown = require('./states/countdown');
const Input = require('./input');


class JamGame extends Phaser.Game {
  constructor() {
    super(1024, 768, Phaser.AUTO, document.querySelector('body'), {
      preload() {
        this.game.state.add('countdown', new Countdown());
      },
      create(){
        this.game.state.start('countdown');
        this.input1 = new Input.XBoxController(this.input.gamepad.pad1);
        this.input2 = new Input.XBoxController(this.input.gamepad.pad2);


      }
    });

  }
}

let game = new JamGame();
