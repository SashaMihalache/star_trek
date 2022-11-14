# Enterprise's warp-drive mgmt software

## How to install

In order to install the Jest assertion library in the workspace, run:

```
  yarn install
```

Afterwards, to run tests, I've setup a command in the `package.json` file which can be ran with:

```
  yarn test
```

3 injectors

reactors needs a flow of 300 mg/s for SOL 100%

1 injector = 100 mg/s. (if max -> indefinately)
max is 199 mg/s
every mg/s > 100 -> loses 1min (60s) of runtime  
 ex. 101 -> 99 min
ex. 199 -> 1 min
ex. 150 -> 50min

1 point of damage -> -1 mg/s
ex. 70% damage out of 100 -> peak at 30mg/s
32% damage out of 100 -> peak at 68mg/s
100% damage out of 100 -> 'unusable'
20% damage out of 178 (extra injection) -> 199 (ala de sus) -> 1 min

Pseudocode
1 injector -> default 100 injection flow
extraInjection 0 <> 99
damage 0 - 100

inputs: damageI1, damageI2, damageI3, percentage SOL
output: i1Injection, i2Injection, i3Injection

if i1Inj + i2Inj + i3Inj = 3000 => 100 SOL

I'll start testing out one injector, then the balancer and afterwards adding N injectors

<!-- cum sa faci pe toate sa crape deodata -->

postDamagePeakFlow -> 80 90 100
SOL - 100%

---

SOL > mean (90) -> 10% surpluss

0 0 100% -> 100 100 0(unusable)
SOL - 80% = (100 + 100 + 0) / 3
x . y . z
120 120 0
