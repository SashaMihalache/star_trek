const ERROR_UNABLE_TO_COMPLY = "Unable to comply";
const MAX_FLOW = 200;

class InjectorBalancer {
  constructor(speedOfLight, ...injectors) {
    this.speedOfLight = speedOfLight;
    this.injectors = [...injectors];
    this.surplus = this.calculateSurplus();
  }

  getWorkingInjectors() {
    return this.injectors.reduce((working, injector) => {
      if (injector.health > 0) {
        return working + 1;
      }

      return working;
    }, 0);
  }

  getMean() {
    const nrOfWorkingInjectors = this.getWorkingInjectors();

    if (nrOfWorkingInjectors === 0) {
      return ERROR_UNABLE_TO_COMPLY;
    }

    const injectorsSum = this.injectors.reduce((sum, injector) => {
      return sum + injector.health;
    }, 0);

    return injectorsSum / nrOfWorkingInjectors;
  }

  calculateSurplus() {
    let surplus = this.speedOfLight - this.getMean();

    if (this.getWorkingInjectors() !== this.injectors.length) {
      surplus = Math.abs(surplus);
    }

    return surplus;
  }

  getOptimizedFlow() {
    if (this.surplus > 100) {
      throw ERROR_UNABLE_TO_COMPLY;
    }

    const postInjectors = this.injectors.map((injector) => {
      return injector.health && injector.health + this.surplus;
    });

    return postInjectors;
  }

  getOperatingTime() {
    if (this.speedOfLight - this.getMean() > 99) {
      return "0 minutes";
    }

    const injectors = this.getOptimizedFlow();
    const lackOfSurplus = this.surplus <= 0;
    const consumer = MAX_FLOW - Math.max(...injectors);

    return lackOfSurplus ? "Infinite" : `${consumer} minutes`;
  }
}

module.exports = {
  InjectorBalancer,
  errors: {
    ERROR_UNABLE_TO_COMPLY,
  },
};
