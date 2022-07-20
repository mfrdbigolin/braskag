/* Test suites for the arithmetic functions, operations.js
 * Copyright (C) 2020–2022 Matheus Fernandes Bigolin <mfrdrbigolin@disroot.org>
 * SPDX-License-Identifier: Apache-2.0
 */

'use strict'

const { Behaviors, Options } = require('../../src/options')

const { ERROR, UNCHANGED, WRAP } = Behaviors

const suites = [
  new Options({ over: ERROR }),
  new Options({ over: UNCHANGED }),
  new Options({ over: WRAP })
]

exports.suites = suites
