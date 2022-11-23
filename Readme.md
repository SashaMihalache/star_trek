# Enterprise's warp-drive mgmt software

## Author

[Sebastian Mihalache](https://github.com/SashaMihalache)

## Project setup instructions

In order to run, we must first install the Jest assertion library in the workspace:

```
  npm i
```

## Code explanation

The code is split into two main classes:

1. `Injector` which represents a single Injector and is tasked with holding its own state like `damage` and `health`
2. `InjectorBalance` which ties the desired Speed of light with an array of `Injector`s and performs all necessary calculations to arrive at an optimal flow speed and the operating time

<br />

### Running the tests

To run tests, I've setup a command in the `package.json` file which can be ran with:

```
  npm test
```

**Note 1**: Each one of the classes are tested against various inputs + the inputs provided in the problem
<br/>
**Note 2**: this is running jest with the `--coverage` flag in order to generate a coverage report

<br />

### Running standalone

I wrote an extra script in the `package.json` that runs the whole integration in a terminal-based app, prompting you for four inputs: `Speed of Light`, `Injector Damage 1`, `Injector Damage 2` & `Injector Damage 3` which replicate the test cases.

In order to run it in a terminal, type:

```
  npm start
```
