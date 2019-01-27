var Phaser = require('phaser-ce');

const Buttons = {
  PRIMARY: 1,
  SECONDARY: 2,
  TERTIARY: 3,
};

class XBoxController {
  constructor(pad) {
    this.active = true;
    this.pad = pad;
  }

  destroy() {
    this.pad.destroy();
  }

  get connected() {
    return this.pad.connected;
  }

  get look() {
    let xValue = this.pad.axis(Phaser.Gamepad.XBOX360_STICK_RIGHT_X);
    let yValue = this.pad.axis(Phaser.Gamepad.XBOX360_STICK_RIGHT_Y);
    return {
      x: xValue ? xValue : 0.0,
      y: yValue ? yValue : 0.0,
    };
  }

  get lookMagnitude() {
    let look = this.look;
    return Math.sqrt(look.x * look.x + look.y * look.y);
  }

  get lookNormalized() {
    let look = this.look;
    let magnitude = this.lookMagnitude;
    return magnitude > 0 ? {
      x: look.x / magnitude,
      y: look.y / magnitude,
    } : {
      x: 0.0,
      y: 0.0,
    };
  }

  get strafe() {
    let xValue = this.pad.axis(Phaser.Gamepad.XBOX360_STICK_LEFT_X);
    let yValue = this.pad.axis(Phaser.Gamepad.XBOX360_STICK_LEFT_Y);
    return {
      x: xValue ? xValue : 0.0,
      y: yValue ? yValue : 0.0,
    };
  }

  get strafeMagnitude() {
    let strafe = this.strafe;
    return Math.sqrt(strafe.x * strafe.x + strafe.y * strafe.y);
  }

  get strafeNormalized() {
    let strafe = this.strafe;
    let magnitude = this.strafeMagnitude;
    return magnitude > 0 ? {
      x: strafe.x / magnitude,
      y: strafe.y / magnitude,
    } : {
      x: 0.0,
      y: 0.0,
    };
  }

  isDown(button) {
    switch (button) {
      case Buttons.PRIMARY:
        return this.pad.isDown(Phaser.Gamepad.XBOX360_LEFT_TRIGGER) || this.pad.isDown(Phaser.Gamepad.XBOX360_RIGHT_TRIGGER);
        break;
      case Buttons.SECONDARY:
        return this.pad.isDown(Phaser.Gamepad.XBOX360_LEFT_BUMPER);
        break;
      case Buttons.TERTIARY:
        return this.pad.isDown(Phaser.Gamepad.XBOX360_RIGHT_BUMPER);
        break;
    }

    return false;
  }

  justPressed(button) {
    switch (button) {
      case Buttons.PRIMARY:
        return this.pad.justPressed(Phaser.Gamepad.XBOX360_LEFT_TRIGGER) || this.pad.justPressed(Phaser.Gamepad.XBOX360_RIGHT_TRIGGER);
        break;
      case Buttons.SECONDARY:
        return this.pad.justPressed(Phaser.Gamepad.XBOX360_RIGHT_BUMPER);
        break;
      case Buttons.TERTIARY:
        return this.pad.justPressed(Phaser.Gamepad.XBOX360_LEFT_BUMPER);
        break;
    }

    return false;
  }

  justReleased(button) {
    switch (button) {
      case Buttons.PRIMARY:
        return this.pad.justReleased(Phaser.Gamepad.XBOX360_LEFT_TRIGGER) || this.pad.justReleased(Phaser.Gamepad.XBOX360_RIGHT_TRIGGER);
        break;
      case Buttons.SECONDARY:
        return this.pad.justReleased(Phaser.Gamepad.XBOX360_LEFT_BUMPER);
        break;
      case Buttons.TERTIARY:
        return this.pad.justReleased(Phaser.Gamepad.XBOX360_RIGHT_BUMPER);
        break;
    }

    return false;
  }
}

module.exports = {
  Buttons: Buttons,
  XBoxController: XBoxController,
}
