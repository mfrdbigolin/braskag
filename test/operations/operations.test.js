/* Miscellaneous tests for operations.js
 * Copyright (C) 2020–2022 Matheus Fernandes Bigolin <mfrdrbigolin@disroot.org>
 * SPDX-License-Identifier: Apache-2.0
 */

'use strict'

require('../testDriver')
const { Token } = require('../../src/lex')
const operations = require('../../src/operations')

const { RIGHT, LEFT, PLUS, MINUS, OUTPUT, INPUT } = Token
const {
  movRight, movLeft, add, sub,
  output, input, OPERATIONS
} = operations

// Check if the association between tokens and operations is correct.
const operationCases = [
  [[movRight], RIGHT],
  [[movLeft], LEFT],
  [[add], PLUS],
  [[sub], MINUS],
  [[output], OUTPUT],
  [[input], INPUT]
]

operationCases.tst(Array.prototype.indexOf.bind(OPERATIONS),
  'Operation associativity test')
