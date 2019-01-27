const Phaser = require('phaser-ce');

class EndGame extends Phaser.State {
  constructor(game, player) {
    super();
    this.game = game;
    this.title = player;
  }

  create() {
    this.game.stage.backgroundColor = "#30b3ff";
    var text = this.game.add.text(this.game.world.centerX, this.game.world.centerY, this.title + ' wins');
    text.x -= text.width / 2;
    text.y -= text.height / 2;

    let timerTween = this.game.add.tween(text);
    timerTween.to({alpha:1}, 3000, "Linear");
    timerTween.onComplete.add(()=> {
      this.game.state.start('gameplay', true, true);
    });
    timerTween.start();
  }
}


module.exports = EndGame;
