'use strict';

class BaseRobot {
  constructor(name, weight, coords, chipVersion) {
    this.name = name;
    this.weight = weight;
    this.chipVersion = chipVersion;

    this.coords = {
      x: coords.x || 0,
      y: coords.y || 0,
    };
  }

  changeCoord(coord, step = 1, positive = true) {
    if (!this.coords.hasOwnProperty(coord) || step <= 0) {
      return;
    }

    this.coords[coord] += positive ? step : -step;

    return this;
  }

  goForward(step) {
    return this.changeCoord('y', step);
  }

  goBack(step) {
    return this.changeCoord('y', step, false);
  }

  goRight(step) {
    return this.changeCoord('x', step);
  }

  goLeft(step) {
    return this.changeCoord('x', step, false);
  }

  getInfo() {
    return `Robot: ${this.name}, `
      + `Chip version: ${this.chipVersion}, `
      + `Weight: ${this.weight}`;
  }
}

class FlyingRobot extends BaseRobot {
  constructor(name, weight, coords, chipVersion) {
    super(name, weight, coords, chipVersion);
    this.coords.z = coords.z || 0;
  }

  goUp(step) {
    return this.changeCoord('z', step);
  }

  goDown(step) {
    return this.changeCoord('z', step, false);
  }
}

class DeliveryDrone extends FlyingRobot {
  constructor(
    name,
    weight,
    coords,
    chipVersion,
    maxLoadWeight,
    currentLoad = null,
  ) {
    super(name, weight, coords, chipVersion);
    this.maxLoadWeight = maxLoadWeight;
    this.currentLoad = currentLoad;
  }

  hookLoad(cargo) {
    if (!this.currentLoad && this.maxLoadWeight >= cargo.weight) {
      this.currentLoad = cargo;
    }
  }

  unhookLoad() {
    this.currentLoad = null;
  }
}

module.exports = {
  BaseRobot,
  FlyingRobot,
  DeliveryDrone,
};
