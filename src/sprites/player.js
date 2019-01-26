var Phaser = require('phaser-ce');

class Player extends Phaser.Sprite {
  constructor(game, x, y, key) {
    super(game, x, y, key);
    this.anchor.set(.5, .5);
    this.scale.set(.5);
    this.weapon = null;

    this.gun = game.add.emitter(this.centerX, this.centerY);

    this.gun.setXSpeed(-100, -100);
    this.gun.setYSpeed(-100, -100);
    this.gun.makeParticles('normal-bullet', 1, 5, false, true);
    this.gun.gravity = 0;


    this.gun.start(false, 5000, 500);

    game.add.existing(this)
  }

  set weapon(new_weapon) {
    if (this._weapon) {
      this._weapon.unequipFrom(this);
    }
    if (new_weapon) {
      new_weapon.equipTo(this);
    }
    this._weapon = new_weapon;
  }

  get weapon() {
    return this._weapon;
  }
}


module.exports = Player;
