const DEFAULT_FLOW = 100;

class Injector {
  constructor(damage) {
    this.damage = damage;
    this.health = DEFAULT_FLOW - damage <= 0 ? 0 : DEFAULT_FLOW - damage;
  }
}

module.exports = Injector;
