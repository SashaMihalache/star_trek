const Injector = require("./Injector");

describe("class Injector", () => {
  describe("constructor", () => {
    it("should return 100 when damage is 0", () => {
      const injector = new Injector(0);
      expect(injector.health).toBe(100);
    });

    it("should return 50 when damage is 50", () => {
      const injector = new Injector(50);
      expect(injector.health).toBe(50);
    });

    it("should return 0 when damage is 100", () => {
      const injector = new Injector(100);
      expect(injector.health).toBe(0);
    });

    it("should return 0 when damage is 101", () => {
      const injector = new Injector(101);
      expect(injector.health).toBe(0);
    });
  });
});
