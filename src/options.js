/* Interpreter options
 * Copyright (C) 2020 Matheus Fernandes Bigolin <mfrdrbigolin@disroot.org>
 * SPDX-License-Identifier: Apache-2.0
 */

// Work-in-progress.

"use strict";

const args = process.argv.slice(2);

class Options {
  constructor(num, dir, range, over, bound) {
    this.CELL_NUM = num;
    this.CELL_DIRECTION = dir;
    this.CELL_RANGE = range;
    this.OVERFLOW_BEHAVIOR = over;
    this.BOUND_BEHAVIOR = bound;
  }
}

const Behaviors = Object.freeze({
  "ERROR": 0,
  "UNCHANGED": 1,
  "WRAP": 2,
});

const Directions = Object.freeze({
  "RIGHT": 0,
  "LEFT": 1,
  "BOTH": 2,
});

// TODO
const Input = Object.freeze({
  "FILE": 0,
  "PREEMPTIVE": 1,
  "PROCEDURAL": 2,
});

const InterpreterOptions = ({
  "CELL_NUM": 30000,
  "CELL_DIRECTION": Directions.RIGHT,
  "CELL_RANGE": 127,
  "OVERFLOW_BEHAVIOR": Behaviors.UNCHANGED,
  "BOUND_BEHAVIOR": Behaviors.ERROR,
  "INPUT_BEHAVIOR": Input.PROCEDURAL,
});

exports.args = args;
exports.Behaviors = Behaviors;
exports.Directions = Directions;
exports.InterpreterOptions = InterpreterOptions;
exports.Options = Options;
