/* Test suites for the arithmetic functions, operations.js
 * Copyright (C) 2020 Matheus Fernandes Bigolin <mfrdrbigolin@disroot.org>
 * SPDX-License-Identifier: Apache-2.0
 */

"use strict";

const options = require("../../src/options");

const { RIGHT } = options.Directions;
const { ERROR, UNCHANGED, WRAP } = options.Behaviors;

const suites = [
  new options.Options(100, RIGHT, 128, ERROR, ERROR),
  new options.Options(100, RIGHT, 128, UNCHANGED, ERROR),
  new options.Options(100, RIGHT, 128, WRAP, ERROR),
];

exports.suites = suites;
