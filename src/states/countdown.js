const Phaser = require('phaser-ce'),
  Gameplay = require('./gameplay');

class Countdown extends Phaser.State {
  preload() {

    this.game.state.add('default', new Gameplay());
    this.game.load.image('replay', '/assets/sprites/replay.png');

    this.game.load.image('start', '/assets/sprites/start.png');
    this.game.load.image('1', '/assets/sprites/1.png');
    this.game.load.image('2', '/assets/sprites/2.png');
    this.game.load.image('3', '/assets/sprites/3.png');
  }

  create() {
    this.game.stage.backgroundColor = "#30b3ff";
    let centerX = this.game.world.centerX,
      centerY = this.game.world.centerY;
    let replay = this.game.add.sprite(centerX, centerY, 'replay');
    replay.visible = false;

    let start = this.game.add.sprite(centerX, centerY, 'start');
    start.alpha = 0;

    let num1 = this.game.add.sprite(centerX, centerY, '1');
    num1.alpha = 0;

    let num2 = this.game.add.sprite(centerX, centerY, '2');
    num2.alpha = 0;

    let num3 = this.game.add.sprite(centerX, centerY, '3');
    num3.alpha = 0;

    let tween1 = this.game.add.tween(num1);
    tween1.to({alpha:1}, 1000, "Linear");


    let tween2 = this.game.add.tween(num2);
    tween2.to({alpha:1}, 1000, "Linear");

    let tween3 = this.game.add.tween(num3);
    tween3.to({alpha:1}, 1000, "Linear");

    let tweenStart = this.game.add.tween(start);
    tweenStart.to({alpha:1}, 1000, "Linear");

    tween3.onComplete.add(()=> {
      num3.visible = false;
      tween2.start()
    });

    tween2.onComplete.add(()=> {
      num2.visible = false;
      tween1.start()
    });

    tween1.onComplete.add(()=> {
      num1.visible = false;
      tweenStart.start();
    });

    tweenStart.onComplete.add(()=> {
      this.game.state.start('default', true, true);
    });

    tween3.start();
  }
}


module.exports = Countdown;
