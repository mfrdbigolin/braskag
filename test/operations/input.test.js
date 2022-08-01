/* Test cases for input, operations.js
 * Copyright (C) 2022 Matheus Fernandes Bigolin <mfrdrbigolin@disroot.org>
 * SPDX-License-Identifier: Apache-2.0
 */

'use strict'
/* eslint-env jest */

require('../testDriver.js')
const { input } = require('../../src/operations')
const { suites } = require('./input')

const readline = require('readline-sync')

const fileSource = 'abc'.split('').map(c => c.codePointAt(0))
const inputSource = 'WXYZ'

const proceduralCases = inputSource.split('').map(() => [
  ['', suites[0]], inputSource[0].codePointAt(0)
])

const preemptiveCases = inputSource.split('').map(chr => [
  ['', suites[1]], chr.codePointAt(0)
])

const cyclicCases = fileSource.map(chr => [
  [fileSource.reverse(), suites[2]], chr
])

const emptyCases = [
  [['', suites[0]], 10],
  [['', suites[1]], 10],
  [['', suites[2]], 10]
]

const mocks = [
  [[readline, 'prompt'], () => inputSource],
  [[process.stdout, 'write'], () => 'oasdfjsdifjsd']
]

const emptyMocks = [
  [[readline, 'prompt'], () => '']
]

proceduralCases.tst(input, 'procedural input', mocks)
preemptiveCases.tst(input, 'preemptive input', mocks)
cyclicCases.tst(input, 'file input', mocks)
emptyCases.tst(input, 'empty input', emptyMocks)
