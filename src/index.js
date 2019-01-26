console.log("it works");

let Phaser = require('phaser-ce');
let Gameplay = require('./gameplay');

class JamGame extends Phaser.Game {
    constructor() {
    super(800, 600, Phaser.AUTO, "content", null);
    this.state.add("Gameplay", Gameplay, true);
  }
}

let game = new JamGame();

