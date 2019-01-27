const Phaser = require('phaser-ce');
const Pickup = require('../sprites/pickup');
class PickupManager {

  constructor(game) {
    this.game = game;
    this.group = game.add.group();
    this.gameState = game.state.getCurrentState();
    this.players = [this.gameState.player1, this.gameState.player2];
    this.pickups = ['machine-gun-pickup', 'pistol-pickup', 'rocket-launcher-pickup', 'life'];

    this.gunConstructors = {

      'machine-gun-pickup': require('../machine-gun'),
      'pistol-pickup': require('../pistol'),
      'rocket-launcher-pickup': require('../rocket-launcher'),
    };

    this.timer = game.time.create(false);

    this.createRandomPickup();
    //  Set a TimerEvent to occur after 5 seconds
    this.timer.loop(5000, ()=> this.createRandomPickup());
//    this.timer.loop(7500, ()=> this.createRandomPickup());
    this.timer.start();
  }

  add(pickup) {
    this.pickups.add(pickup);
  }

  createRandomPickup() {
    let randomPickup;
    this.group.forEachAlive((pickup) => pickup.kill());

    randomPickup = this.randomPickup();
    this.addPickup(this.randomPlace(), randomPickup, this.gunConstructors[randomPickup], randomPickup === 'life');

    if(Math.random() > .2) {
      randomPickup = this.randomPickup();
      this.addPickup(this.randomPlace(), randomPickup, this.gunConstructors[randomPickup], randomPickup === 'life');
    }

    if(Math.random() > .9) {
      randomPickup = this.randomPickup();
      this.addPickup(this.randomPlace(), randomPickup, this.gunConstructors[randomPickup], randomPickup === 'life');
    }
  }

  addPickup(location, randomPickup, Constructor, isLife) {
    let pickup = new Pickup(this.game, location.x, location.y, randomPickup, Constructor, isLife);
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
