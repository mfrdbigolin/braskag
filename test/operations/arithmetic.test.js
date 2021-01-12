/* Test cases for the arithmetic functions, operations.js
 * Copyright (C) 2020, 2021 Matheus Fernandes Bigolin <mfrdrbigolin@disroot.org>
 * SPDX-License-Identifier: Apache-2.0
 */

'use strict'

require('../testDriver.js')
const operations = require('../../src/operations')
const arithmetic = require('./arithmetic')

const { suites } = arithmetic

const addCases = [
  [[suites[0].CELL_RANGE, suites[0]], /Overflow/, true],
  [[suites[1].CELL_RANGE, suites[1]],
    suites[1].CELL_RANGE, false],
  [[suites[2].CELL_RANGE, suites[2]], 0, false],
  [[0, suites[0]], 1, false],
  [[0, suites[1]], 1, false],
  [[0, suites[2]], 1, false]
]

const subCases = [
  [[0, suites[0]], /Underflow/, true],
  [[0, suites[1]], 0, false],
  [[0, suites[2]], suites[1].CELL_RANGE, false],
  [[suites[0].CELL_RANGE, suites[0]],
    suites[0].CELL_RANGE - 1, false],
  [[suites[1].CELL_RANGE, suites[1]],
    suites[1].CELL_RANGE - 1, false],
  [[suites[2].CELL_RANGE, suites[2]],
    suites[2].CELL_RANGE - 1, false]
]

addCases.tst(operations.add, 'overflow add')
subCases.tst(operations.sub, 'overflow sub')
