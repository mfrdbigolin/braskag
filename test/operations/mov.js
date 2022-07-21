/* Test suites for the move functions, operations.js
 * Copyright (C) 2020–2022 Matheus Fernandes Bigolin <mfrdrbigolin@disroot.org>
 * SPDX-License-Identifier: Apache-2.0
 */

'use strict'

const { Directions, Behaviors, Options } = require('../../src/options')

const { RIGHT, LEFT, BOTH } = Directions
const { ERROR, UNCHANGED, WRAP } = Behaviors

const suites = [
  new Options({ dir: RIGHT, bound: ERROR }),
  new Options({ dir: LEFT, bound: ERROR }),
  new Options({ dir: BOTH, bound: ERROR }),
  new Options({ dir: RIGHT, bound: UNCHANGED }),
  new Options({ dir: LEFT, bound: UNCHANGED }),
  new Options({ dir: BOTH, bound: UNCHANGED }),
  new Options({ dir: RIGHT, bound: WRAP }),
  new Options({ dir: LEFT, bound: WRAP }),
  new Options({ dir: BOTH, bound: WRAP })
]

exports.suites = suites
