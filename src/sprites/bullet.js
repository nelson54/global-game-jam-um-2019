let Phaser = require('phaser-ce');

function hit(player, bullet) {
  bullet.kill();
  player.hurt(bullet.damage);
}

class Bullet extends Phaser.Particle {
  constructor(game, x, y, key) {
    super(game, x, y, 'normal-bullet');
    this.damage = 10;
    //game.physics.arcade.enable(this);
    //this.body.velocity = new Phaser.Point(200, 0);

    //game.add.existing(this);
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
