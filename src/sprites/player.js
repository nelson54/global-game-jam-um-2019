var Phaser = require('phaser-ce');

class Player extends Phaser.Sprite {
  constructor(game, x, y, text_x, text_y, text_color, key) {
    super(game, game.world.centerX + x, game.world.centerY + y, key);
    this.anchor.set(.5, .5);
    this.scale.set(.5);
    this.weapon = null;
    this.health = 100;

    game.add.existing(this)
    this.healthText = game.add.text(
      text_x,
      text_y,
      null,
      {"fill": text_color, "align": "center", "font": "bold 20pt Comic Sans MS"});
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
