let Phaser = require('phaser-ce');
let Gameplay = require('./gameplay');

class JamGame extends Phaser.Game {
  constructor() {
    super(1024, 768, Phaser.AUTO, document.querySelector("body"), new Gameplay());

  }
}

let game = new JamGame();
