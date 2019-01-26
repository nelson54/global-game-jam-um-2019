const Phaser = require('phaser-ce');

class EndGame extends Phaser.State {
  preload() {
    this.game.load.image('replay', '/assets/sprites/replay.png');

    this.game.load.image('start', '/assets/sprites/start.png');
    this.game.load.image('1', '/assets/sprites/1.png');
    this.game.load.image('2', '/assets/sprites/2.png');
    this.game.load.image('3', '/assets/sprites/3.png');
  }

  create() {
    this.replay = this.game.add.sprite(0, 0, 'replay');
    this.replay.visible = false;

    this.start = this.game.add.sprite(0, 0, 'start');
    this.start.alpha = 0;

    this.num1 = this.game.add.sprite(0, 0, '1');
    this.num1.alpha = 0;

    this.num2 = this.game.add.sprite(0, 0, '2');
    this.num2.alpha = 0;

    this.num3 = this.game.add.sprite(0, 0, '3');
    this.num3.alpha = 0;

    let tween1 = this.game.add.tween(this.num1);
    tween1.to({alpha:100}, 1000, Phaser.Easing.Bounce.Out);


    let tween2 = this.game.add.tween(this.num2);
    tween2.to({alpha:100}, 1000, Phaser.Easing.Bounce.Out);

    let tween3 = this.game.add.tween(this.num3);
    tween3.to({alpha:100}, 1000, Phaser.Easing.Bounce.Out);

    let tweenStart = this.game.add.tween(this.num3);
    tweenStart.to({alpha:100}, 1000, Phaser.Easing.Bounce.Out);

    tween3.onComplete.add(tween2.start);
    tween2.onComplete.add(tween1.start);
    tween1.onComplete.add(tweenStart.start);
    tweenStart.onComplete.add(()=> {
      this.game.state.start('default', true, true);
    });

    tween3.start();
  }
}


module.exports = EndGame;
