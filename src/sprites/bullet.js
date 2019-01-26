var Phaser = require('phaser-ce');

function hit(player, bullet) {
  bullet.kill();
  player.hurt(bullet.damage);
}

class Bullet extends Phaser.Sprite {
  constructor(game, player, playerHater, damage, key) {
    super(game, player.x, player.y, key);
    this.damage = damage;
    game.physics.arcade.enable(this);
    this.body.velocity = new Phaser.Point(200, 0);
    this.enableBody = true;
    this.playerHater = playerHater;

    game.add.existing(this);
  }

  update() {
    this.game.physics.arcade.overlap(this.playerHater, this, hit, null, this);
  }
}


module.exports = Bullet;
