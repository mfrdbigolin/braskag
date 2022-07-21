/* Test cases for the range functions, operations.js
 * Copyright (C) 2020–2022 Matheus Fernandes Bigolin <mfrdrbigolin@disroot.org>
 * SPDX-License-Identifier: Apache-2.0
 */

'use strict'

require('../testDriver.js')
const { cellUpper, cellLower } = require('../../src/operations')
const { suites } = require('./mov')

const upperCases = [
  [[suites[0]], suites[0].CELL_NUM - 1],
  [[suites[1]], 0],
  [[suites[2]], Math.floor(suites[2].CELL_NUM / 2)]
]

const lowerCases = [
  [[suites[0]], 0],
  [[suites[1]], -suites[1].CELL_NUM + 1],
  [[suites[2]], -Math.floor((suites[2].CELL_NUM - 1) / 2)]
]

upperCases.tst(cellUpper, 'cellUpper')
lowerCases.tst(cellLower, 'cellLower')
