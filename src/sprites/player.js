var Phaser = require('phaser-ce');

class Player extends Phaser.Sprite {
  constructor(game, x, y, text_x, text_y, text_color, key) {
    super(game, game.world.centerX + x, game.world.centerY + y, key);
    this.anchor.set(.5, .5);
    this.scale.set(.5);
    this.weapon = null;
    this.health = 100;

    this.gun = game.add.emitter(this.centerX, this.centerY);

    this.gun.setXSpeed(0, 0);
    this.gun.setYSpeed(-100, -100);
    this.gun.makeParticles('normal-bullet', 1, 1, false, true);
    this.gun.gravity = 0;


    this.gun.start(false, 5000, 250, 5);


    game.add.existing(this);
    this.healthText = game.add.text(
      text_x,
      text_y,
      null,
      {"fill": text_color, "align": "center", "font": "bold 20pt Comic Sans MS"});
  }

  set weapon(new_weapon) {
    if (this._weapon) {
      this.removeChild(this._weapon);
    }
    if (new_weapon) {
      this.addChild(new_weapon)
    }
    this._weapon = new_weapon;
  }

  get weapon() {
    return this._weapon;
  }

  update() {
    this.healthText.text = this.health;
  }
}


module.exports = Player;
