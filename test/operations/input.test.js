/* Test cases for input, operations.js
 * Copyright (C) 2022 Matheus Fernandes Bigolin <mfrdrbigolin@disroot.org>
 * SPDX-License-Identifier: Apache-2.0
 */

'use strict'
/* eslint-env jest */

require('../testDriver.js')
const { input } = require('../../src/operations')
const { suites } = require('./input')

const fs = require('fs')
const readline = require('readline-sync')

const fileSource = 'abc'
const inputSource = 'WXYZ'

const fileCases = fileSource.split('').map(chr => [
  [suites[0], '~PLACEHOLDER~.bin'], chr.codePointAt(0)
])

const preemptiveCases = inputSource.split('').map(chr => [
  [suites[1]], chr.codePointAt(0)
])

const proceduralCases = inputSource.split('').map(() => [
  [suites[2]], inputSource[0].codePointAt(0)
])

const emptyCases = [
  [[suites[0], '~PLACEHOLDER~.bin'], 0],
  [[suites[1]], 10],
  [[suites[2]], 10]
]

const mocks = [
  [[fs, 'readFileSync'], () => fileSource + '\n'],
  [[readline, 'prompt'], () => inputSource]
]

const emptyMocks = [
  [[readline, 'prompt'], () => ''],
  [[fs, 'readFileSync'], () => '']
]

fileCases.tst(input, 'file input', mocks)
preemptiveCases.tst(input, 'preemptive input', mocks)
proceduralCases.tst(input, 'procedural input', mocks)
emptyCases.tst(input, 'empty input', emptyMocks)
