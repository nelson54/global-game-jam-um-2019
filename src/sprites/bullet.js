let Phaser = require('phaser-ce');


class Bullet extends Phaser.Particle {
  constructor(game, x, y, key='normal-bullet') {
    super(game, x, y, key);
    this.damage = 10;
  }

  hit(player, bullet) {
    bullet.kill();
    player.hurt(bullet.damage);

  }

  update() {
    if(this.alive && this.overlap(this.parent.player.enemy)) {
      this.hit(this.parent.player.enemy, this);
    }
  }
}

module.exports = Bullet;
