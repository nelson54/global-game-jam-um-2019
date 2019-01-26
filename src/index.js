const Phaser = require('phaser-ce');
const Gameplay = require('./states/gameplay');
const Countdown = require('./states/countdown');
const Input = require('./input');


class JamGame extends Phaser.Game {
  constructor() {
    super(1024, 768, Phaser.AUTO, document.querySelector('body'), new Countdown());

  }

  create(){
    this.input1 = new Input.XBoxController(this.input.gamepad.pad1);
    this.input2 = new Input.XBoxController(this.input.gamepad.pad2);


  }
}

let game = new JamGame();
