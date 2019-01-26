const Phaser = require('phaser-ce');
const Bullet = require('../sprites/bullet');
const Player = require('../sprites/player');
const Gun = require('../gun');
const Pickup = require('../sprites/pickup');
const Input = require('../input');

class Gameplay extends Phaser.State {
  preload() {
    this.game.load.image('player-1', '/assets/sprites/player-1.png');
    this.game.load.image('player-2', '/assets/sprites/player-2.png');
    this.game.load.image('normal-bullet', '/assets/sprites/normal-bullet.png');
    this.game.load.image('carpet', 'assets/sprites/carpet.png');
    this.game.load.image('bed', 'assets/sprites/bed.png');
    this.game.load.image('desk', 'assets/sprites/desk.png');
    this.game.load.image('pickup', 'assets/sprites/floor-chunk.png');

    this.game.load.audio('snap', 'assets/audio/snap.mp3');
    this.game.load.audio('boop', 'assets/audio/boop.ogg');
  }

  create() {
    this.game.physics.startSystem(Phaser.Physics.ARCADE);

    this.game.add.tileSprite(0, 0, 1024, 768, 'carpet');

    var bed = this.game.add.sprite(20, 20, "bed");
    // bed.enableBody = true;
    // bed.body.immovable = true;

    var desk = this.game.add.sprite(850, 500, "desk");

    // THIS CODE SHOULDN'T BE RUN HERE!
    // IT SHOULD BE EXECUTED BEFORE ANY STATE IS RUN
    this.input.gamepad.start();

    this.player1 = new Player(this.game, -120, 0, 16, 12, '#4b46ff', 'player-1');
    this.player1.weapon = new Gun(this.game, 'normal-bullet', 'boop');
    this.player1.input = new Input.XBoxController(this.input.gamepad.pad1);

    this.player2 = new Player(this.game, 120, 0, 1024 - 80, 12, '#ff4c47', 'player-2');
    this.player2.weapon = new Gun(this.game, 'normal-bullet', 'boop');
    this.player2.input = new Input.XBoxController(this.input.gamepad.pad2);

    this.player1.enemy = this.player2;
    this.player2.enemy = this.player1;

    var pickup = new Pickup(this.game, 800, 50, 'pickup', [this.player1, this.player2]);
    this.recording = this.game.add.audio('boop');

    // To listen to buttons from a specific pad listen directly on that pad game.input.gamepad.padX, where X = pad 1-4

    this.time.advancedTiming = true;

    this.frame = 0;
  }

  update() {
    if(this.frame >= 30) {
      this.frame = 0;
    }
    this.frame += 1;

    if(!this.player1.alive || !this.player2.alive) {
      this.game.state.start('countdown');
    }

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
