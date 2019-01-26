var Phaser = require('phaser-ce');

class Player extends Phaser.Sprite {
  constructor(game, x, y, text_x, text_y, text_color, key) {
    super(game, game.world.centerX + x, game.world.centerY + y, key);
    this.anchor.set(.5, .5);
    this.scale.set(.5);
    this.weapon = null;
    this.health = 100;
    this.movementSpeed = 4;
    this.enableBody = true;

    this.gun = game.add.emitter(this.centerX, this.centerY);

    this.gun.setXSpeed(0, 0);
    this.gun.setYSpeed(-100, -100);
    this.gun.makeParticles('normal-bullet', 1, 1, false, true);
    this.gun.gravity = 0;


    this.gun.start(false, 5000, 250, 5);


    game.physics.arcade.enable(this);
    game.add.existing(this);
    this.healthText = game.add.text(
      text_x,
      text_y,
      null,
      {"fill": text_color, "align": "center", "font": "bold 20pt Comic Sans MS"});
    this.hurt(0); // Get things started.
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

  hurt(amount) {
    this.health -= amount;
    if(this.health <= 0)
      this.kill();
    this.healthText.text = this.health;
  }

  update() {
    if (this.input) {
      this.x += this.input.strafe.x * this.movementSpeed;
      this.y += this.input.strafe.y * this.movementSpeed;

      if (this.input.lookMagnitude > 0) {
        let look = this.input.lookNormalized;
        this.rotation = Math.atan2(look.y, look.x) + Math.PI / 2;

        console.log(look);
      }
    }
  }
}


module.exports = Player;
