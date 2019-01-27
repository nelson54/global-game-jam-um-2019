const Phaser = require('phaser-ce');
const Bullet = require('../sprites/bullet');
const Player = require('../sprites/player');
const Gun = require('../gun');
const Pistol = require('../pistol');
const Pickup = require('../sprites/pickup');
const MachineGun = require('../machine-gun');
const RocketLauncher = require('../rocket-launcher');
const Input = require('../input');
const PickupManager = require('../sprites/pickup-manager');

class Gameplay extends Phaser.State {
  preload() {
    this.game.load.spritesheet('player-1', '/assets/sprites/player-1.png', 50, 99);
    this.game.load.spritesheet('player-2', '/assets/sprites/player-2.png', 50, 99);

    this.game.load.image('normal-bullet', '/assets/sprites/normal-bullet.png');
    this.game.load.image('white-ball', 'assets/sprites/white-ball.png');
    this.game.load.image('droplet', 'assets/sprites/droplet.png');
    this.game.load.image('water-balloon', 'assets/sprites/water-balloon.png');

    this.game.load.image('pillow', 'assets/sprites/pillow.png');

    this.game.load.image('carpet', 'assets/sprites/carpet.png');
    this.game.load.image('bed1', 'assets/sprites/bed1.png');
    this.game.load.image('bed2', 'assets/sprites/bed2.png');
    this.game.load.image('desk', 'assets/sprites/desk.png');
    this.game.load.image('chair', 'assets/sprites/chair.png');
    this.game.load.image('beanbag', 'assets/sprites/beanbag.png');
    this.game.load.image('machine-gun-pickup', 'assets/sprites/machine-gun-pickup.png');
    this.game.load.image('rocket-launcher-pickup', 'assets/sprites/rocket-launcher-pickup.png');
    this.game.load.image('pistol-pickup', 'assets/sprites/pistol-pickup.png');
    this.game.load.image('life', 'assets/sprites/life.png');

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

    this.game.input.enabled = true;
    let space = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    space.onDown.add(()=> this.player1.pillowHit());

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

    this.game.add.tileSprite(0, 0, 1280, 720, 'carpet');

    let bed1 = this.game.add.sprite(280, 160, "bed1");
    bed1.scale.set(0.6);
    let bed2 = this.game.add.sprite(900, 560, "bed2");
    bed2.scale.set(0.6);
    bed2.angle = 180;

    let desk1 = this.game.add.sprite(150, 450, "desk");
    desk1.scale.set(0.6);
    desk1.angle = 180;
    let desk2 = this.game.add.sprite(1150, 450, "desk");
    desk2.scale.set(0.6);
    desk2.angle = 0;

    let chair1 = this.game.add.sprite(150, 530, "chair");
    chair1.scale.set(0.6);
    chair1.angle = 180;
    let chair2 = this.game.add.sprite(1150, 380, "chair");
    chair2.scale.set(0.6);
    chair2.angle = 0;

    this.furniture = this.game.add.physicsGroup();
    this.furniture.addMultiple([bed1, bed2, desk1, desk2]);
    this.furniture.setAll('body.immovable', true);
    this.furniture.setAll('anchor', new Phaser.Point(0.5, 0.5));

    this.pushable = this.game.add.physicsGroup();
    this.pushable.addMultiple([chair1, chair2]);

    this.pushable.addMultiple([
      this.game.add.sprite(660, 100, "beanbag"),
      this.game.add.sprite(450, 310, "beanbag"),
      this.game.add.sprite(360, 570, "beanbag"),
      this.game.add.sprite(1090, 120, "beanbag"),
      this.game.add.sprite(940, 320, "beanbag"),
      this.game.add.sprite(670, 600, "beanbag")]);

    this.pushable.setAll('body.collideWorldBounds', true);
    this.pushable.setAll('anchor', new Phaser.Point(0.5, 0.5));

    // THIS CODE SHOULDN'T BE RUN HERE!
    // IT SHOULD BE EXECUTED BEFORE ANY STATE IS RUN
    let input1 = new Input.XBoxController(this.input.gamepad.pad1);
    let input2 = new Input.XBoxController(this.input.gamepad.pad2);

    this.player1 = new Player(this.game, 100, 110, 16, 12, '#4b46ff', 'player-1');
    this.player1.controller = input1;

    this.player2 = new Player(this.game, 1130, 640, 1280 - 80, 12, '#ff4c47', 'player-2');
    this.player2.controller = input2;

    this.player1.enemy = this.player2;
    this.player2.enemy = this.player1;

    this.players = this.game.add.physicsGroup();
    this.players.addMultiple([this.player1, this.player2]);

    // To listen to buttons from a specific pad listen directly on that pad game.input.gamepad.padX, where X = pad 1-4
    this.time.advancedTiming = true;

    this.frame = 0;

    this.peaceEnabled = true;
    this.peaceTimerSeconds = 10;
    this.peaceTimerText = this.game.add.text(this.game.world.centerX, this.game.world.centerY, "Prepare!", {
      "fill": "white",
      "font": "bold 40pt Comic Sans MS",
      "strokeThickness": 8
    });
    this.peaceTimerText.anchor.set(0.5, 0.5);
    this.peaceTimerCountdown = this.game.add.tween(this.peaceTimerText);
    this.peaceTimerCountdown.to({ alpha: 0.0 }, 1000, Phaser.Easing.Sinusoidal.Out);
    this.peaceTimerCountdown.onComplete.add(() => {
      this.peaceTimerSeconds -= 1;
      this.peaceTimerText.alpha = 1.0;
      if (this.peaceTimerSeconds > 0) {
        this.peaceTimerText.text = String(this.peaceTimerSeconds);
        this.peaceTimerCountdown.start();
      } else {
        this.peaceEnabled = false;
        this.peaceTimerText.text = "Attack!";
        this.game.add.tween(this.peaceTimerText).to({ alpha: 0.0 }, 2000, Phaser.Easing.Sinusoidal.Out).start();
        this.pickupManager = new PickupManager(this.game);
      }
    }, this);
    this.peaceTimerCountdown.start();

    this.game.input.activePointer.leftButton.onDown.add(() => {
      if (this.game.scale.isFullScreen) {
        this.game.scale.stopFullScreen();
      } else {
        this.game.scale.startFullScreen(false);
      }
    });
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
    this.game.physics.arcade.collide(this.pushable, this.pushable);

    if(!this.player1.alive) {
      this.game.state.start('end-game2');
    } else if (!this.player2.alive) {
      this.game.state.start('end-game1');
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
