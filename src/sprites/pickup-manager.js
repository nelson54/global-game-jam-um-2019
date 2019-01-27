const Phaser = require('phaser-ce');
const Pickup = require('../sprites/pickup');
class PickupManager {

  constructor(game) {
    this.game = game;
    this.group = game.add.group();
    this.gameState = game.state.getCurrentState();
    this.players = [this.gameState.player1, this.gameState.player2];
    this.pickups = ['machine-gun-pickup', 'pistol-pickup', 'rocket-launcher-pickup'];

    this.gunConstructors = {

      'machine-gun-pickup': require('../machine-gun'),
      'pistol-pickup': require('../pistol'),
      'rocket-launcher-pickup': require('../rocket-launcher'),
    }

    this.timer = game.time.create(false);

    //  Set a TimerEvent to occur after 2 seconds
    this.timer.loop(5000, ()=> this.createRandomPickup());
    this.timer.start();
  }

  add(pickup) {
    this.pickups.add(pickup);
  }

  createRandomPickup() {
    this.group.forEachAlive((pickup) => pickup.kill());

    let location = this.randomPlace(),
    randomPickup = this.randomPickup(),
    Constructor = this.gunConstructors[randomPickup];

    let pickup = new Pickup(this.game, location.x, location.y, randomPickup, Constructor);
    this.group.add(pickup)
  }




  randomPickup() {
    return this.pickups[Math.floor(Math.random() * this.pickups.length)];
  }

  randomPlace() {
    return {x: Math.random() * this.game.world.width, y: Math.random() * this.game.world.height}
  }



}

module.exports = PickupManager;
