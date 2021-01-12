/* Test suites for the move functions, operations.js
 * Copyright (C) 2020, 2021 Matheus Fernandes Bigolin <mfrdrbigolin@disroot.org>
 * SPDX-License-Identifier: Apache-2.0
 */

'use strict'

const options = require('../../src/options')

const { RIGHT, LEFT, BOTH } = options.Directions
const { ERROR, UNCHANGED, WRAP } = options.Behaviors

const suites = [
  new options.Options(100, RIGHT, 128, ERROR, ERROR),
  new options.Options(100, RIGHT, 128, ERROR, UNCHANGED),
  new options.Options(100, RIGHT, 128, ERROR, WRAP),
  new options.Options(100, LEFT, 128, ERROR, ERROR),
  new options.Options(100, LEFT, 128, ERROR, UNCHANGED),
  new options.Options(100, LEFT, 128, ERROR, WRAP),
  new options.Options(100, BOTH, 128, ERROR, ERROR),
  new options.Options(100, BOTH, 128, ERROR, UNCHANGED),
  new options.Options(100, BOTH, 128, ERROR, WRAP)
]

exports.suites = suites
