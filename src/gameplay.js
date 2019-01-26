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

    // THIS CODE SHOULDN'T BE RUN HERE!
    // IT SHOULD BE EXECUTED BEFORE ANY STATE IS RUN
    this.input.gamepad.start();
    this.game.pad1 = this.input.gamepad.pad1;
    // END

    this.player1 = new Player(this.game, this.game.world.centerX, this.game.world.centerY, 'player-1');
    this.player1.weapon = new Gun(this.game, 'normal-bullet');

    // To listen to buttons from a specific pad listen directly on that pad game.input.gamepad.padX, where X = pad 1-4

    this.time.advancedTiming = true;
    this.game.input.onDown.add(() => {
      console.log("down");
      this.player1.weapon.use();
    });

    this.game.input.onUp.add(()=> {
      console.log("up");
      this.player1.weapon.end();
    });

  }


  update() {

    //console.log(this.game.pad1);
  }

  render() {
    var renderTypes = {};
    renderTypes[Phaser.WEBGL] = "WEBGL";
    renderTypes[Phaser.CANVAS] = "CANVAS";
    renderTypes[Phaser.AUTO] = "AUTO";
    renderTypes[Phaser.HEADLESS] = "HEADLESS";
    this.game.debug.text(
      String(this.game.time.fps) +
        " FPS / " +
        renderTypes[this.game.renderType],
      12,
      12);
  }
}


module.exports = Gameplay;
