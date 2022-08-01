/* Test suites for input, operations.js
 * Copyright (C) 2022 Matheus Fernandes Bigolin <mfrdrbigolin@disroot.org>
 * SPDX-License-Identifier: Apache-2.0
 */

'use strict'

const { Input, Options } = require('../../src/options')

const { PROCEDURAL, PREEMPTIVE, CYCLIC } = Input

const suites = [
  new Options({ input: PROCEDURAL }),
  new Options({ input: PREEMPTIVE }),
  new Options({ input: CYCLIC })
]

exports.suites = suites
