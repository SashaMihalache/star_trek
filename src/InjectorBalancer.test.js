const Injector = require("./Injector");
const { InjectorBalancer, errors } = require("./InjectorBalancer");

describe("class InjectorBalancer", () => {
  describe("getWorkingInjectors()", () => {
    it("should return 3 when all injectors are working", () => {
      const sol = 100;

      const injectorBalancer = new InjectorBalancer(
        sol,
        new Injector(0),
        new Injector(0),
        new Injector(0)
      );

      expect(injectorBalancer.getWorkingInjectors()).toBe(3);
    });

    it("should return 2 when one of the injectors is at full damage", () => {
      const sol = 100;

      const injectorBalancer = new InjectorBalancer(
        sol,
        new Injector(0),
        new Injector(0),
        new Injector(100)
      );

      expect(injectorBalancer.getWorkingInjectors()).toBe(2);
    });

    it("should return 0 when two injectors are at full damage", () => {
      const sol = 100;

      const injectorBalancer = new InjectorBalancer(
        sol,
        new Injector(100),
        new Injector(100),
        new Injector(100)
      );

      expect(injectorBalancer.getWorkingInjectors()).toBe(0);
    });
  });

  describe("getMean()", () => {
    it("should perform mean calculation if all engines are working", () => {
      const sol = 100;

      const injectorBalancer = new InjectorBalancer(
        sol,
        new Injector(0),
        new Injector(0),
        new Injector(0)
      );

      expect(injectorBalancer.getMean()).toBe(100);
    });

    it("should exclude broken engine from mean calculation", () => {
      const sol = 100;
      const injectorBalancer = new InjectorBalancer(
        sol,
        new Injector(0),
        new Injector(0),
        new Injector(100)
      );

      expect(injectorBalancer.getMean()).toBe(100);
    });

    it("should exclude 2 broken engines from mean calculation", () => {
      const sol = 100;

      const injectorBalancer = new InjectorBalancer(
        sol,
        new Injector(0),
        new Injector(100),
        new Injector(100)
      );

      expect(injectorBalancer.getMean()).toBe(100);
    });

    it("should return 'Unable to comply' when all engines are broken", () => {
      const sol = 100;

      const injectorBalancer = new InjectorBalancer(
        sol,
        new Injector(100),
        new Injector(100),
        new Injector(100)
      );

      expect(injectorBalancer.getMean()).toBe(errors.ERROR_UNABLE_TO_COMPLY);
    });
  });

  describe("calculateSurplus()", () => {
    it("should return 0 surplus needed when all engines are intact", () => {
      const sol = 100;

      const injectorBalancer = new InjectorBalancer(
        sol,
        new Injector(0),
        new Injector(0),
        new Injector(0)
      );

      expect(injectorBalancer.calculateSurplus()).toBe(0);
      expect(injectorBalancer.surplus).toBe(0);
    });
  });

  describe("getOptimizedFlow()", () => {
    it("should apply 0 surplus to the injectors if not damaged (case 1)", () => {
      const sol = 100;
      const injector1 = new Injector(0);
      const injector2 = new Injector(0);
      const injector3 = new Injector(0);

      const injectorBalancer = new InjectorBalancer(
        sol,
        injector1,
        injector2,
        injector3
      );

      expect(injectorBalancer.getOptimizedFlow()).toEqual([100, 100, 100]);
    });

    it("should apply 0 surplus to the injectors if not damaged and speed of light baseline decreased to 90% (case 2)", () => {
      const sol = 90;
      const injector1 = new Injector(0);
      const injector2 = new Injector(0);
      const injector3 = new Injector(0);

      const injectorBalancer = new InjectorBalancer(
        sol,
        injector1,
        injector2,
        injector3
      );

      expect(injectorBalancer.getOptimizedFlow()).toEqual([90, 90, 90]);
    });

    it("should apply 0 surplus to the injectors if not damaged and speed of light baseline decreased to 30% (case 3)", () => {
      const sol = 30;
      const injector1 = new Injector(0);
      const injector2 = new Injector(0);
      const injector3 = new Injector(0);

      const injectorBalancer = new InjectorBalancer(
        sol,
        injector1,
        injector2,
        injector3
      );

      expect(injectorBalancer.getOptimizedFlow()).toEqual([30, 30, 30]);
    });

    it("should apply 10 surplus to the injectors (case 4)", () => {
      const sol = 100;
      const injector1 = new Injector(20);
      const injector2 = new Injector(10);
      const injector3 = new Injector(0);

      const injectorBalancer = new InjectorBalancer(
        sol,
        injector1,
        injector2,
        injector3
      );

      expect(injectorBalancer.getOptimizedFlow()).toEqual([90, 100, 110]);
    });

    it("should apply 20 surplus to the injectors if SOL is 80% and 1 injector down (case 5)", () => {
      const sol = 80;
      const injector1 = new Injector(0);
      const injector2 = new Injector(0);
      const injector3 = new Injector(100);

      const injectorBalancer = new InjectorBalancer(
        sol,
        injector1,
        injector2,
        injector3
      );

      expect(injectorBalancer.getOptimizedFlow()).toEqual([120, 120, 0]);
    });

    it("should apply 50 surplus to the injectors if SOL is 150% and 0 injectors down (case 6)", () => {
      const sol = 150;
      const injector1 = new Injector(0);
      const injector2 = new Injector(0);
      const injector3 = new Injector(0);

      const injectorBalancer = new InjectorBalancer(
        sol,
        injector1,
        injector2,
        injector3
      );

      expect(injectorBalancer.getOptimizedFlow()).toEqual([150, 150, 150]);
    });

    it("should apply 50 surplus to the injectors if SOL is 150% and 30 damage to one injector (case 7)", () => {
      const sol = 140;
      const injector1 = new Injector(0);
      const injector2 = new Injector(0);
      const injector3 = new Injector(30);

      const injectorBalancer = new InjectorBalancer(
        sol,
        injector1,
        injector2,
        injector3
      );

      expect(injectorBalancer.getOptimizedFlow()).toEqual([150, 150, 120]);
    });

    it("should return 'Unable to comply' (case 8)", () => {
      const sol = 170;
      const injector1 = new Injector(20);
      const injector2 = new Injector(50);
      const injector3 = new Injector(40);

      const injectorBalancer = new InjectorBalancer(
        sol,
        injector1,
        injector2,
        injector3
      );

      expect(() => injectorBalancer.getOptimizedFlow()).toThrowError(
        errors.ERROR_UNABLE_TO_COMPLY
      );
    });
  });

  describe("getOptimizedFlow() - edge cases", () => {
    it("should return Infinite for case 1", () => {
      const sol = 100;
      const injector1 = new Injector(0);
      const injector2 = new Injector(0);
      const injector3 = new Injector(0);

      const injectorBalancer = new InjectorBalancer(
        sol,
        injector1,
        injector2,
        injector3
      );

      expect(injectorBalancer.getOperatingTime()).toEqual("Infinite");
    });

    it("should return Infinite for case 2", () => {
      const sol = 90;
      const injector1 = new Injector(0);
      const injector2 = new Injector(0);
      const injector3 = new Injector(0);

      const injectorBalancer = new InjectorBalancer(
        sol,
        injector1,
        injector2,
        injector3
      );

      expect(injectorBalancer.getOperatingTime()).toEqual("Infinite");
    });

    it("should return Infinite for case 3", () => {
      const sol = 30;
      const injector1 = new Injector(0);
      const injector2 = new Injector(0);
      const injector3 = new Injector(0);

      const injectorBalancer = new InjectorBalancer(
        sol,
        injector1,
        injector2,
        injector3
      );

      expect(injectorBalancer.getOperatingTime()).toEqual("Infinite");
    });

    it("should return Infinite for case 4", () => {
      const expectedOperatingTime = "90 minutes";
      const sol = 100;
      const injector1 = new Injector(20);
      const injector2 = new Injector(10);
      const injector3 = new Injector(0);

      const injectorBalancer = new InjectorBalancer(
        sol,
        injector1,
        injector2,
        injector3
      );

      expect(injectorBalancer.getOperatingTime()).toEqual(
        expectedOperatingTime
      );
    });

    it("should return Infinite for case 5", () => {
      const expectedOperatingTime = "80 minutes";
      const sol = 80;
      const injector1 = new Injector(0);
      const injector2 = new Injector(0);
      const injector3 = new Injector(100);

      const injectorBalancer = new InjectorBalancer(
        sol,
        injector1,
        injector2,
        injector3
      );

      expect(injectorBalancer.getOperatingTime()).toEqual(
        expectedOperatingTime
      );
    });

    it("should return Infinite for case 6", () => {
      const expectedOperatingTime = "50 minutes";
      const sol = 150;
      const injector1 = new Injector(0);
      const injector2 = new Injector(0);
      const injector3 = new Injector(0);

      const injectorBalancer = new InjectorBalancer(
        sol,
        injector1,
        injector2,
        injector3
      );

      expect(injectorBalancer.getOperatingTime()).toEqual(
        expectedOperatingTime
      );
    });

    it("should return Infinite for case 7", () => {
      const expectedOperatingTime = "50 minutes";
      const sol = 140;
      const injector1 = new Injector(0);
      const injector2 = new Injector(0);
      const injector3 = new Injector(30);

      const injectorBalancer = new InjectorBalancer(
        sol,
        injector1,
        injector2,
        injector3
      );

      expect(injectorBalancer.getOperatingTime()).toEqual(
        expectedOperatingTime
      );
    });

    it("should return Infinite for case 8", () => {
      const expectedOperatingTime = "0 minutes";
      const sol = 170;
      const injector1 = new Injector(20);
      const injector2 = new Injector(50);
      const injector3 = new Injector(40);

      const injectorBalancer = new InjectorBalancer(
        sol,
        injector1,
        injector2,
        injector3
      );

      expect(injectorBalancer.getOperatingTime()).toEqual(
        expectedOperatingTime
      );
    });
  });
});
