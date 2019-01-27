const Phaser = require('phaser-ce');
const Input = require('../input');

class Player extends Phaser.Sprite {
  constructor(game, x, y, text_x, text_y, text_color, key) {
    super(game, game.world.centerX + x, game.world.centerY + y, key);
    this.anchor.set(.5, .5);
    this.scale.set(.5);
    this.weapon = null;
    this.health = 100;
    this.movementSpeed = 300;

    game.physics.arcade.enable(this);

    this.enableBody = true;
    this.body.collideWorldBounds=true;
    this.body.setCircle(this.width);

    game.add.existing(this);

    this.healthText = game.add.text(
      text_x,
      text_y,
      null,
      {
        "fill": text_color,
        "align": "center",
        "font": "bold 20pt Comic Sans MS",
        "strokeThickness": 8
      });
    this.hurt(0); // Get things started.
  }

  set weapon(new_weapon) {
    if (this._weapon) {
      this._weapon.unequipFrom(this);
    }
    if (new_weapon) {
      new_weapon.equipTo(this)
    }
    this._weapon = new_weapon;
  }

  get weapon() {
    return this._weapon;
  }

  hurt(amount) {
    this.game.oof.play();
    this.health -= amount;
    if(this.health <= 0)
      this.kill();
    this.healthText.text = this.health;
  }

  update() {
    super.update();

    if (this.input) {
      this.body.velocity.x = this.input.strafe.x * this.movementSpeed;
      this.body.velocity.y = this.input.strafe.y * this.movementSpeed;

      if (this.input.lookMagnitude > 0) {
        let look = this.input.lookNormalized;
        this.rotation = Math.atan2(look.y, look.x) + Math.PI / 2;
        this.weapon.use();
      }
    }

    // Bring our weapon with us
    if (this.weapon) {
      this.weapon.update();
    }
  }
}


module.exports = Player;
