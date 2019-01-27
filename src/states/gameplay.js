const Phaser = require('phaser-ce');
const Bullet = require('../sprites/bullet');
const Player = require('../sprites/player');
const Gun = require('../gun');
const Pistol = require('../pistol');
const Pickup = require('../sprites/pickup');
const Input = require('../input');

class Gameplay extends Phaser.State {
  preload() {
    this.game.state.add('countdown', new (require('./countdown'))());

    this.game.load.image('player-1', '/assets/sprites/player-1.png');
    this.game.load.image('player-2', '/assets/sprites/player-2.png');

    this.game.load.image('normal-bullet', '/assets/sprites/normal-bullet.png');
    this.game.load.image('white-ball', 'assets/sprites/white-ball.png');
    this.game.load.image('droplet', 'assets/sprites/droplet.png');
    this.game.load.image('water-balloon', 'assets/sprites/water-balloon.png');

    this.game.load.image('carpet', 'assets/sprites/carpet.png');
    this.game.load.image('bed1', 'assets/sprites/bed1.png');
    this.game.load.image('bed2', 'assets/sprites/bed2.png');
    this.game.load.image('desk', 'assets/sprites/desk.png');
    this.game.load.image('chair', 'assets/sprites/chair.png');
    this.game.load.image('pickup', 'assets/sprites/floor-chunk.png');

    this.game.load.image('beanbag', '/assets/sprites/beanbag.png');

    this.game.load.audio('snap', 'assets/audio/snap.mp3');
    this.game.load.audio('machine-gun', 'assets/audio/machine_gun_sound_to_loop.ogg');

    this.game.load.audio('boop', 'assets/audio/boop.ogg');

    this.game.load.audio('woosh', 'assets/audio/woosh.ogg');
    this.game.load.audio('rocket-launch', 'assets/audio/rocket_launch.ogg');

    this.game.load.audio('oof', 'assets/audio/oof.ogg');

    this.game.load.audio('darkling', 'assets/audio/darkling.mp3');
  }

  create() {
    this.game.backgroundMusic = this.game.add.audio('darkling');
    this.game.backgroundMusic.repeats = true;
    this.game.backgroundMusic.volume = .4;
    this.game.backgroundMusic.play();

    this.game.boop = this.recording = this.game.add.audio('boop');
    this.recording.volume = 5;

    this.recording.allowMultiple = true;

    this.game.snap = this.game.add.audio('machine-gun');
    this.game.snap.allowMultiple = true;

    this.game.woosh = this.game.add.audio('woosh');
    this.game.woosh.allowMultiple = true;

    this.game.oof = this.game.add.audio('oof');
    this.game.oof.allowMultiple = true;

    this.game.rocketLaunch = this.game.add.audio('rocket-launch');
    this.game.rocketLaunch.volume = 5;


    this.game.physics.startSystem(Phaser.Physics.ARCADE);

    this.game.add.tileSprite(0, 0, 1024, 768, 'carpet');

    let bed1 = this.game.add.sprite(20, 20, "bed1");
    let bed2 = this.game.add.sprite(820, 20, "bed2");
    let desk = this.game.add.sprite(850, 500, "desk");

    let chair = this.game.add.sprite(760, 600, "chair");

    this.furniture = this.game.add.physicsGroup();
    this.furniture.addMultiple([bed1, bed2, desk]);
    this.furniture.setAll('body.immovable', true);

    this.pushable = this.game.add.physicsGroup();
    this.pushable.addMultiple([chair]);
    this.pushable.setAll('body.collideWorldBounds', true);

    // THIS CODE SHOULDN'T BE RUN HERE!
    // IT SHOULD BE EXECUTED BEFORE ANY STATE IS RUN
    let input1 = new Input.XBoxController(this.input.gamepad.pad1);
    let input2 = new Input.XBoxController(this.input.gamepad.pad2);

    this.player1 = new Player(this.game, -120, 0, 16, 12, '#4b46ff', 'player-1');
    this.player1.weapon = new Pistol(this.game);
    this.player1.input = input1;

    this.player2 = new Player(this.game, 120, 0, 1024 - 80, 12, '#ff4c47', 'player-2');
    this.player2.weapon = new Pistol(this.game);
    this.player2.input = input2;

    this.player1.enemy = this.player2;
    this.player2.enemy = this.player1;

    this.players = this.game.add.physicsGroup();
    this.players.addMultiple([this.player1, this.player2]);

    var pickup = new Pickup(this.game, 800, 50, 'pickup', [this.player1, this.player2]);

    // To listen to buttons from a specific pad listen directly on that pad game.input.gamepad.padX, where X = pad 1-4

    this.time.advancedTiming = true;

    this.frame = 0;
  }

  update() {
    if(this.frame >= 30) {
      this.frame = 0;
    }
    this.frame += 1;

    this.game.physics.arcade.collide(this.player1, this.player2);
    this.game.physics.arcade.collide(this.players, this.furniture);
    this.game.physics.arcade.collide(this.players, this.pushable);
    this.game.physics.arcade.collide(this.furniture, this.pushable);

    if(!this.player1.alive || !this.player2.alive) {
      this.game.state.start('countdown');
    }

    for(let sprite of this.pushable.children) {
      sprite.body.velocity.x *= 0.8;
      sprite.body.velocity.y *= 0.8;
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
