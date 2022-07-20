/* Test cases for the arithmetic functions, operations.js
 * Copyright (C) 2020–2022 Matheus Fernandes Bigolin <mfrdrbigolin@disroot.org>
 * SPDX-License-Identifier: Apache-2.0
 */

'use strict'

require('../testDriver.js')
const { add, sub } = require('../../src/operations')
const { suites } = require('./arithmetic')

const overflowCases = [
  [[suites[0].CELL_RANGE - 1, suites[0]], /Overflow/, true],
  [[suites[1].CELL_RANGE - 1, suites[1]], suites[1].CELL_RANGE - 1],
  [[suites[2].CELL_RANGE - 1, suites[2]], 0]
]

const addCases = [
  [[0, suites[0]], 1],
  [[0, suites[1]], 1],
  [[0, suites[2]], 1],

  [[suites[0].CELL_RANGE - 2, suites[0]], suites[0].CELL_RANGE - 1],
  [[suites[1].CELL_RANGE - 2, suites[1]], suites[1].CELL_RANGE - 1],
  [[suites[2].CELL_RANGE - 2, suites[2]], suites[2].CELL_RANGE - 1]
]

const underflowCases = [
  [[0, suites[0]], /Underflow/, true],
  [[0, suites[1]], 0],
  [[0, suites[2]], suites[2].CELL_RANGE - 1]
]

const subCases = [
  [[1, suites[0]], 0],
  [[1, suites[1]], 0],
  [[1, suites[2]], 0],

  [[suites[0].CELL_RANGE - 1, suites[0]], suites[0].CELL_RANGE - 2],
  [[suites[1].CELL_RANGE - 1, suites[1]], suites[1].CELL_RANGE - 2],
  [[suites[2].CELL_RANGE - 1, suites[2]], suites[2].CELL_RANGE - 2]
]

overflowCases.tst(add, 'overflow add')
addCases.tst(add, 'add')
underflowCases.tst(sub, 'underflow sub')
subCases.tst(sub, 'sub')
