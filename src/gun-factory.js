let gunTypes = {
  BASE_GUN: {
    name: 'BASE_GUN',
    configure: function(emitter) {
      emitter.setXSpeed(0, 0);
      emitter.setYSpeed(-100, -100);
      emitter.makeParticles('normal-bullet', 1, 5, false, true);
      emitter.gravity = 0;
    }
  }
};

class GunFactory {
  makeGun(game, type) {
    let emitter = game.add.emitter();

    if(gunTypes.hasOwnProperty('type')) {
      type = gunTypes[type];
    }

    if(type.hasOwnProperty('configure')) {
      type.configure(emitter);
    }


    return emitter;
  }
}


module.exports = {
  gunFactoryInstance: new GunFactory(),
  gunTypes
};
