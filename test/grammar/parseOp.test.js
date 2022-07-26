/* Test cases for parseOp, grammar.js
 * Copyright (C) 2022 Matheus Fernandes Bigolin <mfrdrbigolin@disroot.org>
 * SPDX-License-Identifier: Apache-2.0
 */

'use strict'

require('../testDriver')
const { parseOp } = require('../../src/grammar')

const { Token } = require('../../src/lex')
const { RIGHT, LEFT, PLUS, MINUS, OUTPUT, INPUT } = Token

const readline = require('readline-sync')

const initialModel = () => ({ arr: [null, 1, null], ind: 1 })

const parseCases = [
  [[RIGHT, initialModel()], { arr: [null, 1, 0], ind: 2 }],
  [[LEFT, initialModel()], { arr: [0, 1, null], ind: 0 }],
  [[PLUS, initialModel()], { arr: [null, 2, null], ind: 1 }],
  [[MINUS, initialModel()], { arr: [null, 0, null], ind: 1 }],
  [[OUTPUT, initialModel()], initialModel()],
  [[INPUT, initialModel()], { arr: [null, 65, null], ind: 1 }],
  [[420, initialModel()], /Unknown/, true]
]

const inputMock = [
  [[readline, 'prompt'], () => 'A']
]

parseCases.tst(parseOp, 'parseOp', inputMock)
