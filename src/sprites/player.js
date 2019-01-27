const Phaser = require('phaser-ce');
const Input = require('../input');
const Pillow = require('./pillow');

class Player extends Phaser.Sprite {
  constructor(game, x, y, text_x, text_y, text_color, key) {
    super(game, game.world.centerX + x, game.world.centerY + y, key);
    this.anchor.set(.5, .5);
    this.scale.set(.5);
    this.weapon = null;
    this.health = 100;
    this.movementSpeed = 300;

    this.pillow = new Pillow(game, -50, 30);
    this.pillow.anchor.set(-2, 0.5);
    this.addChild(this.pillow);
    this.pillowSwinging = false;
    this.pillowSwing = game.add.tween(this.pillow);
    this.pillowSwing.to({ rotation: -1.0 }, 200, Phaser.Easing.Exponential.In);
    this.pillowSwing.onComplete.add(() => {
      let next = game.add.tween(this.pillow);
      next.to({ rotation: 0 }, 800, Phaser.Easing.Cubic.InOut);
      next.onComplete.add(() => this.pillowSwinging = false, this);
      next.start();
    }, this);

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

  pillowHit(direction = {x: 1, y:-1}) {
    let hitForce = 1000;
    this.body.velocity = new Phaser.Point(hitForce * direction.x, hitForce * direction.y);
    this.controller.active = false;
    if(!this.controlTimer || !this.controlTimer.running) {
      this.controlTimer = this.game.time.events.add(Phaser.Timer.SECOND * 2, () => {
        this.controller.active = true;
      });
    }
  }

  update() {
    super.update();

    if (this.controller && this.controller.active) {
      this.body.velocity.x = this.controller.strafe.x * this.movementSpeed;
      this.body.velocity.y = this.controller.strafe.y * this.movementSpeed;

      if (this.controller.lookMagnitude > 0) {
        let look = this.controller.lookNormalized;
        this.rotation = Math.atan2(look.y, look.x) + Math.PI / 2;
        this.weapon.use();
      }

      if (this.input.justPressed(Input.Buttons.SECONDARY) && !this.pillowSwinging) {
        this.pillowSwinging = true;
        this.pillowSwing.start();
      }
    }

    // Bring our weapon with us
    if (this.weapon) {
      this.weapon.update();
    }
  }
}


module.exports = Player;
