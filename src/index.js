const { InjectorBalancer } = require("./InjectorBalancer");
const Injector = require("./Injector");

const readline = require("readline").createInterface({
  input: process.stdin,
  output: process.stdout,
});

readline.question("Hi, input the desired Speed Of Light ", (speedOfLight) => {
  readline.question("Input Injector's 1 Damage ", (inj1Damage) => {
    readline.question("Input Injector's 2 Damage ", (inj2Damage) => {
      readline.question("Input Injector's 3 Damage ", (inj3Damage) => {
        const injectorBalancer = new InjectorBalancer(
          speedOfLight,
          new Injector(inj1Damage),
          new Injector(inj2Damage),
          new Injector(inj3Damage)
        );
        console.log("Optimized Flow: ", injectorBalancer.getOptimizedFlow());
        console.log("Operating Time: ", injectorBalancer.getOperatingTime());
        readline.close();
      });
    });
  });
});
