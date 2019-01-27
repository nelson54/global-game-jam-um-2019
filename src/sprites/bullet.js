let Phaser = require('phaser-ce');

function hit(player, bullet) {
  bullet.kill();
  player.hurt(bullet.damage);
}

class Bullet extends Phaser.Particle {
  constructor(game, x, y, key='normal-bullet') {
    super(game, x, y, key);
    this.damage = 10;
  }

  update() {
    if(this.alive) {
      if(this.overlap(this.parent.player.enemy)) {
        hit(this.parent.player.enemy, this);
      }
    }
  }
}

module.exports = Bullet;
