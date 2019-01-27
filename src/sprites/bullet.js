let Phaser = require('phaser-ce');


class Bullet extends Phaser.Particle {
  constructor(game, x, y, key='normal-bullet') {
    super(game, x, y, key);
    this.damage = 10;
    this.collideWorldBounds=true;
  }

  hit(player) {
    if(player) player.hurt(this.damage);
    this.kill();

  }

  update() {
    if(this.alive) {
      if(this.body.checkWorldBounds()) {
        this.hit();
        return;
      }

      if (this.overlap(this.parent.player.enemy)) {
        this.hit(this.parent.player.enemy);
        return;
      }

      for(let furniture of this.game.state.getCurrentState().furniture.children) {
        if(this.overlap(furniture)) {
          this.hit();
          return;
        }
      }

      for(let pushable of this.game.state.getCurrentState().pushable.children) {
        if(this.overlap(pushable)) {
          this.hit();
          return;
        }
      }
    }
  }
}

module.exports = Bullet;
