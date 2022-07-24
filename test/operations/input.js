/* Test suites for input, operations.js
 * Copyright (C) 2022 Matheus Fernandes Bigolin <mfrdrbigolin@disroot.org>
 * SPDX-License-Identifier: Apache-2.0
 */

'use strict'

const { Input, Options } = require('../../src/options')

const { FILE, PREEMPTIVE, PROCEDURAL } = Input

const suites = [
  new Options({ input: FILE }),
  new Options({ input: PREEMPTIVE }),
  new Options({ input: PROCEDURAL })
]

exports.suites = suites
