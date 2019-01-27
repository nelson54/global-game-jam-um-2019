const Phaser = require('phaser-ce');
const Input = require('../input');
const Pillow = require('./pillow');

class Player extends Phaser.Sprite {
  constructor(game, x, y, text_x, text_y, text_color, key) {
    super(game, x, y, key);
    this.anchor.set(.5, .5);
    this.scale.set(.5);
    this.weapon = null;
    this.health = 200;
    this.movementSpeed = 300;

    this.pillow = new Pillow(game, 0, 0);
    this.pillow.anchor.set(-0.5, 0.25);
    this.addChild(this.pillow);
    this.pillowSwinging = false;
    this.pillowSwingUp = game.add.tween(this.pillow);
    this.pillowSwingUp.to({ rotation: -2.0 }, 200, Phaser.Easing.Exponential.In);
    this.pillowSwingUp.onComplete.add(() => {
      let next = game.add.tween(this.pillow);
      next.to({ rotation: 0 }, 800, Phaser.Easing.Cubic.InOut);
      next.onComplete.add(() => this.pillowSwinging = false, this);
      next.start();
    }, this);
    this.pillowSwingDown = game.add.tween(this.pillow);
    this.pillowSwingDown.to({ rotation: 2.0 }, 200, Phaser.Easing.Exponential.In);
    this.pillowSwingDown.onComplete.add(() => {
      let next = game.add.tween(this.pillow);
      next.to({ rotation: 0 }, 800, Phaser.Easing.Cubic.InOut);
      next.onComplete.add(() => this.pillowSwinging = false, this);
      next.start();
    }, this);

    this.disabledFlashCount = 5;
    this.disabledFlash = game.add.tween(this);
    this.disabledFlash.to({ alpha: 0.5 }, 1 / 6 * 1000, Phaser.Easing.Exponential.InOut);
    this.disabledFlash.onComplete.add(() => {
      let next = game.add.tween(this);
      next.to({ alpha: 1.0 }, 1 / 6 * 1000, Phaser.Easing.Exponential.InOut);
      next.onComplete.add(() => {
        this.disabledFlashCount -= 1;
        if (this.disabledFlashCount > 0) {
          this.disabledFlash.start();
        } else {
          this.disabledFlashCount = 5;
        }
      }, this);
      next.start();
    }, this);

    this.look = 0.0;

    game.physics.arcade.enable(this);

    this.enableBody = true;
    this.body.collideWorldBounds=true;

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
    let hitForce = 100;
    this.body.velocity = new Phaser.Point(hitForce * direction.x, hitForce * direction.y);
    this.controller.active = false;

    if(!this.controlTimer || !this.controlTimer.timer.running) {
      this.disabledFlash.start();
      this.controlTimer = this.game.time.events.add(Phaser.Timer.SECOND * 2, () => {
        this.controller.active = true;
        this.controlTimer = null;
      });
    }
  }

  update() {
    super.update();

    if(this.pillowSwinging && this.pillow.overlap(this.enemy)) {
      this.enemy.pillowHit((new Phaser.Point(0, -1)).rotate(0, 0, this.look, false, 1));
    }

    // Flip depending on where we're looking
    if (this.look < 0 || this.look > Math.PI) {
      this.scale.x = -1 * this.scale.x * Math.sign(this.scale.x);
    } else {
      this.scale.x = 1 * this.scale.x * Math.sign(this.scale.x);
    }
    if (this.look > Math.PI / 2) {
      this.pillow.scale.y = -1 * this.pillow.scale.y * Math.sign(this.pillow.scale.y);
    } else {
      this.pillow.scale.y = 1 * this.pillow.scale.y * Math.sign(this.pillow.scale.y);
    }

    if (this.controller && this.controller.active) {
      this.body.velocity.x = this.controller.strafe.x * this.movementSpeed;
      this.body.velocity.y = this.controller.strafe.y * this.movementSpeed;

      if (this.controller.lookMagnitude > 0) {
        let look = this.controller.lookNormalized;
        this.look = Math.atan2(look.y, look.x) + Math.PI / 2;
      }

      if (this.controller.isDown(Input.Buttons.PRIMARY) && this.weapon) {
        this.weapon.use();
      }

      if (this.controller.justPressed(Input.Buttons.SECONDARY) && !this.pillowSwinging) {
        this.pillowSwinging = true;
        if (this.pillow.scale.y > 0) {
          this.pillowSwingUp.start();
        } else {
          this.pillowSwingDown.start();
        }
      }
    }

    // Bring our weapon with us
    if (this.weapon) {
      this.weapon.update();
    }
  }
}


module.exports = Player;
