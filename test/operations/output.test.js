/* Test cases for output, operations.js
 * Copyright (C) 2022 Matheus Fernandes Bigolin <mfrdrbigolin@disroot.org>
 * SPDX-License-Identifier: Apache-2.0
 */

'use strict'

require('../testDriver.js')
const { output } = require('../../src/operations')

const outputCases = [
  [[8], '\b'],
  [[65], 'A'],
  [[231], 'ç'],
  [[1222], 'ӆ'],
  [[25105], '我'],
  [[-65536], '\0']
]

outputCases.tst(output, 'output')
