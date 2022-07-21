/* Test cases for movRight, operations.js
 * Copyright (C) 2020–2022 Matheus Fernandes Bigolin <mfrdrbigolin@disroot.org>
 * SPDX-License-Identifier: Apache-2.0
 */

'use strict'

require('../testDriver.js')
const { movRight, cellUpper, cellLower } = require('../../src/operations')
const { suites } = require('./mov')

const boundCases = [
  [[cellUpper(suites[0]), suites[0]], /Upper/, true],
  [[cellUpper(suites[1]), suites[1]], /Upper/, true],
  [[cellUpper(suites[2]), suites[2]], /Upper/, true],
  [[cellUpper(suites[3]), suites[3]], cellUpper(suites[3])],
  [[cellUpper(suites[4]), suites[4]], cellUpper(suites[4])],
  [[cellUpper(suites[5]), suites[5]], cellUpper(suites[5])],
  [[cellUpper(suites[6]), suites[6]], cellLower(suites[6])],
  [[cellUpper(suites[7]), suites[7]], cellLower(suites[7])],
  [[cellUpper(suites[8]), suites[8]], cellLower(suites[8])]
]

const edgeCases = [
  [[cellUpper(suites[0]) - 1, suites[0]], cellUpper(suites[0])],
  [[cellUpper(suites[1]) - 1, suites[1]], cellUpper(suites[1])],
  [[cellUpper(suites[2]) - 1, suites[2]], cellUpper(suites[2])],
  [[cellUpper(suites[3]) - 1, suites[3]], cellUpper(suites[3])],
  [[cellUpper(suites[4]) - 1, suites[4]], cellUpper(suites[4])],
  [[cellUpper(suites[5]) - 1, suites[5]], cellUpper(suites[5])],
  [[cellUpper(suites[6]) - 1, suites[6]], cellUpper(suites[6])],
  [[cellUpper(suites[7]) - 1, suites[7]], cellUpper(suites[7])],
  [[cellUpper(suites[8]) - 1, suites[8]], cellUpper(suites[8])]
]

boundCases.tst(movRight, 'bound movRight')
edgeCases.tst(movRight, 'edge movRight')
